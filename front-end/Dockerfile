# 1. Use the official Node image
FROM node:20

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package.json and lock file
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the source code
COPY . .

# 6. Expose port Vite uses
EXPOSE 5173

# 7. Run Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
