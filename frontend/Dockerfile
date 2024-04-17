FROM node:21.7-alpine AS production

ENV NODE_ENV production

WORKDIR /app

COPY ./package*.json /app

RUN yarn

COPY . .

CMD ["yarn","start"]