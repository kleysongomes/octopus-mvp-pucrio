import React, { useContext, useState } from 'react';
import { IntegrationContext } from '../context/IntegrationContext';
import Button from '../components/Button';
import './Logs.css';

const Queues = () => {
  const { logs, retryLog, stopLog } = useContext(IntegrationContext);
  const [filter, setFilter] = useState('all'); 

  const queueLogs = logs.filter(log => {
    const isQueueItem = log.status !== 'success';
    if (filter === 'all') return isQueueItem;
    return isQueueItem && log.status === filter;
  });

  return (
    <div className="logs-container fade-in">
      <div className="header-flex">
        <div>
          <h1>Filas de Processamento</h1>
          <p>Gerencie reenvios e integrações paradas.</p>
        </div>
        
        <div className="filter-buttons">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active-filter' : ''}>Todos</button>
          <button onClick={() => setFilter('error')} className={filter === 'error' ? 'active-filter' : ''}>Erros</button>
          <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active-filter' : ''}>Pendentes</button>
        </div>
      </div>

      <div className="table-container">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Origem</th>
              <th>Destino</th>
              <th>Status</th>
              <th>Detalhe</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {queueLogs.length > 0 ? (
              queueLogs.map((log) => (
                <tr key={log.id}>
                  <td><strong>{log.sourceSystem}</strong></td>
                  <td>{log.targetSystem}</td>
                  <td>
                    <span className={`status-badge ${log.status}`}>{log.status}</span>
                  </td>
                  <td style={{maxWidth: '250px', whiteSpace: 'normal', fontSize: '0.9rem'}}>
                    {log.details}
                  </td>
                  <td>
                    <div style={{display: 'flex', gap: '10px'}}>
                      {log.status === 'error' && (
                        <Button onClick={() => retryLog(log.id)}>Reenviar</Button>
                      )}
                      {log.status === 'pending' && (
                        <Button onClick={() => stopLog(log.id)} variant="secondary">Parar</Button>
                      )}
                      {log.status === 'stopped' && <span style={{color:'#999'}}>Cancelado</span>}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', padding: '30px'}}>
                  Nenhuma pendência na fila! Tudo processado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Queues;