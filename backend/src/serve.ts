import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import UserRouters from './routes/UserRouters'

const app = express()
const port = process.env.APP_PORT

//allow cors
app.use(cors())

// allow body data in form data
app.use(bodyParser .json())
app.use(bodyParser.urlencoded({ extended: true }))

// define a route handler for the default home page
app.get("/", (req, res)=>{
    res.send("Wellcome to api maked by Isx")
})
app.use("/users", UserRouters())


app.listen(port, () => {
    console.log(`Server on in port ${port}`)
})