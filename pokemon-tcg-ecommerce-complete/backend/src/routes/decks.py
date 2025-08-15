from flask import Blueprint, request, jsonify, session
from src.models.user import db, User
from src.models.product import Deck
import json

decks_bp = Blueprint('decks', __name__)

def get_current_user_id():
    """Obter ID do usuário atual da sessão"""
    return session.get('user_id', 1)  # Mock user ID

@decks_bp.route('/decks', methods=['GET'])
def get_user_decks():
    """Obter decks do usuário"""
    try:
        user_id = get_current_user_id()
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        decks = Deck.query.filter_by(user_id=user_id).order_by(
            Deck.updated_at.desc()
        ).paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'decks': [deck.to_dict() for deck in decks.items],
            'total': decks.total,
            'pages': decks.pages,
            'current_page': page,
            'per_page': per_page
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@decks_bp.route('/decks/<int:deck_id>', methods=['GET'])
def get_deck(deck_id):
    """Obter detalhes de um deck específico"""
    try:
        user_id = get_current_user_id()
        
        deck = Deck.query.filter_by(
            id=deck_id, 
            user_id=user_id
        ).first()
        
        if not deck:
            return jsonify({'error': 'Deck não encontrado'}), 404
        
        deck_data = deck.to_dict()
        
        # Parse cards data se existir
        if deck_data['cards_data']:
            try:
                deck_data['cards'] = json.loads(deck_data['cards_data'])
            except:
                deck_data['cards'] = []
        else:
            deck_data['cards'] = []
        
        return jsonify(deck_data)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@decks_bp.route('/decks', methods=['POST'])
def create_deck():
    """Criar novo deck"""
    try:
        user_id = get_current_user_id()
        data = request.get_json()
        
        name = data.get('name', '').strip()
        description = data.get('description', '').strip()
        cards = data.get('cards', [])
        is_public = data.get('is_public', False)
        
        if not name:
            return jsonify({'error': 'Nome do deck é obrigatório'}), 400
        
        # Validar deck (60 cartas, máximo 4 de cada)
        if len(cards) != 60:
            return jsonify({'error': 'Deck deve ter exatamente 60 cartas'}), 400
        
        card_counts = {}
        total_price = 0
        
        for card in cards:
            card_id = card.get('id')
            card_name = card.get('name', '')
            card_price = card.get('price', 0)
            
            if card_id:
                card_counts[card_id] = card_counts.get(card_id, 0) + 1
                
                # Verificar limite de 4 cartas (exceto energias básicas)
                if card_counts[card_id] > 4 and not card.get('is_basic_energy', False):
                    return jsonify({'error': f'Máximo 4 cartas de {card_name} permitidas'}), 400
            
            total_price += card_price
        
        # Criar deck
        deck = Deck(
            user_id=user_id,
            name=name,
            description=description,
            cards_data=json.dumps(cards),
            total_price=total_price,
            is_public=is_public
        )
        
        db.session.add(deck)
        db.session.commit()
        
        return jsonify({
            'message': 'Deck criado com sucesso',
            'deck': deck.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@decks_bp.route('/decks/<int:deck_id>', methods=['PUT'])
def update_deck(deck_id):
    """Atualizar deck existente"""
    try:
        user_id = get_current_user_id()
        data = request.get_json()
        
        deck = Deck.query.filter_by(
            id=deck_id, 
            user_id=user_id
        ).first()
        
        if not deck:
            return jsonify({'error': 'Deck não encontrado'}), 404
        
        # Atualizar campos
        if 'name' in data:
            name = data['name'].strip()
            if not name:
                return jsonify({'error': 'Nome do deck é obrigatório'}), 400
            deck.name = name
        
        if 'description' in data:
            deck.description = data['description'].strip()
        
        if 'is_public' in data:
            deck.is_public = data['is_public']
        
        if 'cards' in data:
            cards = data['cards']
            
            # Validar deck
            if len(cards) != 60:
                return jsonify({'error': 'Deck deve ter exatamente 60 cartas'}), 400
            
            card_counts = {}
            total_price = 0
            
            for card in cards:
                card_id = card.get('id')
                card_name = card.get('name', '')
                card_price = card.get('price', 0)
                
                if card_id:
                    card_counts[card_id] = card_counts.get(card_id, 0) + 1
                    
                    if card_counts[card_id] > 4 and not card.get('is_basic_energy', False):
                        return jsonify({'error': f'Máximo 4 cartas de {card_name} permitidas'}), 400
                
                total_price += card_price
            
            deck.cards_data = json.dumps(cards)
            deck.total_price = total_price
        
        db.session.commit()
        
        return jsonify({
            'message': 'Deck atualizado com sucesso',
            'deck': deck.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@decks_bp.route('/decks/<int:deck_id>', methods=['DELETE'])
def delete_deck(deck_id):
    """Deletar deck"""
    try:
        user_id = get_current_user_id()
        
        deck = Deck.query.filter_by(
            id=deck_id, 
            user_id=user_id
        ).first()
        
        if not deck:
            return jsonify({'error': 'Deck não encontrado'}), 404
        
        db.session.delete(deck)
        db.session.commit()
        
        return jsonify({'message': 'Deck deletado com sucesso'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@decks_bp.route('/decks/public', methods=['GET'])
def get_public_decks():
    """Obter decks públicos"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        decks = Deck.query.filter_by(is_public=True).order_by(
            Deck.updated_at.desc()
        ).paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        decks_data = []
        for deck in decks.items:
            deck_dict = deck.to_dict()
            # Adicionar informações do usuário
            if deck.user:
                deck_dict['user'] = {
                    'id': deck.user.id,
                    'username': deck.user.username
                }
            decks_data.append(deck_dict)
        
        return jsonify({
            'decks': decks_data,
            'total': decks.total,
            'pages': decks.pages,
            'current_page': page,
            'per_page': per_page
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@decks_bp.route('/decks/<int:deck_id>/copy', methods=['POST'])
def copy_deck(deck_id):
    """Copiar deck público para o usuário atual"""
    try:
        user_id = get_current_user_id()
        
        # Buscar deck original (deve ser público ou do próprio usuário)
        original_deck = Deck.query.filter(
            Deck.id == deck_id,
            db.or_(
                Deck.is_public == True,
                Deck.user_id == user_id
            )
        ).first()
        
        if not original_deck:
            return jsonify({'error': 'Deck não encontrado ou não é público'}), 404
        
        # Criar cópia
        new_deck = Deck(
            user_id=user_id,
            name=f"Cópia de {original_deck.name}",
            description=original_deck.description,
            cards_data=original_deck.cards_data,
            total_price=original_deck.total_price,
            is_public=False
        )
        
        db.session.add(new_deck)
        db.session.commit()
        
        return jsonify({
            'message': 'Deck copiado com sucesso',
            'deck': new_deck.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

