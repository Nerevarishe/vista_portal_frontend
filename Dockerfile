FROM node:alpine as build

WORKDIR /srv

RUN apk update \
&& apk install git \
&& git clone https://github.com/Nerevarishe/vista-portal-frontend.git \
&& apk del git

WORKDIR /srv/vista-portal-frontend

RUN npm install && npm build


FROM nginx:alpine

COPY --from=build /srv/vista-portal-frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
