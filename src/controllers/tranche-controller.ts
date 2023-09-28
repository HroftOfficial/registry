import { Request, Response, NextFunction } from "express";
import { trancheService } from "../service/tranche-service";
import ApiError from "../exertions/api-error";

class TrancheController {
  async getAllTrancheForm(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await trancheService.getAllTranche();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async addTrancheForm(req: Request, res: Response, next: NextFunction) {
    try {
      const { org, creditForm, debt, trancheDay, balance, date, returnTranche} = req.body;
      const formatDate = new Date(date)
      const result = await trancheService.addTranche(org, creditForm, debt, trancheDay, balance, formatDate, returnTranche);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getTrancheFormToId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await trancheService.getTrancheId(id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateTrancheFormToId(req: Request, res: Response, next: NextFunction) {
    try {
      const { org, creditForm, debt, trancheDay, balance, date, returnTranche} = req.body;
      const formatDate = new Date(date)
      const { id } = req.params;
      const result = await trancheService.updateTrancheToId(id, org, creditForm, debt, trancheDay, balance, formatDate, returnTranche);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
async deleteTrancheFormToId(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const result = await trancheService.deleteTrancheToId(id);
    return res.json(result);
  } catch (error) {
    next(error);
  }
}

}

export const trancheController = new TrancheController();
