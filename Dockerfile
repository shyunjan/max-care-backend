FROM node:16.18 

WORKDIR /home/max-care-backend 
COPY . . 

# EXPOSE 3000 
RUN npm install 
# RUN npm run setConfig real
RUN npm run build 
ENV NODE_ENV production
CMD npm start
# CMD node dist/main.js production 