FROM node:12-alpine

WORKDIR /workspace

COPY ./dist/apps/api/package.json ./package.json

RUN npm install --prod

COPY ./dist/apps/api ./api

CMD ["node", "./api/main.js"]
