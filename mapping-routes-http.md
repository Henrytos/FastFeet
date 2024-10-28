# FastFeet API - Routes Documentation

## Autenticação
- **[ x ] POST /accounts/admin**: Realizar sing up com CPF e senha.
- **[ x ] POST /accounts/user**: Realizar sing up com CPF e senha.


## Profile
- **[ x ] GET /profile**: ver pefil do usuario autenticado

### Login
- **[ x ] POST /session**: Realizar login com CPF e senha.

---

## Usuários (Admin e Entregador)

### Cadastrar Usuário (Admin ou Entregador)
- **[ x ] POST /users**: Cadastrar um novo usuário.

### Listar Usuários
- **[ ] GET /users**: Listar todos os usuários.

### Visualizar Usuário por ID
- **[ x ] GET /users/{id}**: Visualizar um usuário específico.

### Atualizar Usuário
- **[ x ] PUT /users/{id}**: Atualizar informações de um usuário.

### Excluir Usuário
- **[ x ] DELETE /users/{id}**: Excluir um usuário.

### Alterar Senha
- **[ ] PATCH /users/{id}/password**: Alterar a senha de um usuário (somente o admin pode realizar essa operação).

---

## Entregadores

### Criar Entregador
- **[ ] POST /deliverymen**: Cadastrar um novo entregador (somente admin).

### Listar Entregadores
- **[ ] GET /deliverymen**: Listar todos os entregadores (somente admin).

### Visualizar Entregador por ID
- **[ ] GET /deliverymen/{id}**: Visualizar um entregador específico (somente admin).

### Atualizar Entregador
- **[ ] PUT /deliverymen/{id}**: Atualizar dados de um entregador (somente admin).

### Excluir Entregador
- **[ ] DELETE /deliverymen/{id}**: Excluir um entregador (somente admin).

### Listar Entregas do Entregador
- **[ ] GET /deliverymen/{id}/deliveries**: Listar as entregas associadas a um entregador específico.

---

## Destinatários

### Criar Destinatário
- **[ ] POST /recipients**: Cadastrar um novo destinatário (somente admin).

### Listar Destinatários
- **[ ] GET /recipients**: Listar todos os destinatários (somente admin).

### Visualizar Destinatário por ID
- **[ ] GET /recipients/{id}**: Visualizar um destinatário específico (somente admin).

### Atualizar Destinatário
- **[ ] PUT /recipients/{id}**: Atualizar dados de um destinatário (somente admin).

### Excluir Destinatário
- **[ ] DELETE /recipients/{id}**: Excluir um destinatário (somente admin).

---

## Encomendas

### Criar Encomenda
- **[ ] POST /orders**: Cadastrar uma nova encomenda (somente admin).

### Listar Encomendas
- **[ ] GET /orders**: Listar todas as encomendas (somente admin).

### Visualizar Encomenda por ID
- **[ ] GET /orders/{id}**: Visualizar uma encomenda específica (somente admin).

### Atualizar Encomenda
- **[ ] PUT /orders/{id}**: Atualizar os dados de uma encomenda (somente admin).

### Excluir Encomenda
- **[ ] DELETE /orders/{id}**: Excluir uma encomenda (somente admin).

### Marcar Encomenda como Aguardando Retirada
- **[ ] PATCH /orders/{id}/pending**: Marcar uma encomenda como disponível para retirada (somente admin).

### Retirar Encomenda
- **[ ] PATCH /orders/{id}/pickup**: Retirar uma encomenda (somente o entregador que foi designado para a entrega pode realizar essa ação).

### Marcar Encomenda como Entregue
- **[ ] PATCH /orders/{id}/delivered**: Marcar uma encomenda como entregue (somente o entregador que retirou a encomenda pode realizar essa ação, e é obrigatório enviar uma foto).

### Marcar Encomenda como Devolvida
- **[ ] PATCH /orders/{id}/returned**: Marcar uma encomenda como devolvida.

### Listar Encomendas Próximas ao Entregador
- **[ ] GET /orders/nearby**: Listar encomendas com endereços próximos ao local do entregador (baseado na localização do entregador).

---

## Notificações

### Notificar Destinatário
- **[ ] POST /notifications/{orderId}**: Notificar o destinatário sobre o status da encomenda após qualquer alteração.
