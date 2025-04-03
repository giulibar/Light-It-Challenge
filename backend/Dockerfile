FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
# RUN npx prisma migrate deploy

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate dev --name init && npm run dev"]

