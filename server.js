const express = require ('express');
const port = process.env.PORT || 5000

const colors = require('colors');
const dotenv = require('dotenv').config();

const {errorHandler} = require('./middlewares/errorMiddleware')
const connectDB = require('./config/dbconfig');
const cors = require('cors')
const path = require('path')


connectDB()
const app = express();

app.use(express.json()) //Body Parser
app.use(express.urlencoded({extended:false})) //urlEncoded

//Cross-Orgin Access
app.use(cors())
//Static Files

app.use(express.static(path.join(__dirname,'../frontend/build')))

app.use('/api/database',require('./routes/contactRoutes'));
app.use('/api/volunteer',require('./routes/volunteerRoutes'));

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./frontend/build/index.html'))
})

app.use(errorHandler);//Overides default ErrorHandler
app.listen(port,()=> console.log(`App up and running on ${port}`))