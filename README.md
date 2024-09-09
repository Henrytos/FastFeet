# FastFeet
# Desafio 04

Desafio referente aos módulos: DDD no Node.js e NestJS

## Introdução

Faaala Dev,

Nesse desafio você reforçará de forma prática os **conceitos** que aprendemos nesses módulos.

Como se trata de um desafio, ele necessita de alguns conhecimentos além dos abordados nesse módulo, então é importante ter autonomia para conseguir pesquisar essas coisas caso não saiba como resolver. Por isso, lembre-se, t**enha calma** e **acredite no seu processo.**

Além isso, este é um desafio prático e opcional, por tanto não há correção sobre ele.

O aprendizado daqui é muito importante e com certeza você conseguirá sair com muito conhecimento bacana 💜

## Sobre o desafio

<aside>
⚠️ Como informamos anteriormente, **não** vamos mais descrever detalhadamente rotas e propriedades dos registros a serem criadas, mas sim, as regras e requisitos que a API deve ter.

O motivo disso é para vocês **também** exercitarem ****o desenvolvimento e a estruturação dessa parte.

</aside>

Nesse desafio desenvolveremos uma API para controle de encomendas de uma transportadora fictícia, a FastFeet.

### Regras da aplicação


[ x ] A aplicação deve ter dois tipos de usuário, **entregador** e/ou **admin**

[ x ] Deve ser possível realizar login com CPF e Senha

[ x ] Deve ser possível realizar o CRUD dos **entregadores**

[ x ] Deve ser possível realizar o CRUD das **encomendas**

[ ] Deve ser possível realizar o CRUD dos **destinatários**

[ x ] Deve ser possível marcar uma **encomenda** como aguardando (Disponível para retirada)

[ x ] Deve ser possível retirar uma **encomenda**

[ x ] Deve ser possível marcar uma **encomenda** como entregue

[ x ] Deve ser possível marcar uma **encomenda** como devolvida

[ ] Deve ser possível listar as **encomendas** com endereços de entrega próximo ao local do entregador

[ x ] Deve ser possível alterar a senha de um **usuário**

[ ] Deve ser possível listar as entregas de um **usuário**

[ ] Deve ser possível notificar o **destinatário** a cada alteração no status da **encomenda**

#### entitites 
delivery man :entregador
manageror administrator: admin
order: encomenda
recipient: destinatário
attachment or photo

### value object 
cpf 
address


### Regras de negócio


[ x ] Somente usuário do tipo **admin** pode realizar operações de CRUD nas **encomendas**

[ x ] Somente usuário do tipo **admin** pode realizar operações de CRUD dos **entregadores**

[ ] Somente usuário do tipo **admin** pode realizar operações de CRUD dos **destinatários**

[ ] Para marcar uma **encomenda** como entregue é obrigatório o envio de uma foto

[ x ] Somente o **entregador** que retirou a encomenda pode marcar ela como entregue

[ x ] Somente o **admin** pode alterar a senha de um **usuário**

[ ] Não deve ser possível um  **entregador** listar as encomendas de outro entregador

### Conceitos que pode praticar

- DDD, Domain Events, Clean Architecture
- Autenticação e Autorização (RBAC)
- Testes unitários e e2e
- Integração com serviços externos

### Contexto da aplicação

É comum ao estar desenvolvendo uma API, imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile.

Por isso, deixamos abaixo o link para o layout da aplicação que utilizaria essa API.

[FastFeet](https://www.figma.com/file/hn0qGhnSHDVst7oaY3PF72/FastFeet?type=design&node-id=0:1&mode=design&t=eLVBsXQU7wYugimZ-1)

## Entrega

Após concluir o desafio, você deve enviar a URL do seu código no GitHub para a plataforma.

Além disso, que tal fazer um post no LinkedIn compartilhando o seu aprendizado e contando como foi a experiência?

É uma excelente forma de demonstrar seus conhecimentos e atrair novas oportunidades!

Feito com 💜 por Rocketseat 👋
