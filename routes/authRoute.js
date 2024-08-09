import express from 'express'
import {registerController, loginController,testController, forgotPasswordController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'



//router object

const router = express.Router()

//routing
//REGISTER || METHOD POST

router.post('/register', registerController)

//LOGIN || POST
router.post('/login',loginController)

//FORGOT Password || POST
router.post('/forgot-password', forgotPasswordController)

//test routes
router.get('/test',requireSignIn, isAdmin, testController)

//protected Route auth
router.get('/user-auth',requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
} )

export default router