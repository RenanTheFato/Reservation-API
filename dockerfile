FROM node:22.11.0-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

EXPOSE ${PORT:-3333}

CMD ["npm", "run", "dev"]