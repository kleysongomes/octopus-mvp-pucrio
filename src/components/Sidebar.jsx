// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo-header.png';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mobile-header">
        <div className="mobile-logo-area">
          <img src={logo} alt="Octopus" />
        </div>
        <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img src={logo} alt="Octopus" />
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <h3>MONITORAMENTO</h3>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>
              Dashboard Geral
            </NavLink>
            <NavLink to="/logs" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>
              Logs Detalhados
            </NavLink>
          </div>

          <div className="nav-group">
            <h3>GESTÃO</h3>
            <NavLink to="/queues" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>
              Filas e Erros
            </NavLink>
            <NavLink to="/manage-integrations" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>
              Gerenciar Cadastros
            </NavLink>
          </div>

          <div className="nav-group">
            <h3>CONFIGURAÇÃO</h3>
            <NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>
              Nova Integração
            </NavLink>
            <NavLink to="/disp" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>
               Disponibilidade
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsOpen(false)}>
              Sobre
            </NavLink>
          </div>
        </nav>

        <div className="sidebar-footer">
          <p>Octopus v1.0 MVP</p>
        </div>
      </aside>

      {isOpen && <div className="overlay-mobile" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;