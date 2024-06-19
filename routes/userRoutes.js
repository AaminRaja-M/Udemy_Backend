let express = require('express')

let {addUser, login, refresh_token, displayAdminUsers, displayInstructorUsers} = require('../controllers/user.controller')

let router = express.Router()

router.post('/register', addUser)
router.post('/login', login)
router.post('/refresh_token', refresh_token)
router.get('/adminsList', displayAdminUsers)
router.get('/instructorsList', displayInstructorUsers)

module.exports = router;