FROM node:12

# Create app directory
RUN mkdir -p /backend
WORKDIR /backend

# Installing dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copying source files
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]