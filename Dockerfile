
# Stage 1 - Build Node dependencies
FROM node:18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .

# Stage 2 - Runtime with Nginx + Node in the same container
FROM nginx:alpine
# Copy app
COPY --from=builder /usr/src/app /app
# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf
# Expose HTTP
EXPOSE 80
WORKDIR /app
# Start node app in background and keep nginx in foreground
CMD sh -c "node app.js & nginx -g 'daemon off;'"
