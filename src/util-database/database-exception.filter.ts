import {
  ConstraintViolationException,
  DriverException,
  ForeignKeyConstraintViolationException,
  MetadataError,
  NotFoundError,
  NotNullConstraintViolationException,
  OptimisticLockError,
  UniqueConstraintViolationException,
  ValidationError,
} from '@mikro-orm/core';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(DriverException, ValidationError)
export class DatabaseExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost): any {
    this.logger.error(exception);
    // Cannot find the entity in database
    if (exception instanceof NotFoundError) {
      return super.catch(new NotFoundException(), host);
    }

    // Attempting to update a stale model
    if (exception instanceof OptimisticLockError) {
      return super.catch(new PreconditionFailedException(), host);
    }

    // Cannot get metadata. This is likely due to misconfiguration
    if (exception instanceof MetadataError) {
      return super.catch(new InternalServerErrorException(), host);
    }

    if (exception instanceof NotNullConstraintViolationException) {
      return super.catch(new BadRequestException(), host);
    }

    // Existing object already exists in database
    if (exception instanceof UniqueConstraintViolationException) {
      return super.catch(new ConflictException(), host);
    }

    if (exception instanceof ForeignKeyConstraintViolationException) {
      return super.catch(new ConflictException(), host);
    }

    if (exception instanceof ConstraintViolationException) {
      return super.catch(new ConflictException(), host);
    }

    // Any other errors caused by user will throw 400
    if (exception instanceof ValidationError) {
      return super.catch(new BadRequestException(), host);
    }

    // Any other errors caused by system will throw 500
    if (exception instanceof DriverException) {
      return super.catch(new InternalServerErrorException(), host);
    }

    return super.catch(exception, host);
  }
}
