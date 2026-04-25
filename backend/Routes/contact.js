import express  from "express";
import contactForm from '../Controllers/contactController'

const router = express.Router()

router.route("/contact").post(contactForm)
export default router