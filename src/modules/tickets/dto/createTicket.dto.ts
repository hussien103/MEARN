/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum,  IsString, Length } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @Length(10, 20)
  title: string;

  @IsString()
  @Length(15)
  description: string;

  @IsEnum(['open', 'in-progress', 'closed'])
  status: 'open' | 'in-progress' | 'closed';

  @IsEnum(['low', 'medium', 'high', 'critical'])
  priority: 'low' | 'medium' | 'high' | 'critical';

  @IsString()
  assignee: string;

  @IsString()
  reporter: string;

}
