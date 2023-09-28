import { trancheModel } from "../models/tranche.model";
const TrancheDto = require("../dtos/tranche-dto");
import ApiError from "../exertions/api-error";

interface IOrg {
  name: string;
  id: string;
}

interface ICreditForm {
  name: string;
  id: string;
}


class TrancheService {
  async getAllTranche() {
    const result = await trancheModel.find();
    return result;
  }

  async addTranche(org: IOrg, creditForm: ICreditForm, debt: number, trancheDay: number, balance: number, formatDate: Date, returnTranche: Date) {
    const user = await trancheModel.create({ org, creditForm, debt, trancheDay, balance, date:formatDate, returnTranche});
    const trancheDto = new TrancheDto(user);
    return { tranche: trancheDto };
  }

  async getTrancheId(id: string) {
    const result = await trancheModel.findOne({ _id: id });
    return result;
  }

  async updateTrancheToId(id: string, org: IOrg, creditForm: ICreditForm, debt: number, trancheDay: number, balance: number, formatDate: Date, returnTranche: Date) {
    const filter = { _id: id };
    const update = { org, creditForm, debt, trancheDay, balance, date: formatDate, returnTranche };
    const result = trancheModel.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });
    return result;
  }

  async deleteTrancheToId(id: string) {
    const result = await trancheModel.findOneAndDelete({_id:id});
    return result;
  }

}

export const trancheService = new TrancheService();
