# Build The NODE TS Code
FROM node:16.14-alpine AS builder

WORKDIR /app/book-server

COPY package.json ./

COPY prisma ./prisma

COPY yarn.lock ./

RUN yarn install

COPY tsconfig.json ./

COPY src ./src

COPY public ./public

RUN yarn run build


# runner
FROM node:16.14-alpine

WORKDIR /app/book-server

COPY package.json ./

COPY yarn.lock ./

COPY prisma ./prisma

COPY public ./public

RUN yarn install --production

COPY --from=builder /app/book-server/build /app/book-server/build

CMD [ "yarn", "start" ]




