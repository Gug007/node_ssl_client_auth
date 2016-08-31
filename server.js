const https = require('https')
const fs = require('fs')

const PORT  = 3008
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const CERT_PATH = 'cert2/'

const getFile = filename => fs.readFileSync(CERT_PATH + filename)

const send = (res, message) => {
  res.end(message);
  console.log(message);
}

const options = {
  key: getFile('server.key'),
  cert: getFile('server.crt'),
  ca: getFile('ca.crt'),
  passphrase: 'qwerty',
  requestCert: true,
  rejectUnauthorized: false
};

const server = https.createServer(options, (req, res) => {
  console.log(req.client.authorized)
  req.client.authorized
    ? send(res, SUCCESS)
    : send(res, FAILURE)
})

server.listen(PORT, () => console.log(`listen port: ${PORT}`));