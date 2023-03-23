import { Subject } from "rxjs";

class Server {
  constructor() {
    this.rooms = {
      test: { subject: new Subject(), name: "test", id: "test" },
    };
  }

  /**
   * @param {string} id
   * @param {any} name
   */
  async createRoom(id, name) {
    const subject = new Subject();
    this.rooms[id] = { subject, name, id };
  }

  getRoom(id) {
    return this.rooms[id];
  }

  sendMessage(id, msg) {
    this.rooms[id].subject.next(msg);
  }
}

export default new Server();
