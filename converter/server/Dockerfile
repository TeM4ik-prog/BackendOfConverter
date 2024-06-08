FROM rust:alpine as builder

# https://stackoverflow.com/a/30873179
RUN apk add --no-cache musl-dev
RUN cargo install gifski


# RUN apt-get update && \
#     apt-get install -y gifski

FROM node:16-alpine

COPY --from=builder /usr/local/cargo/bin/gifski /usr/local/bin/gifski


# https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#running-on-alpine
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev 




RUN apk add --no-cache \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      git \
      libwebp-tools



# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# install dependencies
COPY package.json package-lock.json ./
RUN npm install

# RUN npm rebuild sqlite3

# build the app
# ADD tests tests
# ADD cli.js .
# ADD index.js .
# ADD render.js .
# ADD utils.js .

# ENV USE_SANDBOX false
# ENV CHROMIUM_PATH /usr/bin/chromium-browser


ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
      USE_SANDBOX=false \
      CHROMIUM_PATH=/usr/bin/chromium-browser



CMD ["node", "server.js"]
# CMD node server.js 
# /source
