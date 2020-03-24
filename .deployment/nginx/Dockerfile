FROM nginx:1.15.3

COPY .deployment/nginx/nginx.conf /etc/nginx/nginx.conf
COPY .deployment/nginx/config /etc/nginx/config
COPY .deployment/nginx/sites-available /etc/nginx/sites-available

RUN ln -s /etc/nginx/sites-available /etc/nginx/sites-enabled

COPY .ssl/treasure-hunt.app-key.pem  /etc/nginx/ssl/treasure-hunt.app-key.pem
COPY .ssl/treasure-hunt.app.pem   /etc/nginx/ssl/treasure-hunt.app.pem
COPY .ssl/dhparam.pem /etc/nginx/dhparam.pem

EXPOSE 80
EXPOSE 443
