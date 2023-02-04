import { Router } from "express";
import * as user from "./controller/user.js";

const router = Router()

router.get('/:id',user.getUserById)
router.get('/profile/:id',user.profile)
router.post('/signup',user.addUser)
router.post('/signin',user.signIn)
router.put('/:id',user.updateUser)
router.put('/replaceallusers/:id',user.replaceUsers)
router.delete('/:id',user.deleteUser)


export default router