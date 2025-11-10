import CryptoJS from 'crypto-js';

export class CryptoService {
  /**
   * Criptografa dados usando AES
   */
  static encrypt(data: string, password: string): string {
    return CryptoJS.AES.encrypt(data, password).toString();
  }

  /**
   * Descriptografa dados usando AES
   */
  static decrypt(encryptedData: string, password: string): string | null {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, password);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Gera hash SHA256 de uma senha (para verificação)
   */
  static hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }

  /**
   * Verifica se a senha corresponde ao hash
   */
  static verifyPassword(password: string, hash: string): boolean {
    return this.hashPassword(password) === hash;
  }
}
