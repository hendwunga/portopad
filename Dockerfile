# Stage 1: Build Angular app
FROM node:20.19.0-alpine AS builder

WORKDIR /app

# Copy package files & install dependencies
COPY package*.json ./
RUN npm ci

# Copy all source code
COPY . .
RUN npm install

# Build production Angular app
RUN npm run build -- --configuration production

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Hapus website default nginx
RUN rm -rf /usr/share/nginx/html/*

# Salin hasil build Angular ke folder nginx
COPY --from=builder /app/dist/portopad/browser /usr/share/nginx/html


# Salin konfigurasi nginx custom untuk SPA Angular
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 82
EXPOSE 82

# Jalankan nginx di foreground
CMD ["nginx", "-g", "daemon off;"]
