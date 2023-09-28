import { Request, Response, NextFunction } from "express";
import { transactionService } from "../service/transaction-service";
import ApiError from "../exertions/api-error";

class TransactionController {
  async getAllTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await transactionService.getAllTransaction();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async addTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { trancheId, repay, date, real, plannedRepay, info } = req.body;
      if (trancheId === "" ) {
        return next(
          ApiError.BadRequest("Недостаточно данных для создания организации")
        );
      }
      const formatDate = new Date(date)
      const result = await transactionService.addTransaction(trancheId, repay, formatDate, real, plannedRepay, info);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getTransactionToId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await transactionService.getTransactionId(id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateTransactionToId(req: Request, res: Response, next: NextFunction) {
    try {
      const { trancheId, repay, real, plannedRepay, info } = req.body;
      if (trancheId === "") {
        return next(
          ApiError.BadRequest("Недостаточно данных для создания организации")
        );
      }
      const { id } = req.params;
      const result = await transactionService.updateTransactionToId(id, trancheId, repay, real, plannedRepay, info );
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getTransactionTrancheId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params; //id tranche
      const result = await transactionService.getTransactionTrancheId(id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const transactionController = new TransactionController();
