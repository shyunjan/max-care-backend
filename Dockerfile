FROM node:16.18-alpine

WORKDIR /home/max_care.backend 
COPY . . 

# EXPOSE 3000 
RUN npm install 
# RUN npm run setConfig real
RUN npm run build 
# ENV NODE_ENV production
# CMD node dist/main.js production 
ENTRYPOINT npm start