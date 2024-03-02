import express from 'express'

const app = express()

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => { res.json('Welcome') })

export default app