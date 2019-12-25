FROM node:10.13 AS builder
COPY ./ ./signupapp
WORKDIR /signupapp
RUN npm i
RUN $(npm bin)/ng build --prod
EXPOSE 3000

FROM nginx:1.15.8-alpine
COPY --from=builder /signupapp/dist/shopping-cart/ /usr/share/nginx/html
EXPOSE 3000