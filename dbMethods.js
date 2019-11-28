module.exports = {
    runSQL: function runSQL(sql) {
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
        })
    },
    runSQL: function runSQL(sql, post) {
        db.query(sql, post, (err, result) => {
            if(err) throw err;
            console.log(result);
        })
    }
}