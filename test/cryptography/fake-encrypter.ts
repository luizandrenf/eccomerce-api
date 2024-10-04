import { Encrypter } from 'src/domain/application/cryptography/encrypter';

export class FakeEncrypter implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return value + '--';
  }
}
