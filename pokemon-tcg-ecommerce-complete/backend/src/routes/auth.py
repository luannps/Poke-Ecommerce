from flask import Blueprint, request, jsonify, session
from src.models.user import db, User
import re

auth_bp = Blueprint('auth', __name__)

def validate_email(email):
    """Validar formato do email"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """Validar força da senha"""
    if len(password) < 6:
        return False, "Senha deve ter pelo menos 6 caracteres"
    return True, ""

@auth_bp.route('/auth/register', methods=['POST'])
def register():
    """Registrar novo usuário"""
    try:
        data = request.get_json()
        
        username = data.get('username', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        first_name = data.get('first_name', '').strip()
        last_name = data.get('last_name', '').strip()
        phone = data.get('phone', '').strip()
        
        # Validações
        if not username or not email or not password:
            return jsonify({'error': 'Username, email e password são obrigatórios'}), 400
        
        if not validate_email(email):
            return jsonify({'error': 'Email inválido'}), 400
        
        is_valid, password_error = validate_password(password)
        if not is_valid:
            return jsonify({'error': password_error}), 400
        
        # Verificar se usuário já existe
        if User.query.filter_by(username=username).first():
            return jsonify({'error': 'Username já existe'}), 400
        
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email já está em uso'}), 400
        
        # Criar novo usuário
        user = User(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            phone=phone
        )
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        # Fazer login automático
        session['user_id'] = user.id
        session['username'] = user.username
        
        return jsonify({
            'message': 'Usuário criado com sucesso',
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    """Fazer login"""
    try:
        data = request.get_json()
        
        username_or_email = data.get('username', '').strip()
        password = data.get('password', '')
        
        if not username_or_email or not password:
            return jsonify({'error': 'Username/email e password são obrigatórios'}), 400
        
        # Buscar usuário por username ou email
        user = User.query.filter(
            db.or_(
                User.username == username_or_email,
                User.email == username_or_email.lower()
            )
        ).first()
        
        if not user or not user.check_password(password):
            return jsonify({'error': 'Credenciais inválidas'}), 401
        
        if not user.is_active:
            return jsonify({'error': 'Conta desativada'}), 401
        
        # Criar sessão
        session['user_id'] = user.id
        session['username'] = user.username
        
        return jsonify({
            'message': 'Login realizado com sucesso',
            'user': user.to_dict()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/auth/logout', methods=['POST'])
def logout():
    """Fazer logout"""
    try:
        session.clear()
        return jsonify({'message': 'Logout realizado com sucesso'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/auth/me', methods=['GET'])
def get_current_user():
    """Obter dados do usuário atual"""
    try:
        user_id = session.get('user_id')
        
        if not user_id:
            return jsonify({'error': 'Usuário não autenticado'}), 401
        
        user = User.query.get(user_id)
        if not user:
            session.clear()
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        return jsonify(user.to_dict())
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/auth/profile', methods=['PUT'])
def update_profile():
    """Atualizar perfil do usuário"""
    try:
        user_id = session.get('user_id')
        
        if not user_id:
            return jsonify({'error': 'Usuário não autenticado'}), 401
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        data = request.get_json()
        
        # Atualizar campos permitidos
        if 'first_name' in data:
            user.first_name = data['first_name'].strip()
        
        if 'last_name' in data:
            user.last_name = data['last_name'].strip()
        
        if 'phone' in data:
            user.phone = data['phone'].strip()
        
        if 'email' in data:
            new_email = data['email'].strip().lower()
            if new_email != user.email:
                if not validate_email(new_email):
                    return jsonify({'error': 'Email inválido'}), 400
                
                # Verificar se email já está em uso
                if User.query.filter_by(email=new_email).first():
                    return jsonify({'error': 'Email já está em uso'}), 400
                
                user.email = new_email
        
        db.session.commit()
        
        return jsonify({
            'message': 'Perfil atualizado com sucesso',
            'user': user.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/auth/change-password', methods=['PUT'])
def change_password():
    """Alterar senha do usuário"""
    try:
        user_id = session.get('user_id')
        
        if not user_id:
            return jsonify({'error': 'Usuário não autenticado'}), 401
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        data = request.get_json()
        current_password = data.get('current_password', '')
        new_password = data.get('new_password', '')
        
        if not current_password or not new_password:
            return jsonify({'error': 'Senha atual e nova senha são obrigatórias'}), 400
        
        # Verificar senha atual
        if not user.check_password(current_password):
            return jsonify({'error': 'Senha atual incorreta'}), 400
        
        # Validar nova senha
        is_valid, password_error = validate_password(new_password)
        if not is_valid:
            return jsonify({'error': password_error}), 400
        
        # Atualizar senha
        user.set_password(new_password)
        db.session.commit()
        
        return jsonify({'message': 'Senha alterada com sucesso'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

