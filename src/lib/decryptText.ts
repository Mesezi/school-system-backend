import crypto from 'crypto';

export default (encryptedData = '') => {
const encryptionKey =  process.env.ENCRYPTION_KEY ?? ''
  const [initializationVectorAsHex, encryptedDataAsHex] = encryptedData?.split(':');
  const initializationVector = Buffer.from(initializationVectorAsHex, 'hex');
  const hashedEncryptionKey = crypto.createHash('sha256').update(encryptionKey).digest('hex').substring(0, 32);
  const decipher = crypto.createDecipheriv('aes256', hashedEncryptionKey, initializationVector);
  
  let decryptedText = decipher.update(Buffer.from(encryptedDataAsHex, 'hex'));
  decryptedText = Buffer.concat([decryptedText, decipher.final()]);

  return decryptedText.toString();
};