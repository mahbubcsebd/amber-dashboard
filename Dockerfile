# Use the official Nginx image as a parent image
FROM nginx:alpine

# Copy the HTML files from app directory to the Nginx server
COPY app/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80