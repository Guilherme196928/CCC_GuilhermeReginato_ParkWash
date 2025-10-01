# ParkWash

**ParkWash** — Aplicativo para reserva de vagas de estacionamento e agendamento de lavagens privadas.

## Sobre
O ParkWash permite reservar vagas de estacionamento e agendar lavagens de forma rápida e prática, reunindo ambos os serviços em um só lugar, com confirmação e controle pelo celular. Este repositório contém o projeto inicial (documentação e código a ser desenvolvido).

## Funcionalidades (MVP)
- Cadastro e login de usuário/cliente
- Cadastro de veículos
- Cadastro e gerenciamento de serviços (lavagem e estacionamento)
- Cadastro de profissionais (manobristas/lavadores)
- Criação, edição e cancelamento de agendamentos
- Histórico de reservas e lavagens

## Arquitetura
Arquitetura escolhida: **MVC (Model-View-Controller)**  
Justificativa: separação clara de responsabilidades (models, views e controllers), facilita testes, manutenção e integração com APIs REST.

## Tecnologias (sugestão)
- Front-end: **React.js** + **TailwindCSS**
- Back-end: **Node.js** + **Express**
- Banco de dados: **PostgreSQL**
- Controle de versão: **Git / GitHub**
- Testes de API: **Postman**
- Diagramas: **draw.io / BRModelo**

## Modelo lógico (resumo)
Entidades principais:
- `usuarios` (id, nome, email, senha, telefone, tipo)
- `clientes` (id_cliente, id_usuario, telefone, cpf)
- `profissionais` (id_profissional, id_usuario, especialidade, status)
- `veiculos` (id_veiculo, id_cliente, placa, modelo, cor)
- `servicos` (id_servico, nome, descricao, preco, duracao)
- `agendamentos` (id_agendamento, id_cliente, id_veiculo, id_servico, id_profissional, data, inicio, fim, status)
- `pagamentos` (id_pagamento, id_agendamento, valor, metodo, status)

> Recomenda-se gerar um diagrama ER/DER com draw.io ou MySQL Workbench para anexar ao documento final.

## Como rodar (desenvolvimento) — instruções iniciais
> Observação: estas são instruções genéricas. Adapte conforme você for implementando os pacotes, scripts e variáveis de ambiente.

1. Clone o repositório:
```bash
git clone <URL-DO-REPO>
cd parkwash
```

2. Back-end (Node.js)
```bash
cd backend
# Instale dependências
npm install

# configurar variáveis de ambiente (ex.: .env)
# Exemplo .env:
# PORT=3000
# DATABASE_URL=postgres://user:password@localhost:5432/parkwash_dev
# JWT_SECRET=secreto
# ...

# Rodar em dev (nodemon recomendado)
npm run dev
```

3. Front-end (React)
```bash
cd frontend
npm install
npm start
# abre em http://localhost:3000 (ou porta configurada)
```

4. Banco de dados
- Criar banco PostgreSQL `parkwash_dev`
- Executar migrations / scripts SQL (quando implementados)
- Popular com dados de teste se necessário

## Estrutura sugerida do repositório
```
/parkwash
  /backend
    /src
      /controllers
      /models
      /routes
      /services
    package.json
  /frontend
    /src
      /components
      /pages
      /services
    package.json
  /docs
    modelo_logico_parkwash.png
    DVP_Template_formatado.docx
README.md
```

## Boas práticas e observações
- Usar `dotenv` para variáveis sensíveis.
- Versionar migrations (ex.: knex, sequelize-cli, or typeorm migrations).
- Implementar autenticação JWT e endpoints seguros (HTTPS em produção).
- Validar entradas (placa, e-mail, formatos) no back-end e front-end.
- Testes unitários e de integração (jest/mocha + supertest para API).

## Exemplo de commit inicial (para hoje)
Se você só vai commitar o README agora, use um commit claro:
```bash
git add README.md
git commit -m "chore: adiciona README inicial do ParkWash com arquitetura e instruções"
git push origin main
```

## Como contribuir
- Crie uma branch para cada feature: `feature/<nome-da-feature>`
- Abra PR com descrição do que foi feito e link para tarefas/issue
- Use mensagens de commit no estilo `type: descrição` (ex.: `feat: criar endpoint de login`)

## Licença
Escolha uma licença (ex.: MIT). Coloque um arquivo `LICENSE` se necessário.
