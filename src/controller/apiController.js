import pool from "../config/connectDB";


let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.status(200).json({
        message: "get all users",
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    if (!firstName || !lastName || !email || !address) {
        return res.status(500).json({
            message: "missing input parameter",
            data: req.body
        })
    }

    await pool.execute('insert into users(firstName,lastName, email, address) values (?, ?, ?, ?)',
        [firstName, lastName, email, address]);
    return res.status(200).json({
        message: "create new user",
        data: req.body
    })


}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(500).json({
            message: "missing input parameter",
            data: req.body
        })
    }
    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?',
        [firstName, lastName, email, address, id]);
    return res.status(200).json({
        message: "update user",
        data: req.body
    })
}
let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(500).json({
            message: "missing input parameter",
            data: req.body
        })
    }
    await pool.execute('delete from users where id = ?', [userId]);
    return res.status(200).json({
        message: "delete user",
        data: req.body
    })
}

export default {
    getAllUsers, createNewUser, updateUser, deleteUser
}
