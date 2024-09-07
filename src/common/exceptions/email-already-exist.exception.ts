// src/common/exceptions/email-already-exists.exception.ts
import { ConflictException } from '@nestjs/common';

export class EmailAlreadyExistsException extends ConflictException {
  constructor() {
    super('Email already in use');
  }
}
