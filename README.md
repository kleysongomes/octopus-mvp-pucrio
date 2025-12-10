# Octopus Integration System (MVP)

MVP de Desenvolvimento Front-end Avancado
Sistema de mediacao e monitoramento de filas de integracao entre sistemas externos e o backoffice TOTVS Protheus.

---

## Sobre o Projeto

O Octopus e um dashboard administrativo desenvolvido para centralizar, monitorar e gerenciar a comunicacao entre multiplos sistemas empresariais (como E-commerce VTEX, CRM Salesforce, WMS) e o ERP central.

Este projeto foi criado como parte da avaliacao da disciplina de Front-end Avancado, demonstrando o uso de React, Componentizacao, Roteamento e Gerenciamento de Estado Global.

### Objetivo
Resolver o problema de "caixa preta" nas integracoes, fornecendo uma interface visual onde o operador pode:
1. Monitorar o status dos envios em tempo real.
2. Identificar e corrigir falhas de comunicacao.
3. Gerenciar o cadastro de novas origens de dados.

---

## Funcionalidades Principais

* Dashboard Analitico: Visao geral com KPIs de sucesso, falha e sistemas mais ativos. Inclui um widget de terminal para logs em tempo real.
* Monitoramento de Logs: Listagem completa de transacoes com busca dinamica e filtros por status.
* Gerenciamento de Filas: Tela dedicada para tratar erros (Reenviar) ou cancelar processamentos pendentes (Parar), com simulacao de delay de rede.
* CRUD de Integracoes: Cadastro, edicao e exclusao de sistemas com configuracoes tecnicas (Endpoint, Login, Senha e Payload JSON).
* Feedback Visual: Sistema de notificacoes (Toasts) para feedback imediato das acoes do usuario (Sucesso, Erro, Aviso).
* Design Responsivo: Interface adaptavel para Desktop, Tablet e Mobile, com menu lateral inteligente e tabelas com scroll horizontal.
* Navegacao Avancada: Uso de Breadcrumbs (Migalhas de Pao), rotas dinamicas (/logs/:id) e Modal para detalhes.

---

## Tecnologias Utilizadas

* React: Biblioteca principal para construcao da interface.
* Vite: Ferramenta de build e ambiente de desenvolvimento rapido.
* React Router Dom: Gerenciamento de rotas e navegacao (SPA).
* Context API: Gerenciamento de estado global para simular um banco de dados e persistencia de sessao durante o uso.
* CSS3: Estilizacao responsiva com variaveis globais (CSS Variables) e Flexbox/Grid.

---

## Estrutura do Projeto

O projeto segue uma arquitetura organizada para facilitar a escalabilidade e manutencao:

octopus-mvp/
├── public/              # Arquivos estaticos

├── src/

│   ├── assets/          # Estilos Globais e Imagens

│   ├── components/      # Componentes Reutilizaveis (Sidebar, Cards, Modal, Toast, etc.)

│   ├── context/         # Gerenciamento de Estado Global (IntegrationContext)

│   ├── data/            # Mock de dados (db.json) simulando API

│   ├── pages/           # Paginas da aplicacao (Dashboard, Logs, Queues, Register, etc.)

│   ├── App.jsx          # Componente Raiz e Configuracao de Layout

│   └── main.jsx         # Ponto de entrada

└── README.md            # Documentacao do projeto

---

## Como Rodar o Projeto

Pre-requisitos: Voce precisa ter o Node.js instalado em sua maquina.

1. Clone o repositorio
   git clone https://github.com/kleysongomes/octopus-mvp-pucrio.git
   cd octopus-mvp-pucrio

2. Instale as dependencias
   npm install

3. Inicie o servidor de desenvolvimento
   npm run dev

4. Acesse a aplicacao
   O terminal ira mostrar o link local, geralmente: http://localhost:5173

---

## Roteiro de Testes (Para Avaliacao)

Para verificar os requisitos do MVP, siga este fluxo sugerido:

1. Navegacao e Rotas:
   - Utilize o Menu Lateral para navegar entre as paginas.
   - Observe o Breadcrumb no topo atualizando o caminho automaticamente.
   - Teste a responsividade diminuindo a janela do navegador.

2. Gerenciamento (CRUD):
   - Acesse "Nova Integracao" e cadastre um sistema.
   - Veja o feedback visual (Toast Verde).
   - Va em "Gerenciar Cadastros", clique em Editar no sistema criado, altere algo e salve.
   - Depois, clique em Excluir para remove-lo.

3. Filas e Contexto:
   - Acesse a tela "Filas e Erros".
   - Filtre por "Erros". Clique no botao "Reenviar".
   - Observe o Toast de "Aguarde..." e depois o de "Sucesso". O item saira da lista de erros.

4. Pagina de Erro (404):
   - No menu lateral, clique em "Disponibilidade (Teste 404)" ou digite uma URL aleatoria.
   - Voce vera a pagina personalizada de "Pagina nao encontrada".

---

## Autor

Desenvolvido por Kleyson Gomes

Projeto entregue para o MVP de Front-end Avancado.

Imagens:

<img width="1904" height="985" alt="image" src="https://github.com/user-attachments/assets/22d09907-6e1a-4f05-9f7c-7f598c00ca97" />
<img width="1917" height="943" alt="image" src="https://github.com/user-attachments/assets/bae09921-7cef-4ec0-804a-1dc26cf751bf" />
<img width="1915" height="943" alt="image" src="https://github.com/user-attachments/assets/baa766ad-b751-4ee3-a1db-92fa97eb2327" />
<img width="1901" height="946" alt="image" src="https://github.com/user-attachments/assets/51d9ab15-1a1e-45ef-93ea-2bc67f97a7da" />
<img width="1918" height="943" alt="image" src="https://github.com/user-attachments/assets/6f3ae33a-907e-4373-89cf-2124f9fc9dae" />
<img width="1918" height="942" alt="image" src="https://github.com/user-attachments/assets/3fe6ed62-f21a-4ca9-a277-ed7f146f8eee" />
<img width="1903" height="944" alt="image" src="https://github.com/user-attachments/assets/9d3f7be5-05e0-4ea2-84f1-59d6ac2a6e84" />
<img width="1919" height="943" alt="image" src="https://github.com/user-attachments/assets/b669d9fc-bd45-44cd-8270-ddd10e7a30f4" />





