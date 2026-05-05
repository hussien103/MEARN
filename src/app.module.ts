import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TicketModule } from './modules/tickets/ticket.module';
import { TicketSchemaValidationModule } from './modules/ticketsValidationSchema/ticket.module';

@Module({
  imports: [ConfigModule.forRoot(), TicketModule, TicketSchemaValidationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
