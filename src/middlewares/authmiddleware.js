const authMiddleware = (req, res, next) => {
    req.header('authorization') !== process.env.TOKEN ?
        next() :
        res.status(401).json({ "error": "No esta autorizado" })
}
module.exports = authMiddleware