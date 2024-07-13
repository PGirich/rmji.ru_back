# build stage
FROM node:lts-alpine as build
WORKDIR /app
RUN npm install -g @angular/cli@18
COPY package*.json ./
RUN npm ci
COPY . .
RUN ng build --configuration production






# build stage
FROM node:lts-alpine as build
WORKDIR /app
RUN npm install -g @angular/cli@18
COPY package*.json ./
RUN npm ci
COPY . .
RUN ng build --configuration production

# production stage
FROM nginx:alpine as production
COPY --from=build /app/dist/rmji.ru/browser /etc/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80 443
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]


