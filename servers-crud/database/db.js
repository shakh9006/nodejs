const mysql  = require('mysql')
const config = require('../config')

const connection = mysql.createConnection(config.mysql)
connection.connect(err => {
    if (err) throw err

    connection.query(`CREATE DATABASE IF NOT EXISTS ${config.db_name};`, (query_err) => {
        if (query_err) throw query_err
        console.log(`Database ${config.db_name} created successfully!`)
    })

    connection.query(`USE ${config.db_name}`)

    const tables = {}
    tables['servers'] = '  CREATE TABLE IF NOT EXISTS `servers` (\n' +
        '  `server_id` BIGINT UNSIGNED AUTO_INCREMENT,\n' +
        '  `server_name` VARCHAR(255) NOT NULL,\n' +
        '  `ip_address` VARCHAR(255) NOT NULL,\n' +
        '  `created_at` DATETIME NOT NULL,\n' +
        '  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n' +
        '  PRIMARY KEY (`server_id`))\n' +
        'ENGINE = InnoDB;'



    tables['websites'] =  '  CREATE TABLE IF NOT EXISTS `websites` (\n' +
        '  `website_id` BIGINT UNSIGNED AUTO_INCREMENT,\n' +
        '  `website_url` TEXT NOT NULL,\n' +
        '  `website_name` VARCHAR(255) DEFAULT NULL,\n' +
        '  `created_at` DATETIME NOT NULL,\n' +
        '  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n' +
        '  PRIMARY KEY (`website_id`))\n' +
        'ENGINE = InnoDB;'

    tables['ftps'] = '  CREATE TABLE IF NOT EXISTS `ftps` (\n' +
            '  `ftp_id` BIGINT UNSIGNED AUTO_INCREMENT,\n' +
            '  `host` VARCHAR(255) NOT NULL,\n' +
            '  `login` VARCHAR(255) NOT NULL,\n' +
            '  `password` VARCHAR(255) NOT NULL,\n' +
            '  `port` VARCHAR(10) DEFAULT "21",\n' +
            '  `server_id` BIGINT UNSIGNED NOT NULL,\n' +
            '  `website_id` BIGINT UNSIGNED DEFAULT NULL,\n' +
            '  `created_at` DATETIME NOT NULL,\n' +
            '  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n' +
            '  PRIMARY KEY (`ftp_id`),\n' +
            '  CONSTRAINT Ftp_Servers_group FOREIGN KEY (`server_id`) REFERENCES servers(`server_id`),\n' +
            '  CONSTRAINT Ftp_Websites_group FOREIGN KEY (`website_id`) REFERENCES websites(`website_id`))\n' +
            'ENGINE = InnoDB;'

    tables['admin_accesses'] = '  CREATE TABLE IF NOT EXISTS `admin_accesses` (\n' +
        '  `admin_access_id` BIGINT UNSIGNED AUTO_INCREMENT,\n' +
        '  `login` VARCHAR(255) NOT NULL,\n' +
        '  `password` VARCHAR(255) DEFAULT NULL,\n' +
        '  `website_id` BIGINT UNSIGNED NOT NULL,\n' +
        '  `created_at` DATETIME NOT NULL,\n' +
        '  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n' +
        '  PRIMARY KEY (`admin_access_id`),\n' +
        '  CONSTRAINT AdminAccess_Websites_group FOREIGN KEY (`website_id`) REFERENCES websites(`website_id`))\n' +
        'ENGINE = InnoDB;'

    tables['ssh_accesses'] = '  CREATE TABLE IF NOT EXISTS `ssh_accesses` (\n' +
        '  `ssh_access_id` BIGINT UNSIGNED AUTO_INCREMENT,\n' +
        '  `login` VARCHAR(255) NOT NULL,\n' +
        '  `password` VARCHAR(255) NOT NULL,\n' +
        '  `port` VARCHAR(10) DEFAULT "21",\n' +
        '  `server_id` BIGINT UNSIGNED NOT NULL,\n' +
        '  `created_at` DATETIME NOT NULL,\n' +
        '  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n' +
        '  PRIMARY KEY (`ssh_access_id`),\n' +
        '  CONSTRAINT Ssh_Servers_group FOREIGN KEY (`server_id`) REFERENCES servers(`server_id`))\n' +
        'ENGINE = InnoDB;'

    Object.keys(tables).forEach(table => {
        connection.query(tables[table], err => {
            if (err) throw err

            console.log(`Table ${table} created!`)
        })
    })
} )

module.exports = connection