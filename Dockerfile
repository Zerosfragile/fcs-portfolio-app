# Base image
FROM node:16.15.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files to the working directory
COPY package.json pnpm-lock.yaml ./

# Install project dependencies
RUN npm install -g pnpm && pnpm install

# Copy the entire project to the working directory
COPY . .

# Build the Next.js application
RUN pnpm run build

# Expose the Next.js default port (3000)
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]
