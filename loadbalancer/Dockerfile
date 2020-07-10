# Use the standard Nginx image from Docker Hub
FROM nginx

# Copy the configuration file from the current directory and paste
# it inside the container to use it as Nginx's default config.
COPY nginx.conf /etc/nginx/nginx.conf

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log main \
	&& ln -sf /dev/stderr /var/log/nginx/error.log warn

# Port 8080 of the container will be exposed and then mapped to port
# 8080 of our host machine via Compose. This way we'll be able to
# access the server via localhost:8080 on our host.
EXPOSE 8000

# Start Nginx when the container has provisioned.
CMD ["nginx", "-g", "daemon off;"]