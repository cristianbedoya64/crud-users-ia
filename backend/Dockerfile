# Dockerfile for backend (Node.js)
# Follows Google and OpenAI best practices

FROM node:20-slim

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port (default: 3000)
EXPOSE 3000

# Use non-root user for security (Debian syntax)
RUN addgroup --system appgroup && adduser --system --ingroup appgroup --home /home/appuser appuser && mkdir -p /home/appuser && chown -R appuser:appgroup /home/appuser
USER appuser

# npm usa HOME para escribir logs/cache; el usuario de sistema por defecto puede tener /nonexistent
ENV HOME=/home/appuser

# Set production environment
ENV NODE_ENV=production
# Start the server
CMD ["npm", "start"]
