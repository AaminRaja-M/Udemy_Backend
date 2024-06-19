let express = require('express')
let userRoutes = require('./routes/userRoutes')
let connectDatabase = require('./db/connectUserDB')
let cors = require('cors')
require('dotenv').config()
let {verifyAccessToken} = require('./helpers/jwt_helper')

let app = express()
app.use(cors())

app.use(express.json())

app.get('/', verifyAccessToken, async(req, res, next) => {
    console.log(req.headers["authorization"]);
    res.send("Hello from express")
})
app.use('/user', userRoutes)

app.use('*', (req, res) => {
    res.json({error:true, message:"Page not found"})
})

app.use((err, req, res, next) => {
    res.json({error:true, message:err})
})

let startServer = async() => {
    try {
        await(connectDatabase(process.env.USER_PORT))
        console.log('mongodb connected successfully');

        app.listen(4000, () => {
            console.log('Server is running at port : http://localhost:4000');
        })
    } catch (error) {
        console.log(error);
    }
}

startServer()