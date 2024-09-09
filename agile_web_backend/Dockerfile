FROM node:22.8.0

# Set the working directory in the container
RUN mkdir -p /app/agile_web_backend
WORKDIR /app/agile_web_backend

# Copy package.json and package-lock.json to the container
COPY package*.json /app/agile_web_backend

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app/agile_web_backend

# Expose the port your app runs on 
EXPOSE 3000

# Start the Node.js application using nodemon from package.json
CMD ["npm", "start"]
