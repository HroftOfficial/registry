import express from 'express';
import { authMiddlewareCookie } from '../middleware/auth-middleware_cookie';
import { creditFormController } from '../controllers/creditForm-controller';
export const router = express.Router();


/**get all credit form */
router.get('/', authMiddlewareCookie, creditFormController.getAllCreditForm);

/**add credit form  */
router.post('/', authMiddlewareCookie, creditFormController.addCreditForm);

/** get credit form  to ID */
router.get('/:id', authMiddlewareCookie, creditFormController.getCreditFormToId);

/** update credit form  to ID */
router.put('/:id', authMiddlewareCookie, creditFormController.updateCreditFormToId);
