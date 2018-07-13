process.env.NODE_ENV ='test';

const Admin = require('../models').Admin;


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

describe('Admin Operations', () => {
  let token = null;
  describe('/POST Admin', ()=> {
    it('it should not POST the admin to register', (done) => {
       let admin = {
         firstName: "Tariqul",
         lastName: "islam",
         email: "tariqul.islam.rony@gmail.com",
         "password": "Pass1234"
       };

       chai.request(server)
          .post("/admin/register")
          .send(admin)
          .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('code');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('Admin Registration is successfull.');
            done();
          });
    });
  });

  describe('/PUT Admin', () => {
   
    it('it should authenticate the admin for login', (done) => {
     let admin = {
       email: "tariqul.islam.rony@gmail.com",
       "password": "Pass1234"
     };
      chai.request(server)
         .put('/admin/authenticate')
         .send(admin)
         .end((err,res) => {
           res.should.have.status(200);
           res.body.should.be.a('object');
           res.body.should.have.property('token');
           token = res.body.token;
          // res.body.length.should.be.eql(4);
           done();
         });
    });
 });

 describe('/GET Token', () => {
    it('it should create token from admin', (done) => {
      let newToken = token;
      chai.request(server)
          .get('/api/invite/code/generate')
          .set('x-access-token', newToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('code').eql(200);
            res.body.should.have.property('generateCode');
            done();
          });
    });
 });
});
