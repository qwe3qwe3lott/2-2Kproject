const user = require('../db').user;

const getAllUsers = function (req, res) {
    user.findAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err
            })
        })
}

const addUser = async function (req, res) {
    let data = req.body;
    if (data.login == null)
        res.status(500).end('Не указан логин');
    else if (await existLogin(data.login.toString()))
        res.status(500).end('Логин уже занят');
    else {
        user.create({
            login: data.login
        })
            .then(result => {
                console.log('Пользователь добавлен');
                res.status(200).end('Пользователь добавлен');
            })
            .catch(err => {
                console.log(err);
                res.status(500).end('error');
            })
    }
}

const existLogin = login =>
    user.count({ where: { login } })
        .then(count => {
            return count === 1;
        })

module.exports = {
    getAllUsers,
    addUser
}