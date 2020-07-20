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
  constructor(){}
}

export class TypeOfDistributor {
  id: number;
  name: string;

  constructor() {
  }
}

export class DeleteListDistributor {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
