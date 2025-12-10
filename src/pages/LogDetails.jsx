import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logsData from '../data/db.json';
import Button from '../components/Button';
import './LogDetails.css';

const LogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState(null);

  useEffect(() => {
    const foundLog = logsData.find((item) => item.id === parseInt(id));
    
    if (foundLog) {
      setLog(foundLog);
    }
  }, [id]);

  if (!log) return <div className="loading">Carregando detalhes...</div>;

  return (
    <div className="details-container fade-in">
      <div className="details-card">
        <div className="header-details">
          <h2>Detalhes do Envio #{log.id}</h2>
          <span className={`status-tag ${log.status}`}>{log.status}</span>
        </div>
        
        <div className="info-group">
          <strong>Sistema de Origem:</strong>
          <p>{log.systemName}</p>
        </div>

        <div className="info-group">
          <strong>Data do Processamento:</strong>
          <p>{log.date}</p>
        </div>

        <div className="info-group">
          <strong>Mensagem de Log:</strong>
          <div className="log-message">
            {log.details}
          </div>
        </div>

        <div className="actions">
          <Button onClick={() => navigate(-1)} variant="secondary">
            Voltar
          </Button>
          
          <Button onClick={() => alert('Download do log simulado!')}>
            Baixar Log Técnico
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogDetails;