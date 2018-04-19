FROM alpine
LABEL maintainer="andrerpena@gmail.com"
RUN apk add --update nodejs nodejs-npm
COPY . /src
WORKDIR /src
RUN npm i
EXPOSE 4000
ENTRYPOINT ["npm", "run", "start"]
