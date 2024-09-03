const router = require('express').Router()
const jobController = require('../controllers/jobController')
const requireUser = require('../middlewares/requireUser')

router.get('/getAllJobs',requireUser,jobController.getAllJobs)
router.get('/getAllJobsPostedByOwner/:ownerId',requireUser,jobController.getAllJobsPostedByOwner)
router.get('/getJobDetails/:jobId',requireUser,jobController.getJobDetails)
router.post('/createJob',requireUser,jobController.createJobController)
router.put('/updateJob/:jobId',requireUser,jobController.updateJobController)
router.get('/getMyJob',requireUser,jobController.getMyJob)
router.delete('/deleteJob/:jobId',requireUser,jobController.deleteJob)

module.exports = router
