import express from 'express';
import { router as userRoute } from './users';
import { router as organizationRoute } from './organization';
import { router as creditFormRoute } from './creditForm';
import { router as tranceRoute } from './tranche';
import { router as transactionRoute } from './transaction';

export const router = express.Router();

router.use('/users', userRoute);
router.use('/organization', organizationRoute);
router.use('/credit-form', creditFormRoute);
router.use('/tranche', tranceRoute);
router.use('/transaction', transactionRoute);
