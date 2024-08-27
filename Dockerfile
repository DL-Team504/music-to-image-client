# Use an official node image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application for production
RUN npm run build

# Expose the port that Vite will serve on
EXPOSE 3000

# Start the Vite server
CMD ["npm", "run", "preview"]
