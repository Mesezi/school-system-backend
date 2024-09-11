var { ncrypt } = require("ncrypt-js");

export default (data = '') => {
  const encryptionKey =  process.env.ENCRYPTION_KEY ?? ''
  var ncryptObject = new ncrypt(encryptionKey);
  var encryptedData = ncryptObject.encrypt(data);

  return encryptedData;
};