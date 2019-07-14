const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const cookieParser
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true

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
      var info = [req.query.email, req.query.password];
      await client.query(query, info, async function(err, result){
        if (err||!result.rows[0]){
        	console.log("Query error: " + err )
          console.log(result.rows[0] )
          /*do something if Username or password incorrect
          res.send("Query error: " + err);
          */
          res.render('pages/error',{message:"E-mail or password incorrect"})
      	}
        else {
          console.log("signin succeed")
          // res.send("Insert succeed.")
          if(result.rows[0].isadmin){
            query = "select * from users"
            const result = await client.query(query)
            	console.log('admin:',info[0])
              //console.log('allusers:',result2)
              const results = { 'results': (result) ? result.rows : null};
              res.render('pages/homepage_admin',results)

          }
          else{
          	console.log("user:",result.rows[0].username)
            res.redirect('/homepage.html')
          }
          client.release();
        }
        res.end()
      })
    } catch (err){
      console.error(err);//database not connected
      // res.send("DB connection error: " + err );
      res.render('pages/error',{message:"Database connection fail"})

    }
  })

  .get('/signup', async (req,res)=>{
    try{
      const client = await pool.connect()
      var query = "insert into users values($1, $2, $3, FALSE) ";
      var info = [req.query.username, req.query.password, req.query.email];
      await client.query(query, info, function(err, result){
        if (err){
          console.log("Query error: " + err );
          /*do something if username exist
          // res.send("Query error: " + err);
          */
          res.render('pages/error',{message:"E-mail already exist"})
      	}
        else {
          console.log("signup succeed")
          var userinfo = {username:req.query.username, password:req.query.password, email:req.query.email, isadmin:false}
          res.redirect('homepage.html')
          client.release();
        }
        res.end()
      })
    } catch (err){
      console.error(err);//database not connected
      res.render('pages/error',{message:"Database connection fail"})
    }
  })


  .get('/logout', async (req,res)=>{
      console.log('temp_nothing')
    })




  .get('/database', async(req,res)=>{
    try{
      const client = await pool.connect()
      var query = "select * from users";
      info = []
        if (err||!result.rows[0]){
          console.log("Query error: " + err )
          console.log(result.rows[0])
          res.redirect('index.html')
        }
        else {
            query = "select * from users"
            await client.query(query, [], function(err2, result2){
              console.log('admin:',info[0])
              res.render('homepage_admin',{allUsers:result.rows})
            })

          client.release();
        res.end()
        }
    } catch (err){
      console.error(err);
      res.render('pages/error',{message:"Database connection fail"})
    }

  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
