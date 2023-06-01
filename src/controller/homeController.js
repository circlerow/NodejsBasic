import pool from "../config/connectDB";


let getHomepage = async (req, res) => {


    const [rows, fields] = await pool.execute('SELECT * FROM users');


    return res.render('index.ejs', { dataUser: rows });
}
let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let user = await pool.execute(`select * from users where id = ?`, [userId]);
    console.log("ok", user);
    return res.send(JSON.stringify(user[0]))
}
let createNewUser = async (req, res) => {
    console.log("check:", req.body);
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('insert into users(firstName,lastName, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address]);
    return res.redirect('/');
}
module.exports = {
    getHomepage, getDetailPage, createNewUser
}