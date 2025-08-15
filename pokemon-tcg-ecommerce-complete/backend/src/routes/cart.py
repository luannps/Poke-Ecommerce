from flask import Blueprint, request, jsonify, session
from src.models.user import db, User
from src.models.product import CartItem, Product

cart_bp = Blueprint('cart', __name__)

def get_current_user_id():
    """Obter ID do usuário atual da sessão (mock para desenvolvimento)"""
    # Em produção, isso viria do token JWT ou sessão real
    return session.get('user_id', 1)  # Mock user ID

@cart_bp.route('/cart', methods=['GET'])
def get_cart():
    """Obter itens do carrinho do usuário"""
    try:
        user_id = get_current_user_id()
        
        cart_items = CartItem.query.filter_by(user_id=user_id).all()
        
        total = 0
        items_data = []
        
        for item in cart_items:
            item_data = item.to_dict()
            if item.product:
                subtotal = item.product.price * item.quantity
                item_data['subtotal'] = subtotal
                total += subtotal
            items_data.append(item_data)
        
        return jsonify({
            'items': items_data,
            'total': total,
            'count': len(cart_items)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@cart_bp.route('/cart/add', methods=['POST'])
def add_to_cart():
    """Adicionar item ao carrinho"""
    try:
        data = request.get_json()
        user_id = get_current_user_id()
        product_id = data.get('product_id')
        quantity = data.get('quantity', 1)
        
        if not product_id:
            return jsonify({'error': 'product_id é obrigatório'}), 400
        
        # Verificar se o produto existe
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Produto não encontrado'}), 404
        
        # Verificar estoque
        if product.stock < quantity:
            return jsonify({'error': 'Estoque insuficiente'}), 400
        
        # Verificar se o item já existe no carrinho
        existing_item = CartItem.query.filter_by(
            user_id=user_id, 
            product_id=product_id
        ).first()
        
        if existing_item:
            # Atualizar quantidade
            new_quantity = existing_item.quantity + quantity
            if product.stock < new_quantity:
                return jsonify({'error': 'Estoque insuficiente'}), 400
            
            existing_item.quantity = new_quantity
        else:
            # Criar novo item
            cart_item = CartItem(
                user_id=user_id,
                product_id=product_id,
                quantity=quantity
            )
            db.session.add(cart_item)
        
        db.session.commit()
        
        return jsonify({'message': 'Item adicionado ao carrinho'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@cart_bp.route('/cart/update', methods=['PUT'])
def update_cart_item():
    """Atualizar quantidade de um item no carrinho"""
    try:
        data = request.get_json()
        user_id = get_current_user_id()
        item_id = data.get('item_id')
        quantity = data.get('quantity')
        
        if not item_id or quantity is None:
            return jsonify({'error': 'item_id e quantity são obrigatórios'}), 400
        
        cart_item = CartItem.query.filter_by(
            id=item_id, 
            user_id=user_id
        ).first()
        
        if not cart_item:
            return jsonify({'error': 'Item não encontrado no carrinho'}), 404
        
        if quantity <= 0:
            # Remover item se quantidade for 0 ou negativa
            db.session.delete(cart_item)
        else:
            # Verificar estoque
            if cart_item.product.stock < quantity:
                return jsonify({'error': 'Estoque insuficiente'}), 400
            
            cart_item.quantity = quantity
        
        db.session.commit()
        
        return jsonify({'message': 'Carrinho atualizado'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@cart_bp.route('/cart/remove', methods=['DELETE'])
def remove_from_cart():
    """Remover item do carrinho"""
    try:
        data = request.get_json()
        user_id = get_current_user_id()
        item_id = data.get('item_id')
        
        if not item_id:
            return jsonify({'error': 'item_id é obrigatório'}), 400
        
        cart_item = CartItem.query.filter_by(
            id=item_id, 
            user_id=user_id
        ).first()
        
        if not cart_item:
            return jsonify({'error': 'Item não encontrado no carrinho'}), 404
        
        db.session.delete(cart_item)
        db.session.commit()
        
        return jsonify({'message': 'Item removido do carrinho'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@cart_bp.route('/cart/clear', methods=['DELETE'])
def clear_cart():
    """Limpar todo o carrinho"""
    try:
        user_id = get_current_user_id()
        
        CartItem.query.filter_by(user_id=user_id).delete()
        db.session.commit()
        
        return jsonify({'message': 'Carrinho limpo'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@cart_bp.route('/cart/count', methods=['GET'])
def get_cart_count():
    """Obter número de itens no carrinho"""
    try:
        user_id = get_current_user_id()
        
        count = CartItem.query.filter_by(user_id=user_id).count()
        
        return jsonify({'count': count})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

