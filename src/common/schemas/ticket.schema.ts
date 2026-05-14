import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({
    required: true,
    enum: ['open', 'in-progress', 'closed'],
  })
  status: 'open' | 'in-progress' | 'closed';

  @Prop({
    required: true,
    enum: ['low', 'medium', 'high', 'critical'],
  })
  priority: 'low' | 'medium' | 'high' | 'critical';

  @Prop({ required: true, trim: true })
  reporter: string;

  @Prop({ required: true, trim: true })
  assignee: string;
}

export type TicketDocument = HydratedDocument<Ticket>;

export const TicketSchema = SchemaFactory.createForClass(Ticket);
