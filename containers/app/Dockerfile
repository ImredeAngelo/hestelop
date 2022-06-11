FROM node:17.9.1-alpine3.15
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
WORKDIR /usr/src/app
COPY ./build .
# COPY package*.json ./
# RUN yarn install --production
# RUN npm i --package-lock-only
# RUN npm ci --only=prod
CMD ["node", "server.js"]
