FROM oven/bun:alpine
WORKDIR /app
EXPOSE 5173
CMD bun install && bun dev --host
