const verifyInternalAccess = (req, res, next) => {
    const receivedSecret = req.headers['x-internal-secret'];
    console.log("sec:", receivedSecret);
    const validSecret = process.env.INTERNAL_SERVICE_SECRET;

    if (!receivedSecret || receivedSecret !== validSecret) {
        return res.status(403).json({ message: "Forbidden: Invalid Internal Secret" });
    }
    next();
};

module.exports = verifyInternalAccess;