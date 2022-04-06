const headers = {
    Connection: 'close',
    'Accept-Patch': 'text/example; charset=utf-8',
    'Content-Language': 'es'
}

const customHeaders = (req, res, next) => {
    res.set(headers)
    next()
}

module.exports = customHeaders
