# syntax=docker/dockerfile:1.4
# 1. For build React app
FROM node:lts AS builder

ARG BUILD_DATE
ARG VERSION

# Set working directory
WORKDIR /app
COPY . /app

RUN yarn install
RUN yarn build

# RUN echo "${BUILD_DATE} ${VERSION}" > /app/build/static/version.txt 

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
