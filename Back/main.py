from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
import jwt

app = Flask(__name__)

password = os.environ.get('DB_PASSWORD', 'Lar1ss0n')

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', f'postgresql://postgres:{password}@localhost:5432/Autenticacion')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(120))
    jwt = db.Column(db.String(500))

@app.route('/auth', methods=['POST'])
def authenticate_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        return jsonify({
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'jwt': user.jwt
        })
    else:
        return jsonify({
            'error': 'Email o contraseña incorrectos'
        }), 401

@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    email = data.get('email')
    password = generate_password_hash(data.get('password'), method='pbkdf2:sha256')  # Usa 'pbkdf2:sha256'
    name = data.get('name')

    new_user = User(email=email, password=password, name=name)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        'id': new_user.id,
        'email': new_user.email,
        'name': new_user.name
    })

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users = list(map(lambda user: {
        'id': user.id,
        'email': user.email,
        'name': user.name
    }, users))

    return jsonify(users)


@app.route('/update-jwt', methods=['POST'])
def update_user_jwt():
    data = request.json
    user_id = data.get('id')
    jwt_token = data.get('jwt')

    user = User.query.get(user_id)

    if user:
        user.jwt = jwt_token
        db.session.commit()

        return jsonify({
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'jwt': user.jwt
        })
    else:
        return jsonify({
            'error': 'Usuario no encontrado'
        }), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
