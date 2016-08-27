FROM alpine

RUN apk add --update --no-cache nodejs tini
WORKDIR /app
COPY . /app

RUN npm --unsafe-perm --production install && npm cache clear
RUN npm build

EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]
