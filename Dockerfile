FROM node:20.19.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm install

RUN npm run build -- --configuration production

# Stage 2: Serve with NGINX
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/portopad/browser /usr/share/nginx/html


COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 82

CMD ["nginx", "-g", "daemon off;"]
