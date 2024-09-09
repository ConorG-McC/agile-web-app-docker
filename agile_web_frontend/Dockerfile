# Use an official Node.js runtime as the base image
FROM node:22.8.0

# Set the working directory in the container
RUN mkdir -p /app/agile_web_frontend
WORKDIR /app/agile_web_frontend

# Copy package.json and package-lock.json to the container
COPY package*.json /app/agile_web_frontend

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app/agile_web_frontend

# Expose the port your app runs on 
EXPOSE 8900

# Start the Node.js application using nodemon
CMD ["npm", "start"]
