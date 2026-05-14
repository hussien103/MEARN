import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import type { Ticket } from '../../common/interfaces/ticket';

import { GeneralScehmaPipe } from 'src/pipes/generalSchemaPipe.pipe';
import * as ticketSchemaSchema from 'src/common/schemas/ticketSchema.schema';

@Controller('ticketsSchema')
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
    @Body(new GeneralScehmaPipe(ticketSchemaSchema.createTicketSchema))
    body: ticketSchemaSchema.CreateTicketType,
  ): Ticket {
    return this.ticketService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new GeneralScehmaPipe(ticketSchemaSchema.updateTicketSchema))
    body: ticketSchemaSchema.UpdateTicketType,
  ): Ticket | null {
    return this.ticketService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { success: boolean } {
    const result = this.ticketService.delete(Number(id));
    return { success: result };
  }
}
