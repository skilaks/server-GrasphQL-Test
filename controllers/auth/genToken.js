const jwt = require('jsonwebtoken')

const genToken = {
    genTokenForLogin: function (nationalCode) {
        return token = jwt.sign({ nationalCode: nationalCode }, "qweRtyin45820@3$%^&*-");
    }
}
module.exports = genToken;