FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --production --legacy-peer-deps && \
    npm cache clean --force

COPY . .

ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider

EXPOSE ${PORT:-8080}

CMD ["npm", "run", "start:prod"] 