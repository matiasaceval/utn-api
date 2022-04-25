const headers = {
    Connection: 'close',
    'Accept-Patch': 'text/example; charset=utf-8',
    'Content-Language': 'es',
    'Cache-Control': 'public, max-age=600'
}

const customHeaders = (req, res, next) => {
    res.set(headers)
    next()
}

module.exports = customHeaders
