import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IntegrationContext } from '../context/IntegrationContext';
import Button from '../components/Button';
import './Register.css';

const Register = () => {
  const { addIntegration, updateIntegration, showToast } = useContext(IntegrationContext);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const editingData = location.state?.data;
  const isEditMode = location.state?.editMode;

  const [formData, setFormData] = useState({
    name: '',
    type: 'API Rest',
    frequency: 'realtime',
    endpoint: '',
    login: '',
    password: '',
    jsonTemplate: '{}'
  });

  useEffect(() => {
    if (isEditMode && editingData) {
      setFormData(editingData);
    }
  }, [isEditMode, editingData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.login || !formData.password || !formData.endpoint) {
      showToast("Por favor, preencha todos os campos obrigatórios.", "warning");
      return;
    }
    
    if (isEditMode) {
      updateIntegration(editingData.name, formData);
      navigate('/manage-integrations');
    } else {
      addIntegration(formData);
      
      setFormData({ 
        name: '', 
        type: 'API Rest', 
        frequency: 'realtime', 
        endpoint: '', 
        login: '', 
        password: '', 
        jsonTemplate: '{}' 
      });
    }
  };

  return (
    <div className="register-container fade-in">
      <div className="register-card">
        <h1>{isEditMode ? `Editando: ${formData.name}` : 'Nova Integração'}</h1>
        <p>Configure a conexão técnica com o <strong>TOTVS Protheus</strong>.</p>
        
        <form onSubmit={handleSubmit} className="register-form">
          
          <h3 className="section-title">Dados do Sistema</h3>
          
          <div className="form-group">
            <label>Nome do Sistema (Origem) *</label>
            <input 
              type="text" 
              placeholder="Ex: E-commerce Vtex" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              disabled={isEditMode} 
              style={isEditMode ? {backgroundColor: '#eee', cursor: 'not-allowed'} : {}}
            />
            {isEditMode && <small>O nome do sistema não pode ser alterado.</small>}
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Método de Envio</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="API Rest">API Rest (JSON)</option>
                <option value="SOAP">Webservice SOAP (XML)</option>
                <option value="FTP">Arquivo Texto (FTP)</option>
              </select>
            </div>
            
            <div className="form-group half">
              <label>Frequência</label>
              <select 
                value={formData.frequency}
                onChange={(e) => setFormData({...formData, frequency: e.target.value})}
              >
                <option value="realtime">Tempo Real (Webhook)</option>
                <option value="5min">A cada 5 minutos</option>
                <option value="hourly">Horário (Batch)</option>
              </select>
            </div>
          </div>

          <h3 className="section-title">Configuração de Conexão</h3>
          
          <div className="form-group">
             <label>Endpoint de Comunicação (URL) *</label>
             <input 
               type="url" 
               placeholder="https://api.protheus..." 
               value={formData.endpoint} 
               onChange={(e) => setFormData({...formData, endpoint: e.target.value})} 
               required 
             />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Login Protheus *</label>
              <input 
                type="text" 
                value={formData.login} 
                onChange={e => setFormData({...formData, login: e.target.value})} 
                required 
              />
            </div>
            <div className="form-group half">
              <label>Senha Protheus *</label>
              <input 
                type="password" 
                value={formData.password} 
                onChange={e => setFormData({...formData, password: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Modelo do JSON de Envio (Payload)</label>
            <textarea 
              className="code-editor" 
              rows="6" 
              value={formData.jsonTemplate} 
              onChange={e => setFormData({...formData, jsonTemplate: e.target.value})}
              placeholder='{ "exemplo": "valor" }'
            ></textarea>
            <small>Defina a estrutura padrão que será enviada para o endpoint.</small>
          </div>

          <div className="form-footer">
            {isEditMode && (
              <Button 
                variant="secondary" 
                onClick={() => navigate('/manage-integrations')} 
                type="button"
              >
                Cancelar
              </Button>
            )}
            
            <div style={{width: '10px'}}></div>
            
            <Button type="submit">
              {isEditMode ? 'Salvar Alterações' : 'Salvar e Testar Conexão'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;