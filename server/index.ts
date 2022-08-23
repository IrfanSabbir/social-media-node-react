import 'dotenv/config'
import express, { Express, Request, Response }  from 'express'
import mysql from 'mysql2'
const app: Express = express();

//mysql setting
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'docker',
  password: 'docker',
  database: 'test'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql_murmurs: string = `CREATE TABLE IF NOT EXISTS murmurs\
      (id int NOT NULL AUTO_INCREMENT primary key,\
      text varchar(255) NOT NULL,\
      like_count int DEFAULT 0,\
      creator int NOT NULL)`;
  connection.query(sql_murmurs, function (err, result) {
    if (err) throw err;
  });
  
  let sql_follow: string = `CREATE TABLE IF NOT EXISTS follow\
      (id int NOT NULL AUTO_INCREMENT primary key,\
      followed_to int NOT NULL,\
      followed_by int NOT NULL)`;
  connection.query(sql_follow, function (err, result) {
    if (err) throw err;
    // console.log('created')
  });
  
  let sql_like: string = `CREATE TABLE IF NOT EXISTS like_murmurs\
    (id int NOT NULL AUTO_INCREMENT primary key,\
    user_id int NOT NULL,\
    post_id int NOT NULL)`;
  connection.query(sql_like, function (err, result) {
  if (err) throw err;
  });


  // connection.query('SELECT * FROM user;', function (err, result) {
  //   if (err) throw err;
  //   console.log("Result: " + JSON.stringify(result, null, 2));
  // });
});

//cors setting
app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*")
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")//
 next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


import murmursRoute from './router/murmurs';
import userRoute from './router/user';
// Get example
const router: express.Router = express.Router()

app.use('/api/murmurs', murmursRoute);
app.use('/api/me', userRoute);


//Post example
router.post('/api/postTest', (req: Request, res: Response) => {
  res.send({ hello: 'world' })
})

app.use(router)

app.listen(3001, () => { console.log('Example app listening on port 3001!') })
