FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only=production --legacy-peer-deps

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-l", "tcp://0.0.0.0:5000", "build"]