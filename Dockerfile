FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app
COPY --from=builder /app /app

CMD ["npm", "start"]
