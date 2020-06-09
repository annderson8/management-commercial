const MysqlLib = require('../libs/mysql');
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');

class UsersService {

  constructor() {
    this.collection = 'users';
    this.mysqlClient = new MysqlLib();
  }

  async getUsers() {
    return await this.mysqlClient.list(this.collection);
  }

  async getUserId(id) {
    return await this.mysqlClient.get(this.collection, id);
  }

  async addUsers(data) {
    const user = {
        id: nanoid.nanoid(),
        name: data.name,
        email: data.email,
        password: bcrypt.hashSync(data.password, 10)
    } 
    return await this.mysqlClient.create(this.collection, user);
  }
  async updateUser (body, id) {
    const user = {
        id: id,
        name: body.name,
        email: body.email,
    } 
    return await this.mysqlClient.update(this.collection, user);
  }
  async deleteUser (id) {
    return await this.mysqlClient.delete(this.collection, id);
  }
}

module.exports = UsersService;