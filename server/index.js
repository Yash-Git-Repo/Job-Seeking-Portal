const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config('./.env')

const morgan = require('morgan')

const cors = require('cors')

const cookieParser = require('cookie-parser')

const fileUpload = require('express-fileupload');

const dbconnect = require('./dbConnect')

//Routes
const userRouter = require('./routes/userRouter')
const jobRouter = require('./routes/jobRouter')
const applicationRouter = require('./routes/applicationRouter')
const authRouter = require('./routes/authRouter')


//middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan('common'))
app.use(cookieParser())
app.use(cors([{
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods:['GET' , 'POST' , 'PUT' , 'DELETE']
}]
))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

const PORT = process.env.PORT

dbconnect()
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

app.use('/api/user',userRouter)
app.use('/api/job',jobRouter)
app.use('/api/application',applicationRouter)
app.use('/api/auth',authRouter)

