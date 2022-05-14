const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
}

const cors = (_, res, next) => {
    res.set(headers)
    next()
}

module.exports = cors
