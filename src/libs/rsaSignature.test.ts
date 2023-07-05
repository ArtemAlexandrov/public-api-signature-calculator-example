import {rsaSignature} from "./rsaSignature";

const PRIVATE_KEY = "-----BEGIN RSA PRIVATE KEY-----\n" +
  "MIIEpQIBAAKCAQEAspMfrKDl78gMWr4EO9Nr9LoZirPvkN93oGDO1LPnvDIwkmTV\n" +
  "QCXv9EAgzz4E36B9RuXIukMydrwCqtPOaweSAFgj9MZ0PFwIWsHk4x7flUJU3YI3\n" +
  "Ub2uc+jl2Mbtxfoei5cbY6iAwsp+HyeKrdonVHtEd9mFutd468+vO7+rx/M80onc\n" +
  "fduNVf/GRR2McTOO4Ptm4s68clY0dyXMRLidQjydPPYNjuzs47DVxNK+tXGS7QSH\n" +
  "LuC7VO/YBXWqZNzvii1KeCEIePJfz06ywZFTdNxZt2USoudAgUMBvJg0cLKqQJFx\n" +
  "p62Pez6aWC0lV9yDPHpUwp+RfrNiP213vKObnQIDAQABAoIBAQCf//KBWiirjzKC\n" +
  "m35vnB8+RwBbpp0f0Rn+OL8ZFZispsueX3oy38r/rfW3unnjZIja3UfcnBi7CfnZ\n" +
  "1a09eKr4ZADTcHz1GADkUJYkaaUqtyQS1Hl8Y9fLQwGuGY8xs8lqiRmhUXkNDyGy\n" +
  "CFvZKX3T1B6kw+FuZ2GQ56S6hCIGJApRCaIfMsBMlUPogJIh+oV5+13ft5EDvTFo\n" +
  "IDAb9YZQk+sp0sc38g3MIhqVAl7lqqpowFF5FnS4cRTcSIC1Wc5+R73LDRtNghQc\n" +
  "1kAFdM8aiw/dii2huGE+bRz3bjlCW6SOlsSPKOgvqFxVoJ/qjqkfytm1Platx4Ys\n" +
  "zAqr4EQBAoGBAOX3FUgUnoqybKOoa6ouSgFXmcADB6jLiXcPOxEg6JadBKSsI0Fx\n" +
  "YmqgRK7ddKVaiDmAgdL7RJQ4zyCyeFuGomr796ilsswORDucjNBNVKoxmea58ww+\n" +
  "c5pOXccDuiFR32/5hz0pwcmiIYg9tPVpFUMgiPBpjjhNPSajOSE1HJTlAoGBAMbK\n" +
  "oJTKhmT+/73BpTY8KSMAYSEbHX/uchsiFd+RlQDmHZ9KGd914UI8hGW4yOBmcvmi\n" +
  "u6Yjz5JT6ARqKNkhorbz9FvYhYGjDbLIIHxaDs/6vXOCs/ba3oAnHTFa7cQ5qMle\n" +
  "oyndAf4aVPY105yP2SlOW7oBoUUwxaqSOEgOPvhZAoGAMJBNXjt8f63OY4Fdu0Kr\n" +
  "Pj1Rqsr5Axx4mzwMLUHV3HisUlpH17oqHnpaBtOdno3P1tTclcGaafLVSwJliG6W\n" +
  "PiGX23WinJUms7ALzLGH/6kZ5y+9tAg8QYnrI+wVkpPHq832UWRQGFS04CCn5mua\n" +
  "oeJtCNhBwIIPN+mgVvLwZkECgYEAnWlgJNIF/71oVyMapsqWrG+leeiVwHLZCiFA\n" +
  "fssx2Qde135+5FLcr21qTX44GnElhAVXX+SlfjJQ3AYQGHeo+ARPL9dRSGkL9NDB\n" +
  "4JYTep8LG4eY59VCMOpIFIfzFNmvjN0SiJjH9iV1t4zB5wyFIk85FR4rTLWlID8u\n" +
  "r+gP9ukCgYEA3Z8WmO3NKk+eQMo2HcpJhgKl6LcliAFW1pa7Fbnu+lyNKhWQYzQP\n" +
  "ltp+HZluqeMrmtiiB33J9fYLIC4oXgEi/1UfPc0mpPRERYC8s5A4GKTdQFFoMn5v\n" +
  "wc4dnTdfBxKBacAoUWUZcRuipcgkkUQAQZxqUnGkGZQHf8UFjEzHD5k=\n" +
  "-----END RSA PRIVATE KEY-----"

describe("rsaSignature", () => {
  test("as query string", async () => {
    const path : string = "/public/api/ver1/users/change_mode";
    const queryString : string = "mode=paper"
    expect(rsaSignature(PRIVATE_KEY, path, {queryString})).toBe("W+a26NiV6KkWP5zWoaDU9nSHmfObAtbbaq+xPIKwiKIz81Mlgrek/Z51qsAWNXEMCpIGW40IYDo7BTq4FSvOVSxdfrFK3lRqBveoXW+/50QOd3p+fDe5Ku7Z0U6MvXSUeFOguMBxP7er1SLGOb5RLYI/2GPMI5txLAoSsTLjGkWOc7S3ZhUpxEfxSCp8wCFp6E99biIX2MhIT1/AAl290ID76Wr1dj9Y3QxIl6KtQlbpEqhvWBaadYaYyZR5YjHAn5NWAE2cvxLkH+SQE1khzAdB6T9ZJ9sgMtY1bOzTTV/Cj9W0SABCYr4In12+uFY0lB+ANvgi8hLr2NCl775Wdw==")
  })

  test("As a raw json", async () => {
    const path : string = "/public/api/ver1/users/change_mode";
    const requestBody : string = '{"mode": "paper"}';
    expect(rsaSignature(PRIVATE_KEY, path, {requestBody})).toBe("EEVNxc6DLLb6PVNzc3jeNkVXVIfgHJVrfLws4Hm7wynLTLlDe6QpwPmOeT/5lAZDsft+sIN0nwo4SBNKmkea6mtxkcVz/8BuP3rhQVeGhRn3lAGy/nacsP35B50IMDx+ge1tnkjGGL4IbjtbfP5v+UVLMpJpWfVzQGlWpyLEL6PHAu7cuYs5Ug8lbfq4zgrpl1tSmemNVAedU4D4qYE/LaPB/z/urzoFYQZzobZbnXpLh4MRLaTjUgTNuiJawpk+j0K7Xk2AvHt+gY1TNOCmbRvjaP+ihgzZA0m4h32s7EdGMznI55C4CVftKQRVIfyR6TIifoljCG5nNJNZtTj98Q==")
  })
})
