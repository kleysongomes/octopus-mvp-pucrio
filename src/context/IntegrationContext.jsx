import React, { createContext, useState, useEffect } from 'react';
import initialData from '../data/db.json';

export const IntegrationContext = createContext();

export const IntegrationProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [systems, setSystems] = useState([]);
  
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    setLogs(initialData);
    const sysMap = {};
    initialData.forEach(log => {
      const name = log.sourceSystem || log.systemName;
      if (!sysMap[name]) {
        sysMap[name] = {
          name: name,
          endpoint: log.endpoint || 'https://api.default.com',
          login: log.login || 'admin',
          password: log.password || '***',
          jsonTemplate: log.jsonTemplate || '{}',
          type: log.type || 'API Rest'
        };
      }
    });
    setSystems(Object.values(sysMap));
  }, []);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addIntegration = (data) => {
    if (systems.find(s => s.name === data.name)) {
      showToast('Este sistema já está cadastrado!', 'error');
      return;
    }
    setSystems([...systems, data]);
    
    const newLog = {
      id: Date.now(),
      sourceSystem: data.name,
      targetSystem: "TOTVS Protheus",
      status: "success",
      date: new Date().toISOString().split('T')[0],
      type: "Configuração",
      details: `Nova integração cadastrada: ${data.name}`
    };
    setLogs([newLog, ...logs]);
    showToast(`Sistema ${data.name} cadastrado com sucesso!`, 'success');
  };

  const updateIntegration = (oldName, newData) => {
    setSystems(prev => prev.map(sys => sys.name === oldName ? newData : sys));
    showToast(`Configurações de ${newData.name} atualizadas!`, 'success');
  };

  const deleteIntegration = (name) => {
    if (window.confirm(`Tem certeza que deseja remover ${name}?`)) {
      setSystems(prev => prev.filter(sys => sys.name !== name));
      showToast('Integração removida com sucesso.', 'info');
    }
  };

  const retryLog = (id) => {
    setLogs(current => current.map(l => l.id === id ? { ...l, status: 'pending', details: 'Reenviando...' } : l));
    showToast('Reenvio solicitado. Aguarde o processamento...', 'info');
    
    setTimeout(() => {
      setLogs(current => current.map(l => l.id === id ? { ...l, status: 'success', details: 'Reenvio OK.' } : l));
      showToast('Processamento concluído com sucesso!', 'success'); 
    }, 2000);
  };

  const stopLog = (id) => {
    setLogs(current => current.map(l => l.id === id ? { ...l, status: 'stopped', details: 'Parado manualmente.' } : l));
    showToast('Processo interrompido pelo usuário.', 'warning');
  };

  return (
    <IntegrationContext.Provider value={{ 
      logs, systems, 
      addIntegration, updateIntegration, deleteIntegration, retryLog, stopLog,
      toasts, showToast, removeToast
    }}>
      {children}
    </IntegrationContext.Provider>
  );
};