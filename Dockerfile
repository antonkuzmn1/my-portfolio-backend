FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

RUN ls -s

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app /app

RUN ls -l /app

RUN ls -l /app/dist

CMD ["npm", "run", "start:prod"]
