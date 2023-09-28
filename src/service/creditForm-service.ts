import { creditFormModel } from "../models/creditForm.model";
import { trancheModel } from "../models/tranche.model";
const CreditFormDto = require("../dtos/creditForm-dto");
import ApiError from "../exertions/api-error";

class CreditFormService {
  async getAllCreditForm() {
    const result = await creditFormModel.find().sort({ name: 1 });
    return result;
  }

  async addCreditForm(name: string) {
    const candidate = await creditFormModel.findOne({ name });
    if (candidate) {
      throw ApiError.BadRequest(
        `Форма кредита с названием ${name} уже существует`
      );
    }
    const user = await creditFormModel.create({ name });
    const creditFormDto = new CreditFormDto(user);
    return { creditForm: creditFormDto };
  }

  async getCreditFormId(id: string) {
    const result = await creditFormModel.findOne({ _id: id });
    return result;
  }

  async updateCreditFormToId(id: string, name: string) {
    const filter = { _id: id };
    const update = { name };
    const result = creditFormModel.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });
    // Обновим так же названия в tranches
    await trancheModel.updateMany({'creditForm._id': id},{'creditForm.name': name})
    return result;
  }
}

export const creditFormService = new CreditFormService();
