import express from 'express';
const router = express.Router();
import {getData,addData,deleteData,updateData, getOneData} from '../controllers/control.js';

router.get('/',getData)

router.get('/:id',getOneData)

router.post('/',addData)

router.delete('/:id',deleteData)

router.patch('/:id',updateData)



export default router;