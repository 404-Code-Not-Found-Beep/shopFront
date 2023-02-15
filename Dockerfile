FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# FROM node:latest as node1
# WORKDIR /server
# COPY . .
# RUN npm install
# EXPOSE 5200
# CMD ["npx", "ts-node", "src/server.ts"] 

FROM nginx:alpine
COPY --from=node /app/dist/shop-front /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=node1 /dist /usr/share/server
 