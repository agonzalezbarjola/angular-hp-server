const House = require('./house.model')
const { setError } = require('../../utils/error/error')



const postNewHouse = async (req, res, next) => {
    try {
        const newHouse = new House()
        newHouse.name = req.body.name
        newHouse.animal = req.body.animal
        newHouse.description = req.body.description
        if (req.file) {
            newHouse.img= req.file.path;
          } 
        newHouse.members = req.body.members
        const houseDb = await newHouse.save()
        return res.status(201).json(houseDb)
    } catch (error) {
        return next(setError(500, 'House not saved'))
    }
}

const getAllHouses = async (req, res, next) => {
    try {
        const housesDb = await House.find().populate('members')
        res.status(200).json(housesDb)
    } catch (error) {
        return next(setError(500, 'House failed server'))
    }
}

const getHouse = async (req, res, next) => {
    try {
        const { id } = req.params
        const housesDb = await House.findById(id).populate('members')
        if (!housesDb) {
            return next(setError(404, 'Houses not found'))
        }
        return res.status(200).json(housesDb)
    } catch (error) {
        return next(setError(500, 'Houses server error'))
    }
}



module.exports = {
    postNewHouse,
    getAllHouses,
    getHouse,
}