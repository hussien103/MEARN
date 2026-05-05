import { Injectable } from '@nestjs/common';
import { Ticket } from '../../common/interfaces/ticket';
import { UpdateTicketDto } from './dto/updateTicket.dto';
import { CreateTicketDto } from './dto/createTicket.dto';

@Injectable()
export class TicketService {
  private tickets: Ticket[] = [
    {
      id: 1,
      title: 'Login issue',
      description: 'User cannot login to the system',
      status: 'open',
      priority: 'high',
      reporter: 'Hussien',
      assignee: 'Ahmed',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'UI bug',
      description: 'Button not clickable on homepage',
      status: 'in-progress',
      priority: 'medium',
      reporter: 'Sara',
      assignee: 'Ali',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: 'Crash on checkout',
      description: 'App crashes when submitting order',
      status: 'closed',
      priority: 'critical',
      reporter: 'Omar',
      assignee: 'Mona',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll(): Ticket[] {
    return this.tickets;
  }

  findOne(id: number): Ticket | undefined {
    return this.tickets.find((ticket) => ticket.id === id);
  }

  create(ticketData: CreateTicketDto): Ticket {
    const newTicket: Ticket = {
      id: this.tickets.length + 1,
      ...ticketData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tickets.push(newTicket);
    return newTicket;
  }

  update(id: number, updateData: UpdateTicketDto): Ticket | null {
    const ticket = this.findOne(id);
    if (!ticket) return null;

    Object.assign(ticket, updateData, { updatedAt: new Date() });
    return ticket;
  }

  delete(id: number): boolean {
    const index = this.tickets.findIndex((t) => t.id === id);
    if (index === -1) return false;

    this.tickets.splice(index, 1);
    return true;
  }
}
