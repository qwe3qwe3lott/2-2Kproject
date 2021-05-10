const user = require('../db').user;
const role = require('../db').role;
const getAllUsers = async function (req, res) {
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

const getUsersList = async function (req, res) {
    user.findAll( { attributes: ['id', 'login'], include: { model: role, attributes: ['role'] }, raw: true } )
        .then(users => {
            users = JSON.parse(JSON.stringify(users).split('"role.role":').join('"role":'));
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
    else if (data.hash == null)
        res.status(500).end('Не указан хэш пароля');
    if (data.salt == null)
        res.status(500).end('Не указана соль');
    if (data.roleId == null)
        res.status(500).end('Не указан id роли');
    else if (await existLogin(data.login.toString()))
        res.status(500).end('Логин уже занят');
    else if (!await existRole(data.roleId))
        res.status(500).end('Не существует роли с таким id');
    else {
        user.create({
            login: data.login,
            hash: data.hash,
            salt: data.salt,
            roleId: data.roleId
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

const deleteUser = async function (req, res) {
    let data = req.body;
    if (data.id == null)
        res.status(500).end('Не указан id');
    else {
        user.destroy({
            where: {
                id: data.id
            }
        })
            .then(result => {
                console.log('Пользователь удалён');
                res.status(200).end('Пользователь удалён');
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

const existRole = role_id =>
    role.count({ where: { id: role_id } })
        .then(count => {
            return count === 1;
        })

module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    getUsersList
}