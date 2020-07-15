export class Distributor {
  id: number;
  name: string;
  address: string;
  numberPhone: string;
  email: string;
  img: string;
  fax: string;
  website: string;
  typeOfDistributor: TypeOfDistributor;
  deleted: boolean;
  constructor(id: number, name: string, address: string, numberPhone: string, email: string, img: string, fax: string, website: string, typeOfDistributor: TypeOfDistributor, deleted: boolean) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.numberPhone = numberPhone;
    this.email = email;
    this.img = img;
    this.fax = fax;
    this.website = website;
    this.typeOfDistributor = typeOfDistributor;
    this.deleted = deleted;
  }
}
export class TypeOfDistributor {
  id: number;
  name: string;
}
export class TypeOfDistributor {
  id: number;
  name: string;

}
