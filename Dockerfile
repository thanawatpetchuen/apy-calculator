# Use the official Node.js 18 image as the base image
FROM node:18-bullseye-slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the source code to the working directory
COPY . .

# Build the NestJS application
RUN yarn build

# Use Google Node.js 18 image for the production image
FROM node:18-bullseye-slim

# Set the working directory inside the container
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/yarn.lock /app/yarn.lock

# Expose the port on which the application will listen
EXPOSE 3000

# Start the NestJS application
CMD ["node", "dist/main.js"]
