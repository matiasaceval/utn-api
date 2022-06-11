module.exports = async (req, _, next) => {
    let { subscription } = req.body

    if (subscription != undefined && subscription.includes('[') && subscription.includes(']')) {
        subscription = subscription.substring(1, subscription.length - 1)
        subscription = subscription.split(',')
        subscription = subscription.map((item) => item.trim())
    } else if (subscription != undefined) {
        subscription = [subscription]
    }

    req.body.subscription = subscription

    next()
}