const dotenv = require('dotenv')
const assert = require('assert')

dotenv.config()

const { HOST, PORT, HOST_URL, MYSQL_USER, MYSQL_PASSWORD,
              MYSQL_DATABASE, MYSQL_HOST } = process.env

assert(PORT, 'required')
assert(HOST, 'required')

module.exports = {
    url    : HOST_URL,
    port   : PORT,
    host   : HOST,
    dbname : MYSQL_DATABASE,
    mysql  : {
        host     : MYSQL_HOST,
        user     : MYSQL_USER,
        password : MYSQL_PASSWORD,
    }
}