var { ncrypt } = require("ncrypt-js");

export default (encryptedData = '') => {
const encryptionKey =  process.env.ENCRYPTION_KEY ?? ''
var ncryptObject = new ncrypt(encryptionKey);
// decrypted super encrypted data here
var decryptedData = ncryptObject.decrypt(encryptedData);
return decryptedData;
};




// encrypting super sensitive data here
