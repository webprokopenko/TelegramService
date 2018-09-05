const jwt = require('jsonwebtoken');
const authUser = function (body) {
    const usersList = require('./config/config.json').servers;
    return new Promise((resolve, reject) => {
        for (var index in usersList) {
            if (body.login === usersList[index].login && body.psw === usersList[index].psw)
                resolve({
                    email: body.login,
                })
        }
        reject(new Error('User not exist'));
    })
}
exports.sign_in = async function (body, expiresIn) {
    try {
        let user = await authUser(body)
        let token = jwt.sign(
            user,
            'secret key',
            { expiresIn: expiresIn }
        )
        return ({ token: token });
    } catch (error) {
        throw new Error(error);
    }
};
const getUserFromHead = function (req) {
    return new Promise((resolve, reject) => {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            jwt.verify(req.headers.authorization.split(' ')[1], config.secret_key, function (err, decode) {
                if (err) reject((new Error('Unauthorized user')));
                resolve(decode);
            })
        }
    });
}