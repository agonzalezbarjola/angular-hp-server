const CharacterRoutes = require ('express').Router()
const { isAuth} = require ('../../middlewares/auth')
const upload = require('../../middlewares/file')

const { postNewCharacter, getAllCharacters, getCharacter } = require('./character.controller')
CharacterRoutes.get('/', getAllCharacters)
CharacterRoutes.get('/:id', getCharacter)
CharacterRoutes.post('/', [isAuth], upload.single('img'), postNewCharacter)
module.exports = CharacterRoutes