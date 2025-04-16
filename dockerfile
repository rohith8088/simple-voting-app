# Use an official Nginx image as a base
FROM nginx:alpine

# Copy the index.html to the default Nginx HTML directory
COPY index.html /usr/share/nginx/html/index.html

# Expose port 80 for the web server
EXPOSE 80
