# Dockerfile for backend (Node.js)
# Follows Google and OpenAI best practices

FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port (default: 3000)
EXPOSE 3000

# Use non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Start the server
CMD ["npm", "start"]
