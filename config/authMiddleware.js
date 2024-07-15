const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const { SCRETKEY } = process.env;

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SCRETKEY, async (err, user) => {
        if (err) return res.sendStatus(403);

        try {
            const foundUser = await User.findByPk(user.uid, {
                include: [{ model: Role }]
            });

            if (!foundUser) {
                return res.sendStatus(404);
            }

            req.user = foundUser;
            next();
        } catch (error) {
            console.error("Error fetching user:", error);
            res.sendStatus(500);
        }
    });
};

module.exports = authenticateToken;
