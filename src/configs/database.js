/*const mysql = require('mysql');
const { database } = require('./keys');
const { promisify }= require('util');


const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTION');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});

//Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;*/

/*const { Pool } = require("pg");
// Coloca aquí tus credenciales
const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "database_links",
  password: "123",
  port: 5432,
});
module.exports = pool;*/

const { Pool } = require("pg");
// Coloca aquí tus credenciales
const pool = new Pool({
  user: "ulbanazhnkpjmh",
  uri: "postgres://ulbanazhnkpjmh:280070444eda080e32a90aa291fa174aed5bbf756d71002d4bdc8e5c9647ef02@ec2-174-129-18-210.compute-1.amazonaws.com:5432/dcnhvqeu96cd9e",
  host: "ec2-174-129-18-210.compute-1.amazonaws.com",
  database: "database_links",
  password: "280070444eda080e32a90aa291fa174aed5bbf756d71002d4bdc8e5c9647ef02",
  port: 5432,
});
module.exports = pool;


