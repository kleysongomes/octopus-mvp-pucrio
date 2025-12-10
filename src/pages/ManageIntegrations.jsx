import React, { useContext } from 'react';
import { IntegrationContext } from '../context/IntegrationContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './Logs.css';

const ManageIntegrations = () => {
  const { systems, deleteIntegration } = useContext(IntegrationContext);
  const navigate = useNavigate();

  return (
    <div className="logs-container fade-in">
      <div className="header-flex">
        <div>
          <h1>Gerenciar Cadastros</h1>
          <p>Listagem de sistemas integrados e configurações.</p>
        </div>
        <Button onClick={() => navigate('/register')}>+ Novo Cadastro</Button>
      </div>

      <div className="table-container">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Sistema</th>
              <th>Endpoint</th>
              <th>Usuário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {systems.map((sys, idx) => (
              <tr key={idx}>
                <td><strong>{sys.name}</strong></td>
                <td style={{fontSize:'0.9rem', color:'#666'}}>{sys.endpoint}</td>
                <td>{sys.login}</td>
                <td>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <button 
                      className="details-link"
                      onClick={() => navigate('/register', { state: { editMode: true, data: sys } })}
                    >
                      Editar
                    </button>
                    
                    <button 
                      className="details-link" 
                      style={{color: 'red'}}
                      onClick={() => deleteIntegration(sys.name)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageIntegrations;