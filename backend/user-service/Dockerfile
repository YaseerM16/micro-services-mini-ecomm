
FROM node:alpine


WORKDIR /app

COPY . .

COPY .env .env

RUN npm install


EXPOSE 3000


CMD ["npm", "start"]