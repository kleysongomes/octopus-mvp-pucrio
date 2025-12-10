import React from 'react';

const About = () => {
  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h1>Sobre o Octopus</h1>
      <p style={{ marginTop: '20px', lineHeight: '1.6' }}>
        O <strong>Octopus Integration System</strong> é uma solução de middleware desenvolvida para 
        centralizar e monitorar a comunicação entre múltiplos sistemas empresariais.
      </p>
      
      <h3 style={{ marginTop: '30px' }}>Objetivo do MVP</h3>
      <p style={{ marginTop: '10px', lineHeight: '1.6' }}>
        Este projeto foi desenvolvido como parte da avaliação de Front-end Avançado.
        Ele demonstra o uso de React, Componentização e Roteamento para criar um dashboard
        interativo de monitoramento de logs.
      </p>
      
      <div style={{ marginTop: '40px', padding: '20px', background: '#e9ecef', borderRadius: '8px' }}>
        <strong>Versão:</strong> 1.0.0 (MVP)<br/>
        <strong>Desenvolvedor:</strong> Kleyson Gomes
      </div>
    </div>
  );
};

export default About;