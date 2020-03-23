FROM nginx:1.15.3

COPY .deployment/nginx/nginx.conf /etc/nginx/nginx.conf
COPY .deployment/nginx/config /etc/nginx/config
COPY .deployment/nginx/sites-available /etc/nginx/sites-available

# Symlink sites-available to sites-enabled
RUN ln -s /etc/nginx/sites-available /etc/nginx/sites-enabled

COPY .ssl/treasure-hunt.app.crt /etc/nginx/ssl/treasure-hunt.app.crt
COPY .ssl/treasure-hunt.app.key /etc/nginx/ssl/treasure-hunt.app.key

# Add password protection
# COPY .deployment/nginx/.htpasswd /etc/nginx/.htpasswd

EXPOSE 80
EXPOSE 443
