const user = require('../db').user;
const role = require('../db').role;
const getAllUsers = async function (req, res) {
    user.findAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Неизвестная ошибка' })
        })
}

const getAllRoles = async function (req, res) {
    role.findAll()
        .then(roles => {
            res.status(200).json(roles)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Неизвестная ошибка' })
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
            res.status(500).json({ message: 'Неизвестная ошибка' })
        })
}

const addUser = async function (req, res) {
    let data = req.body;
    if (data.login == null)
        res.status(422).json({ message: 'Не указан логин' });
    else if (data.hash == null)
        res.status(422).json({ message: 'Не указан хэш пароля' });
    else if (data.salt == null)
        res.status(422).json({ message: 'Не указана соль' });
    else if (data.roleId == null)
        res.status(422).json({ message: 'Не указан id роли' });
    else if (await existLogin(data.login.toString()).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Неизвестная ошибка' });
    }))
        res.status(422).json({ message: 'Логин уже занят' });
    else if (!await existRole(data.roleId).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Неизвестная ошибка' });
    }))
        res.status(422).json({ message: 'Не существует роли с таким id' });
    else {
        user.create({
            login: data.login,
            hash: data.hash,
            salt: data.salt,
            roleId: data.roleId
        })
            .then(result => {
                res.status(200).json({ message: 'Пользователь добавлен' });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Неизвестная ошибка' });
            })
    }
}

const deleteUser = async function (req, res) {
    let data = req.body;
    if (data.id == null)
        res.status(422).json({ message: 'Не указан id' });
    else {
        user.destroy({ where: { id: data.id } })
            .then(result => {
                res.status(200).json({ message: 'Пользователь удалён' });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Неизвестная ошибка' });
            })
    }
}

const existLogin = login =>
    user.count({ where: { login } })
        .then(count => {
            return count === 1;
        })

const existRole = roleId =>
    role.count({ where: { id: roleId } })
        .then(count => {
            return count === 1;
        })

module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    getUsersList,
    getAllRoles
}