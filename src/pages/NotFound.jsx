import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="fade-in" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ fontSize: '5rem', color: '#ddd' }}>404</h1>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Página não encontrada</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        Ops! Um dos braços do polvo não alcançou essa página.
      </p>
      <Link to="/">
        <Button>Voltar para o Início</Button>
      </Link>
    </div>
  );
};

export default NotFound;