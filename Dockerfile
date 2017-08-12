FROM gliderlabs/alpine:3.6

WORKDIR /build
COPY . /build

RUN apk add --update \
nodejs \
nodejs-npm \
&& rm -rf /var/cache/apk/* \
&& npm install -g npm@5.3.0 pm2 \
&& npm it \
&& mkdir -p -m 0777 /app \
&& cp -R /build/dist /app \
&& cp /build/package* /app/server/ \
&& cd /app \
&& npm i --only=prod \
&& npm cache clean --force \
&& rm -rf /build

ENTRYPOINT ["pm2-docker", "/app/server/app.js"]
