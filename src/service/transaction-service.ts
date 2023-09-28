import { transactionModel } from "../models/transaction.model";
const TransactionDto = require("../dtos/transaction-dto");
import ApiError from "../exertions/api-error";

class TransactionService {
  async getAllTransaction() {
    const result = await transactionModel.find();
    return result;
  }

  async addTransaction(
    trancheId: string,
    repay: number,
    formatDate: Date,
    real: boolean,
    plannedRepay: number,
    info: [String]
  ) {
    const transaction = await transactionModel.create({
      trancheId,
      repay,
      date: formatDate,
      real,
      plannedRepay,
      info,
    });
    const transactionDto = new TransactionDto(transaction);
    return { transaction: transactionDto };
  }

  async getTransactionId(id: string) {
    const result = await transactionModel.findOne({ _id: id });
    return result;
  }

  async updateTransactionToId(
    id: string,
    trancheId: string,
    repay: number,
    real: boolean,
    plannedRepay: number,
    info: [String]
  ) {
    const filter = { _id: id };
    const update = { trancheId, repay, real, plannedRepay, $push:{info: info} };
    const result = transactionModel.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });
    return result;
  }

  async getTransactionTrancheId(id: string) {
    const result = await transactionModel.find({ trancheId: id });
    return result;
  }
}

export const transactionService = new TransactionService();
