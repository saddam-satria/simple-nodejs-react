FROM node:14.16-alpine 

WORKDIR /app/react-boilerplate 

COPY package*.json ./ 

RUN yarn install 

COPY . ./

CMD [ "yarn", "run", "build" ]

