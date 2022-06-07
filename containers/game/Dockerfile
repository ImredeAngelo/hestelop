FROM node:17.9.1-alpine3.15
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ./src .
COPY package.json ../
RUN yarn install --development
# RUN npm i --package-lock-only
# RUN npm ci --only=prod
# EXPOSE 4000
CMD ["yarn", "start"]