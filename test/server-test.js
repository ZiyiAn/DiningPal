var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();

chai.use(chaiHttp);

describe('Users', function(){
  it('should give an array of user info when render HomePage', function(done){
    chai.request(server).get('/signin').end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });

  // it('should add a single user on POST /users', function(done){
  //   chai.request(server).get('/users').end(function(err, res){ // assume this gets array of all users
  //     var num_user = res.body.length;
  //
  //     chai.request(server).post('/users').send({'username':'tester','age':24})
  //       .end(function(err, res){
  //         var num_user2 = res.body.length; // assuming response contains user array
  //         (num_user2 - num_user).should.equal(1);
  //         done();
  //       });
  //   });
  // });
});
