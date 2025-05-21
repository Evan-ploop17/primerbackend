const validateJWT = require("../middleware/validateJWT")
const validateRoles = require("../middleware/validateRoles")
const validateFields = require("../middleware/validateFields")

module.exports = {
    ...validateJWT,
    ...validateRoles,
    ...validateFields
}

