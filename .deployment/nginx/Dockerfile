FROM nginx:1.15.3

COPY .deployment/nginx/nginx.conf /etc/nginx/nginx.conf
COPY .deployment/nginx/conf /etc/nginx/general
COPY .deployment/nginx/sites-available /etc/nginx/sites-available

RUN ln -s /etc/nginx/sites-available /etc/nginx/sites-enabled

COPY .ssl/dhparam.pem \
     .deployment/nginx/.htpasswd \
     /etc/nginx/

EXPOSE 80
EXPOSE 443
