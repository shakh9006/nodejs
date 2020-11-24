const dotenv = require('dotenv')
const assert = require('assert')

dotenv.config()

const { HOST, PORT, HOST_URL, MYSQL_USER, MYSQL_PASSWORD,
           MYSQL_DATABASE, MYSQL_HOST } = process.env

assert(PORT, 'required')
assert(HOST, 'required')

module.exports = {
    host     : HOST,
    port     : PORT,
    host_url : HOST_URL,
    db_name  : MYSQL_DATABASE,
    mysql    : {
        host     : MYSQL_HOST,
        user     : MYSQL_USER,
        password : MYSQL_PASSWORD,
    }
}