interface IOrg {
  name: string;
  id: string;
}

interface ICreditForm {
  name: string;
  id: string;
}

interface ITrancheDto {
  _id: string;
  org: IOrg;
  creditForm: ICreditForm;
  debt: number;
  trancheDay: number;
  balance: number;
  returnTranche: Date;
  date: Date;
}

module.exports = class Tranche {
  _id;

  org;

  creditForm;

  debt;

  trancheDay;

  balance;

  returnTranche;

  date;

  constructor(model: ITrancheDto) {
    this._id = model._id;
    this.org = model.org;
    this.creditForm = model.creditForm;
    this.debt = model.debt;
    this.trancheDay = model.trancheDay;
    this.balance = model.balance;
    this.returnTranche = model.returnTranche;
    this.date = model.date;
  }
};
