const { Router } = require('express')
const { login, signUser, deleteUser, putUser, getAllUsers } = require('../controllers/auth')
const { verifyUser, isAdmin } = require('../middleware/validators/user/userAuth')
const verifyBodyParams = require('../middleware/validators/user/userBodyParams')
const router = Router()

router.post('/login', login)

router.post('/signup', verifyUser, isAdmin, signUser)

router.delete('/user/:username', verifyUser, isAdmin, deleteUser)

router.put('/user/:username', verifyUser, isAdmin, verifyBodyParams, putUser)

router.get('/user', verifyUser, isAdmin, getAllUsers)

module.exports = router
