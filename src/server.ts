import express from 'express'
import {getfilteredResponses} from './handlers/filters'

const app = express()

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => { res.json('Welcome') })

app.get('/:formId/filteredResponses', getfilteredResponses);

export default app