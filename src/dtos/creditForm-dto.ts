interface ICreditFormDto {
  _id: string;
  name: string;

}

module.exports = class CreditFormDto {
  _id;

  name;
  
  constructor(model:ICreditFormDto) {
    this._id = model._id;
    this.name = model.name;
  }

};