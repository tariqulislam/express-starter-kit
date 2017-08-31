#Using Node js latest version

FROM node:boron

# Create the directory at the docker image where the app will placed
RUN mkdir -p /usr/src/app

# Work Directory
WORKDIR /usr/src/app

#Copy the dependency
COPY package.json /usr/src/app

#Install dependency
RUN npm install

COPY . /usr/src/app

#Run the application in specific port
EXPOSE 3000

#Serve the app
CMD ["npm", "start"]
