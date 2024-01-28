const express  = require("express");
const bodyParser = require('body-parser');

const db = require('./db')

const app = express();

app.use(bodyParser.json());

//tbl 생성
db.pool.query(`CREATE TABLE list(
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`, (err, results, fields)=>{
    console.log('results',results)
})



//DB lists 테이블에 있는 모든 데이터를 프론트 서버에 보내주기
app.get('/api/values', function(req,res){
    //데이터베이스에서 모든 정보 가져오기
    db.pool.query('SELECT * FROM lists;',
        (err, results,field) => {
            if(err)
                return res.status(500).send(err)
            else
                return res.json(results)
    })
})

//입력 값 lists에 넣기
app.post('/api/value',function(req, res, next){
    //데이터베이스에 값 넣어주기
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err,results,fields)=>{
        if(err)
        return res.status(500).send(err)
        else
        return res.json({success: true, value: req.body.value })
    })
})

app.listen(5000,()=>{
    console.log('애플리케이션이 5000번 포트에서 시작되었습니다.')
})