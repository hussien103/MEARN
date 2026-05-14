/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as zod from 'zod';

@Injectable()
export class GeneralScehmaPipe implements PipeTransform {
  constructor(private schema: zod.ZodSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      throw new BadRequestException({
        message: 'Validation Error',
        statusCode: 400,
        errors: errorMessages,
      });
    }

    return result.data;
  }
}
