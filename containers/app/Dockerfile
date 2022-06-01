FROM node:12-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ./build .
COPY package.json ./
# RUN yarn install --production
RUN npm i --package-lock-only
RUN npm ci --only=prod
EXPOSE 3000
CMD ["yarn", "run", "serve"]