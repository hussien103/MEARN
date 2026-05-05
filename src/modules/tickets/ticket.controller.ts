import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import type { Ticket } from '../../common/interfaces/ticket';
import { CreateTicketDto } from './dto/createTicket.dto';
import { UpdateTicketDto } from './dto/updateTicket.dto';

@Controller('ticketsDTO')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  getAll(): Ticket[] {
    return this.ticketService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Ticket | undefined {
    return this.ticketService.findOne(Number(id));
  }

  @Post()
  create(
    @Body(new ValidationPipe({}))
    body: CreateTicketDto,
  ): Ticket {
    return this.ticketService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) body: UpdateTicketDto,
  ): Ticket | null {
    return this.ticketService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { success: boolean } {
    const result = this.ticketService.delete(Number(id));
    return { success: result };
  }
}
