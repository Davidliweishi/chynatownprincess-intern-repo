# Stage 1 - Builder
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# These must come BEFORE npm install
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2 - Production
FROM node:20-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev --ignore-scripts

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]

# Builder stage - installs all dependencies and compiles TypeScript into /dist
# Production stage - starts completely fresh, installs only production dependencies, then uses "COPY --from=builder" to pull in just the compiled /dist folder
# COPY --from=builder /usr/src/app/dist ./dist = all files only exist in the building stage and is disgarded after build finishes. 