FROM node:lts-jessie

WORKDIR /home/node/app
COPY /app/package*.json /home/node/app/
COPY /app/tsconfig.json /home/node/app/
RUN npm install
CMD npm run dev
EXPOSE 9000
