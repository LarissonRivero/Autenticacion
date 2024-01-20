import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Registro exitoso');
        setTimeout(() => navigate('/'), 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error en el registro: ${errorData.error}`);
      }
    } catch (error) {
      setErrorMessage(`Error en la solicitud: ${error.message}`);
    }
  };

  return (
    <Form className='bg-dark text-white p-4 rounded shadow'>
      <Form.Label className='fs-2 mb-3'>Formulario de Registro</Form.Label>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label className='fs-4'>Email address:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          Nunca compartimos tu email con nadie.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label className='fs-4'>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label className='fs-4'>Name:</Form.Label>
        <Form.Control type="text" placeholder="Ingrese un Nombre de Usuario" onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Button className="mt-3 fs-5" variant="primary" type="button" onClick={handleRegister}>
        Registrarme
      </Button>
      <p className='mt-2 fs-5'>¿Ya tienes cuenta? <Link to="/loginusers"><p>Iniciar Sesión</p></Link></p>
    </Form>
  );
}

export default Register;
