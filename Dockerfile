FROM alpine

RUN apk add --update --no-cache nodejs tini
WORKDIR /app
COPY . /app

ENV ROOT_URL=http://hugo2.scem.uw.edu.au
ENV EXPRESS_PORT=3000
#ENV MAIL_URL=smtps://godspaw%40gmail.com:Bailen@smtp.gmail.com

RUN npm --unsafe-perm --production install && npm cache clear
RUN ./node_modules/.bin/tsc -p app/server

EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]
