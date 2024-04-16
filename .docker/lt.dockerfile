ARG NODEJS_IMAGE
FROM ${NODEJS_IMAGE}
RUN npm i -g localtunnel@2.0.2 && npm cache clean --force
