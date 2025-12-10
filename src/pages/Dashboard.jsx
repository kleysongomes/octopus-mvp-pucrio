import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IntegrationContext } from '../context/IntegrationContext';
import StatusCard from '../components/StatusCard';
import TerminalWidget from '../components/TerminalWidget';
import Modal from '../components/Modal';
import Button from '../components/Button';
import './Dashboard.css';

const Dashboard = () => {
  const { logs } = useContext(IntegrationContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0, success: 0, error: 0, pending: 0,
    successRate: 0, mostActiveSystem: '...', systemsList: []
  });

  const [selectedSystem, setSelectedSystem] = useState(null);

  useEffect(() => {
    const total = logs.length;
    const success = logs.filter(i => i.status === 'success').length;
    const error = logs.filter(i => i.status === 'error').length;
    const pending = logs.filter(i => i.status === 'pending').length;
    const successRate = total > 0 ? ((success / total) * 100).toFixed(1) : 0;

    const systemMap = {};
    
    logs.forEach(log => {
      const sysName = log.sourceSystem || log.systemName;
      
      if (!systemMap[sysName]) {
        systemMap[sysName] = { 
          count: 0, 
          errors: 0,
          endpoint: log.endpoint || 'https://api.default.com/v1',
          login: log.login || 'admin_user',
          password: log.password || '******',
          jsonTemplate: log.jsonTemplate || '{ "data": "exemplo" }'
        };
      }
      
      systemMap[sysName].count += 1;
      if (log.status === 'error') systemMap[sysName].errors += 1;
    });

    const systemsList = Object.keys(systemMap).map(name => ({
      name,
      ...systemMap[name]
    })).sort((a, b) => b.count - a.count);

    const topSystem = systemsList.length > 0 ? systemsList[0].name : 'Nenhum';

    setStats({ total, success, error, pending, successRate, mostActiveSystem: topSystem, systemsList });
  }, [logs]);

  return (
    <div className="dashboard-container fade-in">
      <div className="page-header">
        <h1>Central de Comando Octopus</h1>
        <p>Monitoramento de Integrações com Backoffice Protheus.</p>
      </div>

      <div className="stats-grid">
        <StatusCard title="Total de Envios" count={stats.total} type="total" />
        <StatusCard title="Sucessos" count={stats.success} type="success" />
        <StatusCard title="Falhas" count={stats.error} type="error" />
        <StatusCard title="Pendentes" count={stats.pending} type="warning" />
      </div>

      <div className="systems-section">
        <h2>Sistemas Integrados</h2>
        <p className="subtitle">Clique em um cartão para ver dados de conexão e payload.</p>
        
        <div className="systems-grid">
          {stats.systemsList.map((sys) => (
            <div 
              key={sys.name} 
              className="system-mini-card clickable"
              onClick={() => setSelectedSystem(sys)}
            >
              <div className="sys-icon">🔌</div>
              <div className="sys-info">
                <h3>{sys.name}</h3>
                <span>{sys.count} transações</span>
              </div>
              {sys.errors > 0 ? (
                <span className="sys-status-dot error" title="Com falhas"></span>
              ) : (
                <span className="sys-status-dot success" title="Operacional"></span>
              )}
            </div>
          ))}
        </div>
      </div>

      <TerminalWidget logs={logs} />

      <Modal 
        isOpen={!!selectedSystem} 
        onClose={() => setSelectedSystem(null)}
        title={selectedSystem ? `Configuração: ${selectedSystem.name}` : ''}
      >
        {selectedSystem && (
          <div className="system-config-modal">
            <div className="config-row">
               <div className="info-group">
                  <strong>Endpoint de Comunicação:</strong>
                  <div className="code-box-mini">{selectedSystem.endpoint}</div>
               </div>
            </div>

            <div className="config-row flex-row">
               <div className="info-group half">
                  <strong>Usuário de Serviço:</strong>
                  <p>{selectedSystem.login}</p>
               </div>
               <div className="info-group half">
                  <strong>Senha:</strong>
                  <p>{selectedSystem.password}</p>
               </div>
            </div>

            <div className="info-group">
               <strong>Modelo de JSON (Payload Padrão):</strong>
               <div className="json-preview">
                 {selectedSystem.jsonTemplate}
               </div>
            </div>

            <div className="modal-actions-custom" style={{marginTop: '30px', display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
               <Button onClick={() => navigate(`/system/${selectedSystem.name}`)}>
                 Ver Histórico de Logs ➜
               </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;