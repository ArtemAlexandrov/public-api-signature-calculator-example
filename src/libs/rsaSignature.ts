const crypto = require('crypto');
export const rsaSignature = (privateKey : string, url : string, {
  queryString = '',
  requestBody = '',
} : { queryString?: string, requestBody?: string } = {}) : string => {
  const sign = crypto.createSign("RSA-SHA256");
  if (queryString) {
    sign.update(url + "?" + queryString + requestBody)
  } else {
    sign.update(url + requestBody)
  }
  sign.end();

  return sign.sign(privateKey, 'base64');
}
