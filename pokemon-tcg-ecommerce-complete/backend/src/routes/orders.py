from flask import Blueprint, request, jsonify, session
from src.models.user import db, User
from src.models.product import Order, OrderItem, CartItem, Product
import uuid
import base64
import json

orders_bp = Blueprint('orders', __name__)

def get_current_user_id():
    """Obter ID do usuário atual da sessão"""
    return session.get('user_id', 1)  # Mock user ID

def generate_pix_qr_code(amount, order_id):
    """Gerar QR Code PIX (mock para desenvolvimento)"""
    # Em produção, isso seria integrado com um gateway de pagamento real
    pix_data = {
        'amount': amount,
        'order_id': order_id,
        'merchant': 'PokéCards',
        'key': 'contato@pokecards.com.br',
        'description': f'Pedido #{order_id}'
    }
    
    # Simular QR Code como base64
    qr_string = json.dumps(pix_data)
    qr_code = base64.b64encode(qr_string.encode()).decode()
    
    return qr_code

@orders_bp.route('/orders', methods=['GET'])
def get_user_orders():
    """Obter pedidos do usuário"""
    try:
        user_id = get_current_user_id()
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        orders = Order.query.filter_by(user_id=user_id).order_by(
            Order.created_at.desc()
        ).paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'orders': [order.to_dict() for order in orders.items],
            'total': orders.total,
            'pages': orders.pages,
            'current_page': page,
            'per_page': per_page
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """Obter detalhes de um pedido específico"""
    try:
        user_id = get_current_user_id()
        
        order = Order.query.filter_by(
            id=order_id, 
            user_id=user_id
        ).first()
        
        if not order:
            return jsonify({'error': 'Pedido não encontrado'}), 404
        
        return jsonify(order.to_dict())
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders/create', methods=['POST'])
def create_order():
    """Criar pedido a partir do carrinho"""
    try:
        user_id = get_current_user_id()
        data = request.get_json()
        
        payment_method = data.get('payment_method', 'pix')
        
        # Obter itens do carrinho
        cart_items = CartItem.query.filter_by(user_id=user_id).all()
        
        if not cart_items:
            return jsonify({'error': 'Carrinho vazio'}), 400
        
        # Calcular total e verificar estoque
        total = 0
        order_items_data = []
        
        for cart_item in cart_items:
            product = cart_item.product
            
            if not product or not product.is_active:
                return jsonify({'error': f'Produto {product.name if product else "desconhecido"} não está disponível'}), 400
            
            if product.stock < cart_item.quantity:
                return jsonify({'error': f'Estoque insuficiente para {product.name}'}), 400
            
            item_total = product.price * cart_item.quantity
            total += item_total
            
            order_items_data.append({
                'product_id': product.id,
                'quantity': cart_item.quantity,
                'price': product.price
            })
        
        # Aplicar desconto PIX (5%)
        if payment_method == 'pix':
            total = total * 0.95
        
        # Criar pedido
        order = Order(
            user_id=user_id,
            total=total,
            payment_method=payment_method,
            status='pending'
        )
        
        db.session.add(order)
        db.session.flush()  # Para obter o ID do pedido
        
        # Gerar QR Code PIX
        if payment_method == 'pix':
            order.pix_qr_code = generate_pix_qr_code(total, order.id)
        
        # Criar itens do pedido
        for item_data in order_items_data:
            order_item = OrderItem(
                order_id=order.id,
                product_id=item_data['product_id'],
                quantity=item_data['quantity'],
                price=item_data['price']
            )
            db.session.add(order_item)
            
            # Reduzir estoque
            product = Product.query.get(item_data['product_id'])
            product.stock -= item_data['quantity']
        
        # Limpar carrinho
        CartItem.query.filter_by(user_id=user_id).delete()
        
        db.session.commit()
        
        return jsonify({
            'message': 'Pedido criado com sucesso',
            'order': order.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    """Atualizar status do pedido (para simulação de pagamento)"""
    try:
        data = request.get_json()
        new_status = data.get('status')
        
        if new_status not in ['pending', 'paid', 'shipped', 'delivered', 'cancelled']:
            return jsonify({'error': 'Status inválido'}), 400
        
        order = Order.query.get_or_404(order_id)
        order.status = new_status
        
        db.session.commit()
        
        return jsonify({
            'message': 'Status atualizado com sucesso',
            'order': order.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/payment/pix', methods=['POST'])
def generate_pix_payment():
    """Gerar pagamento PIX para um produto específico"""
    try:
        data = request.get_json()
        product_id = data.get('product_id')
        quantity = data.get('quantity', 1)
        
        if not product_id:
            return jsonify({'error': 'product_id é obrigatório'}), 400
        
        product = Product.query.get_or_404(product_id)
        
        if product.stock < quantity:
            return jsonify({'error': 'Estoque insuficiente'}), 400
        
        # Calcular valor com desconto PIX (5%)
        total = product.price * quantity * 0.95
        
        # Gerar QR Code
        qr_code = generate_pix_qr_code(total, f"direct-{product_id}-{uuid.uuid4().hex[:8]}")
        
        return jsonify({
            'product': product.to_dict(),
            'quantity': quantity,
            'original_total': product.price * quantity,
            'total': total,
            'discount': product.price * quantity * 0.05,
            'qr_code': qr_code,
            'payment_method': 'pix'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/payment/status/<payment_id>', methods=['GET'])
def get_payment_status(payment_id):
    """Verificar status do pagamento (mock)"""
    try:
        # Em produção, isso consultaria o gateway de pagamento
        # Para desenvolvimento, simular status aleatório
        import random
        
        statuses = ['pending', 'paid', 'failed']
        status = random.choice(statuses)
        
        return jsonify({
            'payment_id': payment_id,
            'status': status,
            'message': f'Pagamento {status}'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

