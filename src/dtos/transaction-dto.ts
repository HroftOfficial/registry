interface ITransactionDto {
  _id: string;
  trancheId: string;
  repay:number;
  date: Date;
  real: boolean,
  plannedRepay: number,
  info: [String]
}

module.exports = class TransactionDto {
  _id;

  trancheId;

  repay;

  date;

  real;

  plannedRepay;

  info;
  
  constructor(model:ITransactionDto) {
    this._id = model._id;
    this.trancheId = model.trancheId;
    this.repay = model.repay;
    this.date = model.date;
    this.real = model.real;
    this.plannedRepay = model.plannedRepay;
    this.info = model.info;
  }

};