import express from 'express';
import { authMiddlewareCookie } from '../middleware/auth-middleware_cookie';
import { transactionController } from '../controllers/transaction-controller';
export const router = express.Router();

/**get all transaction */
router.get('/', authMiddlewareCookie, transactionController.getAllTransaction);

/**add transaction */
router.post('/', authMiddlewareCookie, transactionController.addTransaction);

/** get transaction to ID */
router.get(
	'/:id',
	authMiddlewareCookie,
	transactionController.getTransactionToId
);

/** update transaction to ID */
router.put(
	'/:id',
	authMiddlewareCookie,
	transactionController.updateTransactionToId
);

/** get transaction to tranche ID */
router.get(
	'/all/:id',
	authMiddlewareCookie,
	transactionController.getTransactionTrancheId
);
