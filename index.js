const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //ssl: true

});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))

  .get('/signin', async (req,res)=>{
    try{
      const client = await pool.connect()
      var query = "select * from users where email=($1) and password=($2)";
      var info = [req.query.username, req.query.password];
      await client.query(query, info, async function(err, result){
        if (err||!result.rows[0]){
        	console.log("Query error: " + err );
          /*do something if Username or password incorrect
          res.send("Query error: " + err);
          res.render('pages/error',{message:"Username or password incorrect"})
          */
      	}
        else {
          console.log("signin succeed")
          // res.send("Insert succeed.")
          if(result.rows[0].isadmin){
            query = "select * from users"
            await client.query(query, [], function(err2, result2){
            	console.log('admin:',info)
              	console.log('allusers:',result2)
              //res.render('pages/HomePage_Admin',{myAdmin:result.rows[0], allUsers:result2.rows})
            })
          }
          else{
          	console.log("user:",result.rows[0])
            //res.render('pages/HomePage',{myUser:result.rows[0]})
          }
          client.release();
        }
        res.end()
      })
    } catch (err){
      console.error(err);//database not connected
      // res.send("DB connection error: " + err );
      //res.render('pages/error',{message:""+err})
    }
  })

  .get('/signup', async (req,res)=>{
    try{
      const client = await pool.connect()
      var query = "insert into users values($1, $2, $3, FALSE) ";
      var info = [req.query.username, req.query.password, req.query.email];
      await client.query(query, info, function(err, result){
        if (err){
          /*do something if username exist
          console.log("Query error: " + err );
          // res.send("Query error: " + err);
          */
      	}
        else {
          console.log("signup succeed")
          //res.render('pages/HomePage',{myUser:info})
          client.release();
        }
        res.end()
      })
    } catch (err){
      console.error(err);//database not connected
      //res.render('pages/error',{message:""+err})
    }
  })


  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
