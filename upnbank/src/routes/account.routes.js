import {createAccount} from '../controller/account.controller.js'
import express from 'express'
import { Router } from 'express'
import {authMiddleWare} from '..//middleware/auth.middleware.js'
const accountRouter= express.Router()

accountRouter.post("/create-account",authMiddleWare,createAccount)

export default accountRouter;