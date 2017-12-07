
# express-starter-kit
Express Starter kit is express js framework and boilerplat, which contains the different features, those are helps the developer to start web api development easily. Developer can easily code, test, documented the api during the development process. It also have good architecture, which helps the developer to maintain the code.

## Installation

Installation process is easy, you can only download or clone application from git

1. clone from git `git clone https://github.com/tariqulislam/express-starter-kit.git`
2. then go to express-starter-kit by `cd express-starter-kit`
3. Install Yarn package `npm install -g yarn`
4. run command `yarn`
5. run the command `yarn nodemon`

## developer must have knowledge about

1. Node.js
2. express.js
3. Mocha & chai
4. Mongoose
5. Swagger
6. Swagger UI
7. JWT(JSON web token)
8. Nodemon
9. ES6 and ES5
10. Express Router
11. Dotenv
12. Bcrypt
13. busboy
14. pm2

## Usage and instructions
I have use Dotenv for setup the environment variable for primary configuration of different plugins of the project:

1. For database configuration, I have provide the info at .env file to use mongoose(driver for mongodb for node) for this project.

```javascript
DB_NAME = ryder
DB_HOST = localhost
DB_PORT = 27017
DB_USER = rony
DB_PASS = rony123
```
**Database configuration:**

      DB_NAME = (mongodb database name)
      DB_HOST = (mongodb hosting server, e.g: localhost or server location)
      DB_PORT = (mongodb database port)
      DB_USER = (mongodb username)
      DB_PASS = (mongodb user password)


2. Hot reload the development environment with Nodemon plugins.


    No need to restart node project every time when it is at development stage.

    The project has Nodemon server to auto lookup the changes at working directory of project.

![alt text](https://github.com/tariqulislam/express-starter-kit/blob/feature/user-guide/public/images/nodemoon.png)

3. Adding model structure specification in models folder:
```swagger
/**
* @swagger
* definition:
*   (entity/DB Table name):
*     properties:
*       (Column Name/attibute name):
*           type: (Swagger data type)
*/
```
  For product model (e,g) Models/Product.js
  ```javascript
  /**
  * @swagger
  * definition:
  *   Product:
  *     properties:
  *       prod_name:
  *           type: string
  *       prod_desc:
  *           type: string
  *       prod_price:
  *           type: number
  */
  var ProductSchema = new mongoose.Schema({
    prod_name: String,
    prod_desc: String,
    prod_price:Number,
    update_at:{ type: Date, default:Date.now},
  });
  ```

3. Adding routes structure specification in routes folder:

  For product routes (e,g) routes/products.js
    Require of these information:
```javascript
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Product = require('../models/(product model name).js');
```

For product routes (e,g) routes/products.js
```javascript
/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     description: Creates a new Product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: product
 *         description: Product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', (req,res,next) =>{
  Product.saveProduct(req.body, (results) =>{
    res.json(results);
  });
});
```
  Swagger UI activity
  ![alt text](https://github.com/tariqulislam/express-starter-kit/blob/develop/public/images/swagger.png)

  We are using Es Lint for monitoring and standarized the coding format
```javascript
npm run lint
```
  You can use docker for build the microservice and containarized the starter kit. just need build command to create docker container,
  and docker must be installed at host machine.

  what is docker?

  Docker is the world’s leading software container platform. Developers use Docker to eliminate “works on my machine” problems when collaborating on code with co-workers. Operators use Docker to run and manage apps side-by-side in isolated containers to get better compute density. Enterprises use Docker to build agile software delivery pipelines to ship new features faster, more securely and with confidence for both Linux, Windows Server, and Linux-on-mainframe apps.[ref](https://www.docker.com/what-docker)

  what is container of docker?

  Containers are a way to package software in a format that can run isolated on a shared operating system. Unlike VMs, containers do not bundle a full operating system - only libraries and settings required to make the software work are needed. This makes for efficient, lightweight, self-contained systems and guarantees that software will always run the same, regardless of where it’s deployed.[ref](https://www.docker.com/what-docker)

  to create the docker image or container run this command
  ```
  docker build -t <appname> <path of you application>
  e.g ( docker build -t express_stater_server . )
  ```
  If you want to use the mongodb and docker container together, no need to configure the docker or docker-composer

  what is docker-compose?

  Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. You just provide command

  ```
    docker-compose up

  ```

  For backgorund process

  ```
    docker-compose up -d

  ```

**PM2 Deployment to server**

Starter kit has configured PM2 integration. Now Developer can easily deploy the application to  your hosting server easily. PM2 is a advance process manager for node js application. 

**For PM2 Installation**
Starter kit provide you command which will help developer to install the pm2 and deploy the site to hosting server

  For Install the pm2 to hosting server (`yarn` or `npm` command)
  ```
     yarn pm2:install
     npm run pm2:install
  ```
  For Production and developer deployment
  ```
    yarn pm2:prod
    yarn pm2:dev
    
    npm run pm2:prod
    npm run pm2:dev
  ```
  
  For monitor the process 
  ```
    yarn pm2:monitor
    npm run pm2:monitor
  ```
  
  For reload and stop and kill the pm2 process
  ```
    yarn pm2:reload
    yarn pm2:stop
    yarn pm2:kill
    
    npm run pm2:reload
    npm run pm2:stop
    npm run pm2:kill
  ```

## Credits



## License
