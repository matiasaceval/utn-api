const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
}

const cors = (req, res, next) => {
    res.set(headers)
    next()
}

module.exports = cors
