FROM node:16.18-alpine3.15
WORKDIR /home/app
COPY . .

RUN npm install
# RUN npm run setConfig real
RUN npm run build
# ENV NODE_ENV production
CMD npm start