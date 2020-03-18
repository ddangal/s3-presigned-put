FROM node
WORKDIR /app/testfe
COPY package.json /app/testfe

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]