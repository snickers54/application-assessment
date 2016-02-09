FROM node:0.10

RUN mkdir -p /var/www/app
WORKDIR /var/www/app

RUN     groupadd -r node \
&&      useradd -r -m -g node node

COPY . /var/www/app/
RUN rm -rf /var/www/app/node_modules
RUN chown -R node:node /var/www/app

USER node
RUN npm -g install uglify-js
CMD [ "node", "/var/www/app/api/index.js" ]
EXPOSE 4242
