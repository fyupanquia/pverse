const secret =  process.env.SECRET || "pverse";

module.exports = {
    secret
}

/*
{
  "sub": "1234567890",
  "permissions": [
     "metrics:read"
  ],
  "username":"pverse",
  "iat": 1516239022
}
*/