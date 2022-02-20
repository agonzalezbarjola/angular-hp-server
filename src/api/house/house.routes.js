const HousesRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewHouse, getAllHouses, getHouse, } = require('./house.controller')


HousesRoutes.get('/', getAllHouses)
HousesRoutes.get('/:id', getHouse)
HousesRoutes.post('/', [isAuth], upload.single('img'), postNewHouse)


module.exports = HousesRoutes