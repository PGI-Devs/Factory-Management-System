import { Router } from 'express';
import * as ctl from '../controllers/inventory.controller.js';
const router = Router();
router.get('/', ctl.list);
router.post('/', ctl.create);
router.put('/:id', ctl.update);
router.delete('/:id', ctl.remove);
export default router;
