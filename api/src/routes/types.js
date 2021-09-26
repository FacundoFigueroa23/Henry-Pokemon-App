const { Router } = require('express')
const { getTypesFromApi } = require('../controllers/typesControllers.js')

const router = Router()

router.get('/', getTypesFromApi)

module.exports = router