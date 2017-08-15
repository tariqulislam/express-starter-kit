require('dotenv').config();
let dbConn =  'mongodb://'+ process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST +":" + process.env.DB_PORT + "/" + process.env.DB_NAME;
module.exports = {
  'secret': 'expressapitest',
  'dbConnection': dbConn
}
