module.exports = {
    /** 200 CODES */
    EVENT_DELETED: (res) => res.status(204).end(),
    EVENT_CREATED: (res, event) => res.status(201).json(event),
    EVENT_UPDATED: (res, event) => res.json(event),

    /** 400 CODES */
    BAD_REQUEST: (res, msg) => res.status(400).send(`Bad Request${msg ? `: ${msg}` : ''}`),
    UNAUTHORIZED: (res) => res.status(401).send('Unauthorized'),
    INVALID_TOKEN: (res) => res.status(401).send('Unauthorized: token missing or invalid'),
    INVALID_LOGIN: (res) => res.status(401).send('Unauthorized: invalid user or password'),
    TOKEN_EXPIRED: (res, at) => res.status(401).send('Unauthorized: token expired at ' + at),
    INVALID_ROLE: (res) => res.status(403).send('Forbidden: unauthorized role'),
    NOT_FOUND: (res) => res.status(404).send('Not Found'),
    CONFLICT: (res, msg) => res.status(409).send('Conflict: ' + msg),
    
    /** 500 CODES */
    INTERNAL_SERVER_ERROR: (res, err) => res.status(500).send('Internal Server Error: ' + err),
    BAD_GATEWAY: (res) => res.status(502).send('Bad Gateway')
}
