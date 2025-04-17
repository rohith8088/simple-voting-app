# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy app files
COPY package*.json ./
RUN npm install

COPY . .

# The server.js serves index.html from /public by default, so make sure it’s in the right place
RUN mkdir -p public && mv index.html public/

# Expose port your server listens on
EXPOSE 3000

# Start your app
CMD ["npm", "start"]
