                                       # USE DEVELOP Branch for Full Feature #
# express-starter-kit
Express Starter kit is express js framework and boilerplat, which contains the different features, those are helps the developer to start web api development easily. Developer can easily code, test, documented the api during the development process. It also have good architecture, which helps the developer to maintain the code.

## Installation

Installation process is easy, you can only download or clone application from git

1. clone from git `git clone https://github.com/tariqulislam/express-starter-kit.git`
2. run the command `npm install`
3. configure the database from `config/database.js` file
4. Provide the Application security

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


```javascript
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Product = require('../models/(product model name).js');
```

![alt text](https://github.com/tariqulislam/express-starter-kit/blob/develop/public/images/swagger.png)

## Credits



## License
