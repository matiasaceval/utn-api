const jwt = require('jsonwebtoken')
const status = require('../utils/error')
const UserModel = require('../services/login/model')
const bcrypt = require('bcrypt')
const isUndefined = require('../utils/isUndefined')

module.exports = async (req, res) => {
    const { body } = req
    const { username, password } = body

    const user = await UserModel.getUserByUsername(username)
    
    const passwordCorrect = isUndefined(user)
      ? undefined
      : await bcrypt.compare(password, user.password)
      
    if (!user || !passwordCorrect) return status.INVALID_LOGIN(res)
    
    const userForToken = {
      id: user._id,
      username: user.username
    }
  
    const token = jwt.sign(
      userForToken,
      process.env.JWT_SECRET,
      {
        // time in seconds
        expiresIn: 60 * 30 
      }
    )
  
    res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    })

    res.send({
        name: user.name,
        username: user.username
    })
}