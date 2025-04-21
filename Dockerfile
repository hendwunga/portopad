FROM node:20.19.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

FROM nginx:stable-alpine
ARG APP_NAME=portopad
COPY --from=builder /app/dist/$APP_NAME/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN adduser -D appuser && chown -R appuser:appuser /usr/share/nginx/html
USER appuser

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
