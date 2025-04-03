FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps && echo "npm install success" || echo "npm install failed"


COPY . .

EXPOSE 3001
CMD ["npm", "start"]
