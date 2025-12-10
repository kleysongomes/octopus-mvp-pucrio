import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TerminalWidget.css';

const TerminalWidget = ({ logs }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Começa recolhido

  // Pegamos apenas os últimos 10 logs para não poluir
  const recentLogs = logs.slice(0, 10);

  return (
    <div className={`terminal-widget ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="terminal-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="terminal-title">
          <span className="terminal-icon">_&gt;</span>
          Console de Eventos em Tempo Real
        </div>
        <div className="terminal-controls">
          <span className="toggle-text">{isExpanded ? 'Minimizar [_]' : 'Expandir [ ]'}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="terminal-body">
          {recentLogs.map((log) => (
            <div key={log.id} className="terminal-line">
              <span className="t-date">[{log.date}]</span>
              <span className={`t-status ${log.status}`}>{log.status.toUpperCase()}</span>
              <span className="t-system">{log.systemName}:</span>
              <span className="t-msg">{log.details}</span>
            </div>
          ))}
          
          <div className="terminal-footer">
            <span>... últimos 10 eventos exibidos.</span>
            <Link to="/logs" className="terminal-link">
              Abrir logs completos &gt;&gt;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalWidget;