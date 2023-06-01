import connection from "../config/connectDB";


let getHomepage = (req, res) => {
    let data = [];
    connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            console.log('Nice');
            console.log(results); // results contains rows returned by server
            data = results.map((row) => {
                return row;
            }
            )
            console.log('check data', JSON.stringify(data));
            res.render('index.ejs', { dataUser: data });
        }
    );

}

module.exports = {
    getHomepage
}