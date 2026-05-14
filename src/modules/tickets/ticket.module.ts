import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from '../../common/schemas/ticket.schema';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../../common/guards/roles.guard';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    AuthModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configServ: ConfigService) => ({
        secret: configServ.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  
  controllers: [TicketController],
  providers: [TicketService, RolesGuard, AuthGuard],
})
export class TicketModule {}
