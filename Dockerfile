FROM nginx
LABEL maintainer="jasonhuang@hyx.com"
LABEL version="1.0.0"
WORKDIR /app
COPY nginx.conf /etc/nginx/nginx.conf
ADD build /app
