const Character = require("./character.model");


const { setError } = require("../../utils/error/error");



// Metodos POST, GETALL, GET :

const postNewCharacter = async (req, res, next) => {
  try {
    const newCharacter = new Character();
    newCharacter.name = req.body.name;
    if (req.file) {
      newCharacter.img = req.file.path;
    }
    newCharacter.age= req.body.age;
    newCharacter.gender= req.body.gender;
    newCharacter.house = req.body.house;

    const characterDb = await newCharacter.save();
    return res.status(201).json(characterDb);
  } catch (error) {
    return next(setError(500, "Character not saved"));
  }
};

const getAllCharacters = async (req, res, next) => {
  try {
    const characterDb = await Character.find();
    res.status(200).json(characterDb);
  } catch (error) {
    return next(setError(500, "Characters failed server"));
  }
};
const getCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const characterDb = await Character.findById(id);
    if (!characterDb) {
      return next(setError(404, "Character not found"));
    }
    return res.status(200).json(characterDb);
  } catch (error) {
    return next(setError(500, "Character server error"));
  }
};


// Exportamos todas las funciones 
module.exports = {
  postNewCharacter,
  getCharacter,
  getAllCharacters,
};
