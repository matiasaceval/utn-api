module.exports = {
    /** Client side */
    NOT_FOUND: (res) => res.status(404).send('Not Found'),
    BAD_REQUEST: (res) => res.status(400).send('Bad Request'),
    UNAUTHORIZED: (res) => res.status(401).send('Unauthorized'),
    
    /** Server side */
    BAD_GATEWAY: (res) => res.status(502).send('Bad Gateway'),
    INTERNAL_SERVER_ERROR: (res, err) => res.status(500).send('Internal Server Error: ' + err),
    
    /** Custom ones */
    INVALID_ROLE: (res) => res.status(403).send('Forbidden: unauthorized role'),
    INVALID_TOKEN: (res) => res.status(401).send('Unauthorized: token missing or invalid'),
    INVALID_LOGIN: (res) => res.status(401).send('Unauthorized: invalid user or password'),
    TOKEN_EXPIRED: (res, at) => res.status(401).send('Unauthorized: token expired at ' + at),

}
