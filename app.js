import * as indexRouter from './modules/index.router.js'
import express from 'express'
import  connectDB  from './connictionDB/conniction.js'
const app = express()
const port = 5000
const baseUrl = '/api/v1';
app.use(express.json())
app.use(`${baseUrl}/user`, indexRouter.userRouter)
app.use(`${baseUrl}/product`, indexRouter.productRouter)



app.use("*", (req, res, next) => {
    res.json({
        message: "404 page not found",
        details: "Method or URl are invalid"
    })
})


connectDB()

app.listen(port, () => {
    console.log(`server is running on port ........${port}`);
})