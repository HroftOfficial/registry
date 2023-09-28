import { Request, Response, NextFunction } from "express";
import { creditFormService } from "../service/creditForm-service";
import ApiError from "../exertions/api-error";

class CreditFormController {
  async getAllCreditForm(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await creditFormService.getAllCreditForm();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async addCreditForm(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      if (name === "") {
        return next(
          ApiError.BadRequest("Недостаточно данных для создания формы кредита")
        );
      }
      const result = await creditFormService.addCreditForm(name);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getCreditFormToId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await creditFormService.getCreditFormId(id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateCreditFormToId(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      if (name === "" ) {
        return next(
          ApiError.BadRequest(
            "Недостаточно данных для редактирование организации"
          )
        );
      }
      const { id } = req.params;
      const result = await creditFormService.updateCreditFormToId(id, name);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const creditFormController = new CreditFormController();
