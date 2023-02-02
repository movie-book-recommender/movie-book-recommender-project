FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only=production --legacy-peer-deps

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]