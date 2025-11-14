FROM node:23-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY app.js app.js
EXPOSE 8000
CMD ["npm", "start"]
