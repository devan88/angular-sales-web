# Use official node image as the base image
FROM node:18-alpine as build

ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/local/app && cp -a /tmp/node_modules /usr/local/app/

WORKDIR /usr/local/app
# Add the source code from the app to the container
COPY ./ /usr/local/app/
# Generate the build of the application
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/app
COPY --from=build /usr/local/app/dist/angular-sales-web ./
CMD node ./server/server.mjs
EXPOSE 4000