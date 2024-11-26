import MongoDao from './mongo.dao.js';
import { TicketModel } from './models/ticket.model.js';

export default class TicketDaoMongoDB extends MongoDao {
  constructor() {
    super(TicketModel);
  }

  async createTicket(ticketData) {
    return await this.create(ticketData);
  }
}