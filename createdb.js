function runSQL(sql) {
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
    })
}

function createDB() {
    let sql = 'DROP DATABASE IF EXISTS restaurant471';
    runSQL(sql);

    sql = 'CREATE DATABASE restaurant471';
    runSQL(sql);

    console.log("Database created.");
}

module.exports = createDB;