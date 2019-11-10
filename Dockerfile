FROM node

ARG PORT
ARG SLACK_VALIDATOR_URL

ENV PORT=${PORT}
ENV SLACK_VALIDATOR_URL=${SLACK_VALIDATOR_URL}

WORKDIR /
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}
CMD ["npm", "start"]