import express from 'express';
import { authMiddlewareCookie } from '../middleware/auth-middleware_cookie';
import { trancheController } from '../controllers/tranche-controller';
export const router = express.Router();


/**get all tranche form */
router.get('/', authMiddlewareCookie, trancheController.getAllTrancheForm);

/**add tranche form  */
router.post('/', authMiddlewareCookie, trancheController.addTrancheForm);

/** get tranche form  to ID */
router.get('/:id', authMiddlewareCookie, trancheController.getTrancheFormToId);

/** update tranche form  to ID */
router.put('/:id', authMiddlewareCookie, trancheController.updateTrancheFormToId);

/** delete tranche form  to ID */
router.delete('/:id', authMiddlewareCookie, trancheController.deleteTrancheFormToId);
