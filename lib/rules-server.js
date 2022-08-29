const http = require('http')
const https = require('https')

function rulesServer(server, options) {
  server.on('request', (req, res) => {
    const originalReq = req.originalReq
    const ruleValue = originalReq.ruleValue
    const url = new URL(/^\w+:\/\//.test(ruleValue) ? ruleValue : '//' + ruleValue, originalReq.url)
    let request
    if (url.protocol === 'https:') {
      request = https.request(url, { method: 'HEAD' }, () => {
        res.end(`${originalReq.pattern} ${url.href}`)
      })
    } else if (url.protocol === 'http:') {
      request = http.request(url, { method: 'HEAD' }, () => {
        res.end(`${originalReq.pattern} ${url.href}`)
      })
    } else {
      res.end(`${originalReq.pattern} ${url.href}`)
      return
    }
    request.on('error', () => {
      res.end()
    })
    request.end()
  })
}

module.exports = rulesServer
