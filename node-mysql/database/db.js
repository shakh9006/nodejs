const config = require('../config')
const mysql  = require('mysql')

const connection = mysql.createConnection(config.mysql)
connection.connect(err => {
    if (err) throw err
    connection.query(`CREATE DATABASE IF NOT EXISTS ${config.dbname};`, err => {
        if (err) throw err
        console.log('Database created')
    })

    const createStudents = '  CREATE TABLE IF NOT EXISTS `students_db`.`students` (\n' +
        '  `id` BIGINT UNSIGNED AUTO_INCREMENT,\n' +
        '  `first_name` VARCHAR(255) NOT NULL,\n' +
        '  `last_name` VARCHAR(255) NOT NULL,\n' +
        '  `email` VARCHAR(255) NOT NULL,\n' +
        '  `phone` VARCHAR(50) NOT NULL,\n' +
        '  `status` TINYINT UNSIGNED DEFAULT 0,\n' +
        '  `created_at` DATETIME NOT NULL,\n' +
        '  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n' +
        '  PRIMARY KEY (`id`))\n' +
        'ENGINE = InnoDB;'

    connection.query(createStudents, err => {
        if ( err ) throw err
        console.log('Created students table')
    })
})

connection.on('error', (err) => {
    console.log("[mysql error]: ", err);
});

module.exports = connection