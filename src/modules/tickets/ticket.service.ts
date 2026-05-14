import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Ticket, TicketDocument } from '../../common/schemas/ticket.schema';
import { CreateTicketDto } from './dto/createTicket.dto';
import { UpdateTicketDto } from './dto/updateTicket.dto';

export type TicketView = {
  id: string;
  title: string;
  description: string;
  status: Ticket['status'];
  priority: Ticket['priority'];
  reporter: string;
  assignee: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
  ) {}

  private toView(doc: TicketDocument): TicketView {
    const o = doc.toObject() as unknown as Ticket & {
      _id: Types.ObjectId;
      createdAt: Date;
      updatedAt: Date;
    };
    return {
      id: o._id.toHexString(),
      title: o.title,
      description: o.description,
      status: o.status,
      priority: o.priority,
      reporter: o.reporter,
      assignee: o.assignee,
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
    };
  }

  async findAll(): Promise<TicketView[]> {
    const docs = await this.ticketModel.find().sort({ createdAt: -1 }).exec();
    return docs.map((d) => this.toView(d));
  }

  async findOne(id: string): Promise<TicketView> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Ticket not found');
    }
    const doc = await this.ticketModel.findById(id).exec();
    if (!doc) {
      throw new NotFoundException('Ticket not found');
    }
    return this.toView(doc);
  }

  async create(dto: CreateTicketDto): Promise<TicketView> {
    const doc = await this.ticketModel.create(dto);
    return this.toView(doc);
  }

  async update(id: string, dto: UpdateTicketDto): Promise<TicketView> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Ticket not found');
    }
    const doc = await this.ticketModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!doc) {
      throw new NotFoundException('Ticket not found');
    }
    return this.toView(doc);
  }

  async remove(id: string): Promise<{ success: boolean }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Ticket not found');
    }
    const res = await this.ticketModel.findByIdAndDelete(id).exec();
    if (!res) {
      throw new NotFoundException('Ticket not found');
    }
    return { success: true };
  }
}
