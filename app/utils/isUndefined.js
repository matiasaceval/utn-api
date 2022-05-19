module.exports = (resource) => {
    return (
        resource === undefined ||
        resource === null ||
        resource === '' ||
        (Array.isArray(resource) && resource.length === 0) ||
        (typeof resource === 'object' && Object.keys(resource).length === 0) ||
        (typeof resource === 'string' && resource.match(/^ *$/))
    )
}
