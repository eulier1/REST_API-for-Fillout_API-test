import express from 'express'
import {getfilteredResponses} from './handlers/filters'
import { handleInputErrors } from './handlers/middleware/handleInputError'

const app = express()

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => { res.json('Welcome') })

app.get('/:formId/filteredResponses', handleInputErrors, getfilteredResponses);

export default app