const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

const authorizeRoles = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.Role || !requiredRoles.includes(req.user.Role.roleName)) {
            return res.sendStatus(403);
        }
        next();
    };
};
const authorizeRole = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.Role || req.user.Role.roleName !== requiredRoles) {
            return res.sendStatus(403);
        }
        next();
    };
};
module.exports = { authorizeRoles,authorizeRole };
