import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IntegrationContext } from '../context/IntegrationContext';
import Button from '../components/Button';
import './Logs.css';

const SystemReport = () => {
  const { systemName } = useParams();
  const navigate = useNavigate();
  const { logs } = useContext(IntegrationContext);

  const filteredLogs = logs.filter(log => (log.sourceSystem || log.systemName) === systemName);

  return (
    <div className="logs-container fade-in">
      <div style={{marginBottom: '20px'}}>
        <Button onClick={() => navigate(-1)} variant="secondary">← Voltar</Button>
      </div>

      <h1>Relatório: {systemName}</h1>
      <p>Exibindo {filteredLogs.length} registros para este sistema.</p>

      <div className="table-container" style={{marginTop: '20px'}}>
        <table className="logs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Data</th>
              <th>Detalhe</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td>#{log.id}</td>
                <td>{log.type || '-'}</td>
                <td>
                   <span className={`status-badge ${log.status}`}>{log.status}</span>
                </td>
                <td>{log.date}</td>
                <td>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SystemReport;