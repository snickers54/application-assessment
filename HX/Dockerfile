FROM node:0.10

RUN mkdir -p /var/www/app
WORKDIR /var/www/app

RUN     groupadd -r node \
&&      useradd -r -m -g node node

COPY . /var/www/app/
RUN rm -rf /var/www/app/node_modules
RUN chown -R node:node /var/www/app

USER node
RUN npm install
ENV PORT 4242
ENV DB_PORT_27017_TCP_ADDR db
CMD [ "node", "/var/www/app/api/index.js" ]
EXPOSE 4242
