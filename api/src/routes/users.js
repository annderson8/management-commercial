const express = require('express');
const UsersService = require('../services/users');

const usersApi = (app) => {

    const router = express.Router();
    app.use('/api/users', router);

    const usersService = new UsersService();
    
    router.get('/', async (req, res, next) => {
      try {
        const data = await usersService.getUsers();
        res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    });

    router.get('/:id', async (req, res, next) => {
      try {
        const data = await usersService.getUserId(req.params.id);
        res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    });

    router.post('/', async (req, res, next) => {
      try {
        const data = await usersService.addUsers(req.body);
        res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    });

    router.put('/:id', async (req, res, next) => {
      try {
        const data = await usersService.updateUser(req.body, req.params.id);
        res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    });

    router.delete('/:id', async (req, res, next) => {
      try {
        const data = await usersService.deleteUser(req.params.id);
        res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    });
  
  };
  
  module.exports = usersApi;