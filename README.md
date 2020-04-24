# Micro-serviço cotação


## Instruções para executar:
1. executar `npm install`
2. executar `cp env-sample .env`
3. executar `npm start`
4. Você deverá ver a mensagem `Micro-serviço cotação executando em http://0.0.0.0:3030`

## Executar via docker:
1. executar `cp env-sample .env`
2. executar `docker build . -t cotacao`
3. executar `docker run -p 3030:3030 -it cotacao`

## Executar via docker-compose:
1. executar `cp env-sample .env`
2. executar `docker-compose up --build`

## Desenvolvimento
1. npm install
2. cp env-sample .env
3. npm run dev
4. Você deverá ver a mensagem `Micro-serviço cotação executando em http://0.0.0.0:3030`
