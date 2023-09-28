interface IOrganizationDto {
  _id: string;
  name: string;
  limit:number

}

module.exports = class OrganizationDto {
  _id;

  name;

  limit;
  
  constructor(model:IOrganizationDto) {
    this._id = model._id;
    this.name = model.name;
    this.limit = model.limit;
  }

};