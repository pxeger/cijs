FROM oven/bun:alpine
WORKDIR /app
EXPOSE 3000
CMD bun install && bun dev
