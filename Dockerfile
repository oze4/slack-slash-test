FROM node

ARG PORT
ENV PORT=${PORT}

WORKDIR /
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}
CMD ["npm", "start"]