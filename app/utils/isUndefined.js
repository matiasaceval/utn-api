module.exports = (resource) => {
    return (
        resource === undefined ||
        resource === null ||
        (Array.isArray(resource) && resource.length === 0)
    )
}
