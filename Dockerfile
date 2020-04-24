FROM node:12-alpine
COPY package.json /package.json
RUN npm i --silent --prod
COPY .env /.env
COPY app.js /app.js
COPY bin/ /bin
COPY server/ /server
EXPOSE 3030
CMD ["npm","start"]