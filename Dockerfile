#Disclaimer: this is some random code from internet
# Use an official Node.js runtime as the base image
FROM node:19

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Copy the rest of your Nuxt app to the working directory
COPY . .

# Install SQLite
RUN apt-get update && apt-get install -y sqlite3

RUN sqlite3 ./server/db/records.db < ./server/db/schema.sql

# Build the Nuxt app
RUN yarn run build

# Expose port 3000
EXPOSE 3000

# Start the Nuxt app
CMD ["yarn", "start"]
