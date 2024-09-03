const router = require('express').Router()
const appliationController = require('../controllers/applicationController')
const requireUser = require('../middlewares/requireUser')

router.get('/employeerGetAllJobApplications',requireUser,appliationController.employeerGetAllJobApplications)
router.get('/jobSeekerGetAllJobApplications',requireUser,appliationController.jobSeekerGetAllJobApplications)
router.delete('/jobSeekerDeleteApplications/:applicationId',requireUser,appliationController.jobSeekerDeleteApplications)
router.post('/postApplication',requireUser,appliationController.postApplication)

module.exports = router
