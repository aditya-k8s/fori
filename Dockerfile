# Base image
FROM node:12-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json /app/

# Install project dependencies
RUN npm ci --silent

# Copy the project files to the working directory
COPY . /app/

# Build the React app
RUN npm run build

# Expose the port your React app runs on
EXPOSE 3000

# Set the environment variable
ENV NODE_ENV production

# Run the React app
CMD ["npx", "serve", "-s", "build"]

