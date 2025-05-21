const isAdminRole = (req, res, next) => {
    if (!req.authenticatedUser) {
        return res.status(500).json({
            msg: 'Token validation is required before checking the role'
        });
    }

    const { role, name } = req.authenticatedUser;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not an admin - cannot perform this action`
        });
    }

    next();
}

const hasRole = (...roles) => {

    return (req, res, next) => {

        if (!req.authenticatedUser) {
            return res.status(500).json({
                msg: 'Token validation is required before checking the role'
            });
        }
        if (!roles.includes(req.authenticatedUser.role)) {
            return res.status(401).json({
                msg: `The service requires one of these roles: ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}