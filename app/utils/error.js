const NOT_FOUND = (res) => res.status(404).send('Not Found')
const BAD_REQUEST = (res) => res.status(400).send('Bad Request')


module.exports = {
    NOT_FOUND,
    BAD_REQUEST
}