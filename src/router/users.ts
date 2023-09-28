import express from 'express';
import { authMiddlewareCookie } from '../middleware/auth-middleware_cookie';
import { userController } from '../controllers/users-controller';
export const router = express.Router();


/**Login*/
router.post('/login', userController.loginCookie);
/**Logout */
router.post('/logout', userController.logoutCookie);
/** Refresh token */
router.get('/refresh', userController.refreshCookie);
/** Registration */
router.post('/registration', 
authMiddlewareCookie, 
userController.registration);
/**change enabled user */
router.post('/state/:id', authMiddlewareCookie, userController.changeState);
/** удалить или восстановить пользователя АДМ */
router.post('/delete/:id', authMiddlewareCookie, userController.deleteUsers);
// get all users JSON
router.get('/', authMiddlewareCookie, userController.getUsersNoLimit);
//user to ID
router.get('/:id', authMiddlewareCookie, userController.getUserDetails);
//update users on ID
router.post('/update/:id', authMiddlewareCookie, userController.updateUsers);
//update password on user ID
router.post(
  '/update_password/:id',
  authMiddlewareCookie,
  userController.updatePassword,
);
