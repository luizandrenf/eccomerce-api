import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Encrypter } from '../../../domain/application/cryptography/encrypter';

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}
  async encrypt(value: string): Promise<string> {
    return await this.jwtService.signAsync({ sub: value });
  }
}
