import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

function LoginUsers() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('token', userData.jwt);
        localStorage.setItem('userObject', JSON.stringify(userData));
        navigate('/private');
      } else {
        const errorData = await response.json();
        setError(`Error en el inicio de sesión: ${errorData.error}`);
      }
    } catch (error) {
      setError(`Error en la solicitud: ${error.message}`);
    }
  };

  return (
    <Form style={{ backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='fs-3'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} style={{ backgroundColor: 'black', color: 'white', borderColor: 'white' }} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='fs-3'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ backgroundColor: 'black', color: 'white', borderColor: 'white' }} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check className="text-start" type="checkbox" label="Recuerdame" />
      </Form.Group>
      {error && <div className="alert alert-danger">{error}</div>}
      <Button variant="primary" type="submit" onClick={handleLogin}>
        Ingresar
      </Button>
      <p className='mt-2 fs-5'>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
    </Form>
  );
}

export default LoginUsers;
