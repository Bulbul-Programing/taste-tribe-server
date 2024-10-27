import express, { Application, Request, Response } from 'express'
const app : Application = express()
const port = 3000
import cors from 'cors';

app.use(express.json())
app.use(cors({
  origin : ['http://localhost:3000'],
  credentials : true,
  optionsSuccessStatus : 200,
  methods : ['GET', 'POST', 'PUT', 'DELETE']
}))


app.get('/', (req : Request, res : Response) => {
  res.send('Server is running')
})

export default app