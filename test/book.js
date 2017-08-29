process.env.NODE_ENV ='test';

let mongoose = require("mongoose");
let Book = require("../models/Book");


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);


describe('Books', () => {

  describe('/GET books', () => {

     it('it should GET all the books', (done) => {
       chai.request(server)
          .get('/books')
          .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(4);
            done();
          });
     });
  });

  describe('/POST book', ()=> {
    it('it should not POST book without pages field', (done) => {
       let book = {
         title: "My text book 1",
         author: "Tariqul islam",
         year: 1990
       };

       chai.request(server)
          .post("/books")
          .send(book)
          .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('pages');
            res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });


    });
  });
});
