import { PartialType } from '@nestjs/mapped-types';
import { RegisterAuthDto } from './create-auth.dto';

export class LoginDto extends PartialType(RegisterAuthDto) {
  fullname: string;
  password: string;
}

