const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true

});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  
  .get('/login', async (req,res)=>{
    try{
      const client = await pool.connect()
      var query = "select * from users where username=($), password=($)";
      var info = [req.query.username, req.query.password];
      await client.query(query, info, function(err, result){
        if (err||!result.rows[0]){
          console.log("Query error: " + err );
          // res.send("Query error: " + err);
          res.render('pages/error',{message:"Username or password incorrect"})
      	}
        else {
          client.release();
          console.log("login succeed")
          // res.send("Insert succeed.")
          res.render('pages/HomePage',{myUser:result})
        }
        res.end()
      })
    } catch (err){
      console.error(err);
      // res.send("DB connection error: " + err );
      res.render('pages/error',{message:""+err})
    }
  })

  

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
