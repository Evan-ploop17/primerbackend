exports.getUsers = (req, res) => {
    res.json({
        msg: 'get user from controller'
    })
}
exports.putUsers = (req, res) => {
    res.json({
        msg: 'put '
    })
}

exports.postUsers = (req, res) => {
    const { body } = req
    res.json({
        msg: 'post',
        body
    })
}

exports.deleteUsers = (req, res) => {
    res.json({
        msg: 'delete'
    })
}

exports.patchUsers = (req, res) => {
    res.json({
        msg: 'patch '
    })
}