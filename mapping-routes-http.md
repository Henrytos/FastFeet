# FastFeet API - Routes Documentation

## Autenticação
- **[ x ] POST /accounts/admin**: Realizar sing up com CPF e senha.
- **[ x ] POST /accounts/deliverymans**: Realizar sing up com CPF e senha.


## Profile
- **[ x ] GET /profile**: ver pefil do usuario autenticado

### Login
- **[ x ] POST /session**: Realizar login com CPF e senha.

---

## Usuários (Admin e Entregador)

### Cadastrar Usuário (Admin ou Entregador)
- **[ x ] POST /deliverymanss**: Cadastrar um novo usuário.

### Listar Usuários
- **[ X ] GET /deliverymanss**: Listar todos os usuários.

### Visualizar Usuário por ID
- **[ x ] GET /deliverymanss/{id}**: Visualizar um usuário específico.

### Atualizar Usuário
- **[ x ] PUT /deliverymanss/{id}**: Atualizar informações de um usuário.

### Excluir Usuário
- **[ x ] DELETE /deliverymanss/{id}**: Excluir um usuário.

### Alterar Senha
- **[ x ] PATCH /deliverymanss/{id}/password**: Alterar a senha de um usuário (somente o admin pode realizar essa operação).

---

## Entregadores

### Criar Entregador
- **[ x ] POST /deliverymen**: Cadastrar um novo entregador (somente admin).

### Listar Entregadores
- **[ X ] GET /deliverymen**: Listar todos os entregadores (somente admin).

### Visualizar Entregador por ID
- **[ X ] GET /deliverymen/{id}**: Visualizar um entregador específico (somente admin).

### Atualizar Entregador
- **[ x ] PUT /deliverymen/{id}**: Atualizar dados de um entregador (somente admin).

### Excluir Entregador
- **[ x ] DELETE /deliverymen/{id}**: Excluir um entregador (somente admin).

### Listar Entregas do Entregador
- **[ x ] GET /deliverymen/{id}/deliveries**: Listar as entregas associadas a um entregador específico.

---

## Destinatários

### Criar Destinatário
- **[ x ] POST /recipients**: Cadastrar um novo destinatário (somente admin).

### Listar Destinatários
- **[ x ] GET /recipients**: Listar todos os destinatários (somente admin).

### Visualizar Destinatário por ID
- **[ x ] GET /recipients/{id}**: Visualizar um destinatário específico (somente admin).

### Atualizar Destinatário
- **[ x ] PUT /recipients/{id}**: Atualizar dados de um destinatário (somente admin).

### Excluir Destinatário
- **[ x ] DELETE /recipients/{id}**: Excluir um destinatário (somente admin).

---

## Encomendas

### Criar Encomenda
- **[ x ] POST /orders**: Cadastrar uma nova encomenda (somente admin).

### Listar Encomendas
- **[ x ] GET /orders**: Listar todas as encomendas (somente admin).

### Visualizar Encomenda por ID
- **[ x ] GET /orders/{id}**: Visualizar uma encomenda específica (somente admin).

### Atualizar Encomenda
- **[ x ] PUT /orders/{id}**: Atualizar os dados de uma encomenda (somente admin).

### Excluir Encomenda
- **[ x ] DELETE /orders/{id}**: Excluir uma encomenda (somente admin).

### Marcar Encomenda como Aguardando Retirada
- **[ x ] PATCH /orders/{id}/pending**: Marcar uma encomenda como disponível para retirada (somente admin).

### Retirar Encomenda
- **[ ] PATCH /orders/{id}/pickup**: Retirar uma encomenda (somente o entregador que foi designado para a entrega pode realizar essa ação).

### Marcar Encomenda como Entregue
- **[ ] PATCH /orders/{id}/delivered**: Marcar uma encomenda como entregue (somente o entregador que retirou a encomenda pode realizar essa ação, e é obrigatório enviar uma foto).

### Marcar Encomenda como Devolvida
- **[ x ] PATCH /orders/{id}/returned**: Marcar uma encomenda como devolvida.

### Listar Encomendas Próximas ao Entregador
- **[ ] GET /orders/nearby**: Listar encomendas com endereços próximos ao local do entregador (baseado na localização do entregador).

---

## Notificações

### Notificar Destinatário
- **[ ] POST /notifications/{orderId}**: Notificar o destinatário sobre o status da encomenda após qualquer alteração.
