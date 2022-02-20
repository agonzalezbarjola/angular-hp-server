const express = require('express');
const cors = require("cors");
const cloudinary = require('cloudinary').v2

const userRoutes = require('./src/api/user/user.routes')
const characterRoutes = require('./src/api/character/character.routes')
const HousesRoutes = require('./src/api/house/house.routes')


const { setError } = require("./src/utils/error/error")
const { connectDb } = require("./src/utils/database/db");



const PORT = process.env.PORT || 8080;
const app = express();

connectDb();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  })

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
  }) 

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],  /* donde está el localhost sustituir por ruta vercel  */
    credentials: true
  }))


  app.use(express.json({
    limit: '5mb'
  }))

  app.use(express.urlencoded({ limit: '5mb', extended: true }))

app.use('/api/users', userRoutes)
app.use('/api/characters', characterRoutes)
app.use('/api/houses', HousesRoutes)
app.use('/', (req, res, next) => {
    return res.json('HP Server')
})
app.use('*', (req, res, next) => {
  return next(setError(404, 'Route not found'))
})

app.use((error, req, res, next) => {
return res.status(error.status || 500).json(error.message || 'Unexpected error')
})
 

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
  
 