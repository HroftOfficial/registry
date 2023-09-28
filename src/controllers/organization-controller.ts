import { Request, Response, NextFunction } from "express";
import { organizationService } from "../service/organization-service";
import ApiError from "../exertions/api-error";

class OrganizationController {
  async getAllOrg(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await organizationService.getAllOrg();
      console.log(result)
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getCompleteOrg(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await organizationService.getCompleteOrg();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }


  async addOrg(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, limit } = req.body;
      if (name === "" || limit <= 0) {
        return next(
          ApiError.BadRequest("Недостаточно данных для создания организации")
        );
      }
      const result = await organizationService.addOrg(name, limit);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getOrgToId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await organizationService.getOrgId(id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateOrgToId(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, limit } = req.body;
      if (name === "" || limit <= 0) {
        return next(
          ApiError.BadRequest(
            "Недостаточно данных для редактирование организации"
          )
        );
      }
      const { id } = req.params;
      const result = await organizationService.updateOrgToId(id, name, limit);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const organizationController = new OrganizationController();
