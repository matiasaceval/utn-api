const { Router } = require('express')
const { login, signUser, deleteUser, putUser, getAllUsers, getOneUserByEmail } = require('../controllers/auth')
const { verifyUser, isAdmin } = require('../middleware/validators/user/userAuth')
const verifyBodyParams = require('../middleware/validators/user/userBodyParams')
const router = Router()

router.post('/login', login)

router.post('/signup', signUser)

router.delete('/user/:email', verifyUser, isAdmin, deleteUser)

router.put('/user/:email', verifyUser, isAdmin, verifyBodyParams, putUser)

router.get('/user/:email', verifyUser, isAdmin, getOneUserByEmail)

router.get('/user', verifyUser, isAdmin, getAllUsers)

module.exports = router
