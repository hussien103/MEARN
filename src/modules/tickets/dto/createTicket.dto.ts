import {
  IsEnum,
  IsString,
  Length,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @Length(10, 20)
  title: string;

  @IsString()
  @MinLength(15)
  @MaxLength(2000)
  description: string;

  @IsEnum(['open', 'in-progress', 'closed'])
  status: 'open' | 'in-progress' | 'closed';

  @IsEnum(['low', 'medium', 'high', 'critical'])
  priority: 'low' | 'medium' | 'high' | 'critical';

  @IsString()
  @MinLength(3)
  assignee: string;

  @IsString()
  @MinLength(3)
  reporter: string;
}
