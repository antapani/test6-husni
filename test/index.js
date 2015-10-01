// Load modules

var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('Test 6 test', function (){

    it ('should load plugin', function (done) {
        var server = new Hapi.Server();
        server.connection();
        server.register(require('../'), function(err) {

            expect(err).to.not.exist();
            done();
        });
    });

    it ('should get ready from server', function (done){
         var server = new Hapi.Server();
         server.connection();
         server.register(require('../'), function (err){

             expect(err).to.not.exist();

              var request = {
                   method: 'GET',
                   url: '/ping'
              };

              server.inject(request, function(res){

                  expect(res.statusCode).to.equal(200);
                  done();
              })
         })
    });

    it('should get reply from server', function (done) {
         var server = new Hapi.Server();
         server.connection();
         var options = {
            register: require('../'),
            options: {
                 prefix: '*'
            }
         };
         server.register(options, function(err) {
             expect(err).to.not.exist();
             var request = {
                  method: 'GET',
                  url: '/ping',
             };

             server.inject(request, function(res) {
                  console.log(res.result);
                  expect(res.result.ping).to.equal(options.options.prefix + ' pong');
                  //expect(res.statusCode).to.equal(200);
                  done();
             });
         });
    });

});
