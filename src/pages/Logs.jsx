import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IntegrationContext } from '../context/IntegrationContext';
import SearchInput from '../components/SearchInput';
import Modal from '../components/Modal';
import './Logs.css';

const Logs = () => {
  const { logs } = useContext(IntegrationContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  // Filtro
  const filteredLogs = logs.filter(log => {
    const sysName = log.sourceSystem || log.systemName;
    return sysName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           log.status.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="logs-container fade-in">
      <div className="header-flex">
        <div>
          <h1>Monitoramento de Logs</h1>
          <p>Histórico completo de transações.</p>
        </div>
        <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Buscar..." />
      </div>

      <div className="table-container">
        <table className="logs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Origem</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td>#{log.id}</td>
                <td>
                  <Link to={`/system/${log.sourceSystem || log.systemName}`} style={{color: '#007bff', fontWeight: 'bold'}}>
                    {log.sourceSystem || log.systemName}
                  </Link>
                </td>
                <td>
                  <span className={`status-badge ${log.status}`}>
                    {log.status === 'success' ? 'Sucesso' : log.status === 'error' ? 'Erro' : log.status === 'stopped' ? 'Parado' : 'Pendente'}
                  </span>
                </td>
                <td>{log.date}</td>
                <td>
                  <button 
                    className="details-link" 
                    onClick={() => setSelectedLog(log)}
                    style={{background: 'none', border: 'none', fontSize: 'inherit', fontFamily: 'inherit'}}
                  >
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={!!selectedLog} 
        onClose={() => setSelectedLog(null)}
        title={selectedLog ? `Detalhes do Envio #${selectedLog.id}` : ''}
      >
        {selectedLog && (
          <div className="log-modal-details">
             <div className="info-group">
                <strong>Sistema Origem:</strong> {selectedLog.sourceSystem || selectedLog.systemName}
             </div>
             <div className="info-group">
                <strong>Sistema Destino:</strong> {selectedLog.targetSystem || 'TOTVS Protheus'}
             </div>
             <div className="info-group">
                <strong>Tipo:</strong> {selectedLog.type || 'Transação Padrão'}
             </div>
             <div className="info-group">
                <strong>Status:</strong> 
                <span className={`status-badge ${selectedLog.status}`} style={{marginLeft: '10px'}}>
                  {selectedLog.status}
                </span>
             </div>
             <div className="info-group" style={{marginTop: '20px'}}>
                <strong>Log Técnico:</strong>
                <div style={{background: '#f4f4f9', padding: '10px', marginTop: '5px', borderRadius: '4px', fontFamily: 'monospace'}}>
                  {selectedLog.details}
                </div>
             </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Logs;