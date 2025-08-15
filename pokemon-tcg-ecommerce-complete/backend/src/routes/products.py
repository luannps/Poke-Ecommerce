from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.product import Product
import requests
import json

products_bp = Blueprint('products', __name__)

# Mock data para produtos
MOCK_PRODUCTS = [
    {
        'name': 'Pikachu VMAX',
        'description': 'Carta Ultra Rare do Pikachu VMAX da expansão Brilliant Stars',
        'price': 89.90,
        'original_price': 120.00,
        'category': 'Carta Avulsa',
        'subcategory': 'Pokemon',
        'rarity': 'Ultra Rare',
        'set_name': 'Brilliant Stars',
        'image_url': '/api/placeholder/300/400',
        'stock': 15,
        'rating': 4.8
    },
    {
        'name': 'Charizard GX',
        'description': 'Carta Secret Rare do Charizard GX da expansão Hidden Fates',
        'price': 156.90,
        'original_price': 200.00,
        'category': 'Carta Avulsa',
        'subcategory': 'Pokemon',
        'rarity': 'Secret Rare',
        'set_name': 'Hidden Fates',
        'image_url': '/api/placeholder/300/400',
        'stock': 8,
        'rating': 4.9
    },
    {
        'name': 'Deck Tema Relentless Flame',
        'description': 'Deck pronto de 60 cartas com tema de fogo',
        'price': 45.90,
        'category': 'Deck Pronto',
        'subcategory': 'Theme Deck',
        'rarity': 'Theme Deck',
        'set_name': 'Unbroken Bonds',
        'image_url': '/api/placeholder/300/400',
        'stock': 25,
        'rating': 4.5
    },
    {
        'name': 'Booster Pack Evolving Skies',
        'description': 'Pacote booster da expansão Evolving Skies com 11 cartas',
        'price': 24.90,
        'category': 'Booster',
        'subcategory': 'Booster Pack',
        'rarity': 'Booster Pack',
        'set_name': 'Evolving Skies',
        'image_url': '/api/placeholder/300/400',
        'stock': 50,
        'rating': 4.7
    },
    {
        'name': 'Mewtwo & Mew GX',
        'description': 'Carta Ultra Rare do Mewtwo & Mew GX da expansão Unified Minds',
        'price': 78.90,
        'original_price': 95.00,
        'category': 'Carta Avulsa',
        'subcategory': 'Pokemon',
        'rarity': 'Ultra Rare',
        'set_name': 'Unified Minds',
        'image_url': '/api/placeholder/300/400',
        'stock': 0,
        'rating': 4.8
    },
    {
        'name': 'Rayquaza VMAX',
        'description': 'Carta Secret Rare do Rayquaza VMAX da expansão Evolving Skies',
        'price': 134.90,
        'category': 'Carta Avulsa',
        'subcategory': 'Pokemon',
        'rarity': 'Secret Rare',
        'set_name': 'Evolving Skies',
        'image_url': '/api/placeholder/300/400',
        'stock': 12,
        'rating': 4.9
    }
]

@products_bp.route('/products', methods=['GET'])
def get_products():
    """Listar todos os produtos com filtros opcionais"""
    try:
        # Parâmetros de filtro
        category = request.args.get('category')
        search = request.args.get('search')
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        # Query base
        query = Product.query.filter_by(is_active=True)
        
        # Aplicar filtros
        if category:
            query = query.filter(Product.category.ilike(f'%{category}%'))
        
        if search:
            query = query.filter(
                db.or_(
                    Product.name.ilike(f'%{search}%'),
                    Product.description.ilike(f'%{search}%'),
                    Product.set_name.ilike(f'%{search}%')
                )
            )
        
        if min_price:
            query = query.filter(Product.price >= min_price)
        
        if max_price:
            query = query.filter(Product.price <= max_price)
        
        # Paginação
        products = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'products': [product.to_dict() for product in products.items],
            'total': products.total,
            'pages': products.pages,
            'current_page': page,
            'per_page': per_page
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Obter detalhes de um produto específico"""
    try:
        product = Product.query.get_or_404(product_id)
        return jsonify(product.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/products/category/<category>', methods=['GET'])
def get_products_by_category(category):
    """Obter produtos por categoria"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        products = Product.query.filter_by(
            category=category, 
            is_active=True
        ).paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'products': [product.to_dict() for product in products.items],
            'total': products.total,
            'pages': products.pages,
            'current_page': page,
            'per_page': per_page,
            'category': category
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/products/featured', methods=['GET'])
def get_featured_products():
    """Obter produtos em destaque"""
    try:
        # Produtos com rating alto e em estoque
        products = Product.query.filter(
            Product.is_active == True,
            Product.stock > 0,
            Product.rating >= 4.5
        ).order_by(Product.rating.desc()).limit(8).all()
        
        return jsonify([product.to_dict() for product in products])
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/products/init-data', methods=['POST'])
def init_products_data():
    """Inicializar dados de produtos (apenas para desenvolvimento)"""
    try:
        # Verificar se já existem produtos
        if Product.query.count() > 0:
            return jsonify({'message': 'Produtos já existem no banco de dados'})
        
        # Criar produtos mock
        for product_data in MOCK_PRODUCTS:
            product = Product(**product_data)
            db.session.add(product)
        
        db.session.commit()
        
        return jsonify({
            'message': f'{len(MOCK_PRODUCTS)} produtos criados com sucesso'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@products_bp.route('/cards/search', methods=['GET'])
def search_pokemon_cards():
    """Buscar cartas na API do Pokémon TCG"""
    try:
        query = request.args.get('q', '')
        page = request.args.get('page', 1, type=int)
        page_size = request.args.get('pageSize', 20, type=int)
        
        # URL da API do Pokémon TCG
        api_url = 'https://api.pokemontcg.io/v2/cards'
        
        params = {
            'q': query,
            'page': page,
            'pageSize': page_size
        }
        
        # Fazer requisição para a API
        response = requests.get(api_url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            return jsonify(data)
        else:
            return jsonify({'error': 'Erro ao buscar cartas'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/cards/sets', methods=['GET'])
def get_pokemon_sets():
    """Obter lista de expansões/sets do Pokémon TCG"""
    try:
        # URL da API do Pokémon TCG para sets
        api_url = 'https://api.pokemontcg.io/v2/sets'
        
        response = requests.get(api_url)
        
        if response.status_code == 200:
            data = response.json()
            return jsonify(data)
        else:
            return jsonify({'error': 'Erro ao buscar sets'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

