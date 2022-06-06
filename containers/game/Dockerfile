FROM node:12-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ./src .
COPY package.json ./
RUN yarn install --development
# RUN npm i --package-lock-only
# RUN npm ci --only=prod
EXPOSE 4000
CMD ["yarn", "start"]