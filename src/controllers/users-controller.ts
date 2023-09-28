import { Request, Response, NextFunction } from "express";
import { userService } from "../service/user-service";
import ApiError from "../exertions/api-error";

const LIMIT_ITEMS = process.env.LIMIT_ITEMS || "12";

class UserController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req?.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2592000000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async loginCookie(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req?.body;
      const userData = await userService.login(email, password);
      // Записываем access token в cookie
      res.cookie("accessToken", userData.accessToken, {
        maxAge: 360000,
        httpOnly: true,
      });
      res.cookie("at", true, { maxAge: 360000 });
      // Записываем refresh token в cookie
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2592000000,
        httpOnly: true,
      });
      res.cookie("rt", true, { maxAge: 2592000000 });
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req?.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async logoutCookie(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req?.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      res.clearCookie("at");
      res.clearCookie("rt");
      return res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req?.cookies;
      const userData = await userService.refresh(refreshToken);
      if (!!userData) {
        res.cookie("refreshToken", userData.refreshToken, {
          maxAge: 2592000000,
          httpOnly: true,
        });
        return res.status(200).json(userData);
      }
      return res.status(401);
    } catch (error) {
      next(error);
    }
  }

  async refreshCookie(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req?.cookies;
      const userData = await userService.refresh(refreshToken);
      if (!!userData) {
        // Записываем access token в cookie
        res.cookie("accessToken", userData.accessToken, {
          maxAge: 360000,
          httpOnly: true,
        });
        res.cookie("at", true, { maxAge: 360000 });
        // Записываем refresh token в cookie
        res.cookie("refreshToken", userData.refreshToken, {
          maxAge: 2592000000,
          httpOnly: true,
        });
        res.cookie("rt", true, { maxAge: 2592000000 });
        // console.log('куки на рефреш поставил');
        return res.status(200).json(userData);
      }
      return res.status(401);
    } catch (error) {
      next(error);
    }
  }

  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, position, name } = req.body;
      if (email === "" || password === "" || name === "") {
        return next(
          ApiError.BadRequest(
            "Недостаточно данных для регистрации пользователя"
          )
        );
      }
      const userData = await userService.registration(
        email,
        password,
        position,
        name
      );
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getUsersNoLimit(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsersNoLimit();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = "1", limit = LIMIT_ITEMS } = req.params;
      const countDoc = await userService.getCountDoc();
      res.set("x-total-news", countDoc.toString());
      const offset = parseInt(limit) * parseInt(page) - parseInt(limit);
      const users = await userService.getAllUsers(offset, parseInt(limit));
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      // console.log(id);
      const userData = await userService.getUserFromId(id);
      if (!userData) {
        return next(ApiError.NotFound());
      }
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async updateUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email, position } = req.body;
      const userData = await userService.update(name, email, position, id);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const userData = await userService.updatePassword(password, id);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  /**удаление пользователя*/
  async deleteUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const countAdmin = await userService.getCountAdmin();
      if (countAdmin == 1) {
        return next(
          ApiError.BadRequest("Остался 1 администратор. Его не удаляю!!!")
        );
      }
      const userData = await userService.deleteAdmin(id);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  /** активировать - деактивировать пользователя adm */
  async changeState(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { state } = req.body;
      const userData = await userService.changState(id, state);
      return res
        .status(200)
        .json({ _id: userData?._id, enabled: userData?.enabled });
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();
export { userController };
