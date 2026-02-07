FROM node:24-alpine

WORKDIR /app

RUN apk --no-cache add curl

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY . .

CMD ["node", "src/server.js"]