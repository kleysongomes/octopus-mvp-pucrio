import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
  const location = useLocation();

  if (location.pathname === '/') return null; 

  const pathnames = location.pathname.split('/').filter((x) => x);

  const routeNameMap = {
    'logs': 'Monitoramento de Logs',
    'system': 'Relatório por Sistema',
    'about': 'Sobre o Projeto'
  };

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      <div className="container">
        <ul className="breadcrumb-list">
          
          <li className="breadcrumb-item">
            <Link to="/">Início</Link>
          </li>

          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            const displayName = routeNameMap[value] || decodeURIComponent(value);

            return (
              <li key={to} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
                <span className="separator">/</span>
                {isLast ? (
                  <span className="current-page">{displayName}</span>
                ) : (
                  <Link to={to}>{displayName}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Breadcrumbs;