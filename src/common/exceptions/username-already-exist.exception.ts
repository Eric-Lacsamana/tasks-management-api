// src/common/exceptions/username-already-exists.exception.ts
import { ConflictException } from '@nestjs/common';

export class UsernameAlreadyExistsException extends ConflictException {
  constructor() {
    super('Username already in use');
  }
}
