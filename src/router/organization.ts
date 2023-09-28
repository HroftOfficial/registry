import express from 'express';
import { authMiddlewareCookie } from '../middleware/auth-middleware_cookie';
import { organizationController } from '../controllers/organization-controller';
export const router = express.Router();


/**get all org */
router.get('/', authMiddlewareCookie, organizationController.getAllOrg);
/**get all org */
router.get('/complete', authMiddlewareCookie, organizationController.getCompleteOrg);

/**add org */
router.post('/', authMiddlewareCookie, organizationController.addOrg);

/** get org to ID */
router.get('/:id', authMiddlewareCookie, organizationController.getOrgToId);

/** update org to ID */
router.put('/:id', authMiddlewareCookie, organizationController.updateOrgToId);

