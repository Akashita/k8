FROM node:12.9.0-alpine

RUN mkdir /app
WORKDIR /app

COPY ["./package.json", "yarn.lock", "./"]
RUN yarn install

COPY src ./src
COPY public ./public

EXPOSE 80

CMD ["node", "src"]