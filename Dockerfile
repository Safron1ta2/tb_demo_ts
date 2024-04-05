FROM mcr.microsoft.com/playwright:focal

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY project .

CMD ["npm", "test"]
