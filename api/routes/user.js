const express = require('express')
const {
  createUser,
  loginUser,
  logoutUser,
  userDetails,
  getUser
} = require('../controllers/user')
const { isAuthenticatedUser } = require('../middleware/auth')
const router = express.Router()

router.route('/registration').post(createUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/get-user/:id').get(isAuthenticatedUser, getUser)
router.route('/me').get(isAuthenticatedUser, userDetails)

module.exports = router
