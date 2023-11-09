#Disclaimer: this is some random code from internet
# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your Nuxt app to the working directory
COPY . .

# Build the Nuxt app
RUN npm run build

RUN npx prisma generate

# Expose port 3000
EXPOSE 3000


# Start the Nuxt app
CMD ["npm", "start"]
