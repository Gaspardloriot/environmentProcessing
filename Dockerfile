FROM node:14.10.0-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN yarn

COPY . .

CMD [ "npm", "run", "dev" ]