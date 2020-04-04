FROM node:12-alpine

WORKDIR /workspace

COPY ./dist/apps/api/package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci --prod &> /dev/null

COPY ./dist/apps/api ./api

CMD ["node", "./api/main.js"]
