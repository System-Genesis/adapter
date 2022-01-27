FROM node:16.13.2-alpine3.15 as BUILD
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent --progress=false
COPY . .
RUN npm run build

FROM node:16.13.2-alpine3.15 as PROD
WORKDIR /usr/src/app
COPY --from=BUILD /usr/src/app/package*.json ./ 
RUN npm install --silent --progress=false --production
COPY --from=BUILD /usr/src/app/dist/ ./dist/
COPY --from=BUILD /usr/src/app/publickey.pem ./publickey.pem

EXPOSE 80
CMD ["npm", "start"]