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

1


