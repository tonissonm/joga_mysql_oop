const { query } = require('express');
const conn = require('../utils/db');

class BaseSQLModel{
    constructor(tableName){
        this.tableName = tableName;
    }
    executeQuery(query,params){
        return new Promise((resolve,reject) =>{
            conn.query(query,params,(error,results) =>{
                if (error){
                    reject(error);
                }
                else{
                    resolve(results);
                } 
                    
                           
            });
        }); 
    } 

    async findAll(){
        const query = `SELECT * FROM ${this.tableName}`
        const results = await this.executeQuery(query)
        return results
    }
    async findById(id){
        const query =`SELECT * FROM ${this.tableName} WHERE id = ?`
        const results = await this.executeQuery(query,[id]) 
        return results
    }
    async findOne(where,value){
        const query =`SELECT * FROM ${this.tableName} WHERE ${where} = "${value}"`
        const results = await this.executeQuery(query,[where,value]) 
        return results

    }
    async findMany(where,value){
        const query = `SELECT * FROM ${this.tableName} WHERE ${where}="${value}"` 
        const results = await this.executeQuery(query,[where,value])
        return results
    } 
    async create(data){
        const query =`INSERT INTO ${this.tableName} SET ?`
        const results = await this.executeQuery(query,data) 
        return results.insertId
    }
    async update(id,data){
        const query =`UPDATE ${this.tableName} SET ? WHERE id = ?`
        const result = await this.executeQuery(query,[data, id]) 
        return result.affectedRows
    }
    async delete(data){
        const query =`SELECT * FROM ${this.tableName} WHERE id = ?`
        const result = await this.executeQuery(query,[id]) 
        return result.affectedRows
    }
    

}
module.exports = BaseSQLModel
    