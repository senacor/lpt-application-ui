# build stage
FROM node:lts-alpine as build-stage
LABEL stage=builder
WORKDIR /app
COPY package*.json ./
# install all dependencies, including dev dependencies required for build
RUN npm install && npm cache clean --force
COPY ./ ./
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]