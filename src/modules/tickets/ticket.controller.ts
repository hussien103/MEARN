import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '../../common/schemas/user.schema';
import { Roles } from '../../common/decorators/roles/role.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AuthGuard } from '../../common/guards/jwt-auth.guard';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/createTicket.dto';
import { UpdateTicketDto } from './dto/updateTicket.dto';

@Controller('tickets')
@UseGuards(AuthGuard, RolesGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.CUSTOMER)
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.CUSTOMER)
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() body: CreateTicketDto) {
    return this.ticketService.create(body);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() body: UpdateTicketDto) {
    return this.ticketService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }
}
