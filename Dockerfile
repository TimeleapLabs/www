FROM mhart/alpine-node:18

RUN apk add --no-cache git python3 py3-pip g++ make

WORKDIR /app
COPY build ./build
COPY package.json package-lock.json ./
RUN npm ci

EXPOSE 3000
CMD ["node", "./build"]