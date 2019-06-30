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

  .get('/signin', async (req,res)=>{
    try{
      const client = await pool.connect()
      var query = "select * from users where username=($), password=($)";
      var info = [req.query.username, req.query.password];
      await client.query(query, info, function(err, result){
        if (err||!result.rows[0]){
          /*do something if Username or password incorrect
          console.log("Query error: " + err );
          // res.send("Query error: " + err);
          res.render('pages/error',{message:"Username or password incorrect"})
          */
      	}
        else {
          console.log("signin succeed")
          // res.send("Insert succeed.")
          if(result.rows[0].isAdmin){
            query = "select * from users"
            await client.query(query, [], function(err2, result2){
              console.log(result2)
              res.render('pages/HomePage_Admin',{myAdmin:result.rows[0], allUsers:result2})
            }
          }
          else{
            res.render('pages/HomePage',{myUser:result.rows[0]})
          }
          client.release();
        }
        res.end()
      })
    } catch (err){
      console.error(err);//database not connected
      // res.send("DB connection error: " + err );
      res.render('pages/error',{message:""+err})
    }
  })

  .get('/signup', async (req,res)=>{
    try{
      const client = await pool.connect()
      var query = "insert into users values(username=($), password=($), question=($), answer=($), isAdmin=FALSE) ";
      var info = [req.query.username, req.query.password, req.query.question, req.query.answer];
      await client.query(query, info, function(err, result){
        if (err){
          /*do something if username exist
          console.log("Query error: " + err );
          // res.send("Query error: " + err);
          */
      	}
        else {
          console.log("signup succeed")
          res.render('pages/HomePage',{myUser:info})
          client.release();
        }
        res.end()
      })
    } catch (err){
      console.error(err);//database not connected
      // res.send("DB connection error: " + err );
      res.render('pages/error',{message:""+err})
    }
  })


  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
