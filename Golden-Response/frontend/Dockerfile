FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_BACKEND_URL=http://localhost:3000
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

FROM node:18-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist

RUN npm install -g serve

USER appuser

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
