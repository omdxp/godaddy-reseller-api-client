class Client {
  name: string;

  constructor() {
    this.name = "Client";
  }
  getName() {
    return this.name;
  }
}

let c = new Client();
c.getName();
