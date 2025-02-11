FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

RUN ls -l

RUN ls -l /app

RUN ls -l /app/dist

CMD ["npm", "run", "start:prod"]
