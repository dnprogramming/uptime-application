FROM node:21.6.2-bookworm-slim AS production

ENV NODE_ENV production

WORKDIR /app

COPY ./package*.json /app

RUN yarn

COPY . .

CMD ["yarn","start"]