const mysql = require('mysql');

const { config } = require('../config/index');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port
};

const DB_NAME = config.mdbName;

class MysqlLib {

    constructor() {
      this.dbName = DB_NAME;
      this.connection;
      this.connect();
    }
    connect() {
        this.connection = mysql.createConnection(dbConfig);
        this.connection.connect(err => {
            if(err){
                console.error('[db error]', err);
            setTimeout(this.connect, 2000);
            }else{
                console.log('DB Connected');
            }
            
        });
        this.connection.on('error', err => {
            console.error('[db error]', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST'){
                this.connect();
            }else{
                throw err;
            }
        });
    }
   list(table){
        return new Promise((resolve, reject) =>{
            this.connection.query(`SELECT * FROM ${table}`,(error, data) => {
                if(error) return reject(error);
                resolve(data);
            })
        })
    }
    get(table, id){
        return new Promise((resolve, reject) =>{
            this.connection.query(`SELECT * FROM ${table} WHERE id='${id}'`,(error, data) => {
                if(error) return reject(error);
                resolve(data);
            })
        })
    }
    
    create(table, data){
        return new Promise((resolve, reject) =>{
            this.connection.query(`INSERT INTO ${table} SET ?`, data ,(error, result) => {
                if(error) return reject(error);
                resolve(result);
            });
        });
    }
    update(table, data){
        return new Promise((resolve, reject) =>{
            this.connection.query(`UPDATE ${table} SET ? WHERE id=?`,[data, data.id] , (error, result) => {
                if(error) return reject(error);
                resolve(result);
            });
        });
    }

    delete(table, id){
        return new Promise((resolve, reject) =>{
            this.connection.query(`DELETE FROM ${table} WHERE id='${id}'`, (error, result) => {
                if(error) return reject(error);
                resolve(result);
            });
        });
    }


    getQuery(table, query, join) {
        let joinQuery = '';
        if (join) {
            const key = Object.keys(join)[0];
            const val = join[key];
            joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
        }    
        return new Promise((resolve, reject) =>{
            this.connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (error, result) => {
            if(error) return reject(error);
            result = JSON.stringify(result[0])
            result = JSON.parse(result)
            resolve(result || null);
            });
        });
        
    }
}

module.exports = MysqlLib;

