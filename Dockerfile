FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production
RUN npm install -g @nestjs/cli

COPY . /app/

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
