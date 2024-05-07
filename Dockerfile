FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install pm2 -g && \
    npm install --production && \
    npm cache clean --force
COPY . .
USER node
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl --fail http://localhost:8000/api/health || exit 1
CMD ["/bin/sh", "/app/start.sh"]