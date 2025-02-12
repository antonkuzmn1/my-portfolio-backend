FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app
COPY --from=builder /app /app

CMD ["npm", "start"]
