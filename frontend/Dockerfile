# Dockerfile para frontend UARP-AI
FROM node:20-alpine
WORKDIR /app
COPY package.json .
COPY .env.production .env.production
COPY vite.config.js .
COPY tailwind.config.js .
COPY postcss.config.js .
COPY ./src ./src
COPY ./public ./public
COPY index.html ./
RUN npm install
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
