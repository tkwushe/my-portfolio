FROM node:18-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the port your app runs on
EXPOSE 5001

# Start the application
CMD ["node", "server.js"] 