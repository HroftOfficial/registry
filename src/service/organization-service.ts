import { organizationModel } from "../models/organization.model";
const OrganizationDto = require("../dtos/organization-dto");
import ApiError from "../exertions/api-error";

class OrganizationService {
  async getAllOrg() {
    const result = await organizationModel.find().sort({ name: 1 });
    return result;
  }

  async getCompleteOrg() {
    const result = await organizationModel.aggregate([
      {
        $addFields: {
          'uid': { '$toString': '$_id' }
        }
      },
      {
        $lookup: {
          from: 'tranches',
          localField: 'uid',
          foreignField: 'org._id',
          as: 'tranches'
        }
      },
      // {
      //   $unwind: '$tranches',
      // },
      {
        $unwind: {
          path: '$tranches',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          'tid': { '$toString': '$tranches._id' }
        }
      },
      {
        $lookup: {
          from: 'transactions',
          localField: 'tid',
          foreignField: 'trancheId',
          as: 'transactions'
        }
      },
      {
        $unwind: {
          path: '$transactions',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          totalRepay: { $sum: '$transactions.repay' },
          limit: { $first: '$limit' } // Добавить поле "limit" в вывод
        }
      }
    ])
    return result;
  }

  async addOrg(name: string, limit: number) {
    const candidate = await organizationModel.findOne({ name });
    if (candidate) {
      throw ApiError.BadRequest(
        `Организация с названием ${name} уже существует`
      );
    }
    const user = await organizationModel.create({ name, limit });
    const organizationDto = new OrganizationDto(user);
    return { organization: organizationDto };
  }

  async getOrgId(id: string) {
    const result = await organizationModel.findOne({ _id: id });
    return result;
  }

  async updateOrgToId(id: string, name: string, limit: number) {
    const filter = { _id: id };
    const update = { name, limit };
    const result = organizationModel.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });
    return result;
  }
}

export const organizationService = new OrganizationService();
