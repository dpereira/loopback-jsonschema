require('../../support');

var expect = require('chai').expect;
var loopback = require('loopback');

var loopbackJsonSchema = require('../../../index');
var JsonSchema = require('../../../lib/models/json-schema');
var LJSRequest = require('../../../lib/models/ljs-request');

var app = loopback();

describe('JsonSchema', function() {
    beforeEach(function() {
        loopbackJsonSchema.initLoopbackJsonSchema(app);
    });

    describe('.findOne', function() {
        beforeEach(function(done) {
            JsonSchema.create({modelName: 'test'}, function() {
                done();
            });
        });

        it('should have $schema', function() {
            JsonSchema.findOne({where: {modelName: 'test'}}, function(err, jsonSchema) {
                if (err) {
                    console.log(err);
                }
                expect(jsonSchema.$schema).to.exist;
            });
        });
    });

    describe('.create', function() {
        it('should set $schema', function() {
            JsonSchema.create({modelName: 'test'}, function(err, jsonSchema) {
                if (err) {
                    console.log(err);
                }
                expect(jsonSchema.$schema).to.exist;
            });
        });

        it('should create model defined by the json schema provided', function() {
            JsonSchema.create({modelName: 'test'}, function(err) {
                if (err) {
                    console.log(err);
                }
                expect(loopback.getModel('test')).to.exist;
            });
        });
    });

    describe('#createLoopbackModel', function() {
        var Test;

        beforeEach(function() {
            var jsonSchema = new JsonSchema({modelName: 'test', collectionName: 'testplural'});
            jsonSchema.createLoopbackModel(app);
            Test = loopback.getModel('test');
        });

        it('should create model defined by this json schema', function() {
            expect(Test).to.exist;
        });

        it("should use collectionName as model's plural", function() {
            expect(Test.pluralModelName).to.equal('testplural');
        });
    });

    describe('.registerLoopbackModelForCollection', function() {
        beforeEach(function() {
            this.sinon.stub(console, 'info');
            this.sinon.stub(console, 'warn');
        });

        it('should register loopback model for an existing collection JSON schema', function(done) {
            var jsonSchema = JsonSchema.create({ modelName: 'person', collectionName: 'people' });

            var next = function() {
                var Person = loopback.getModel('person');
                expect(Person).to.not.be.null;
                expect(Person.definition.name).to.equal('person');
                expect(Person.definition.settings.plural).to.equal('people');
                done();
            };
            JsonSchema.registerLoopbackModelForCollection('people', app, next);

            JsonSchema.remove({ modelName: 'person' });
        });

        it('should log when collection JSON schema was not found', function(done) {
            var next = function() {
                expect(console.warn).to.have.been.calledWith('JSON Schema for collectionName', 'people', 'not found.');
                done();
            };

            JsonSchema.registerLoopbackModelForCollection('people', app, next);
        });
    });

    describe('.findByCollectionName', function() {
        beforeEach(function() {
            var req = { body: {}, url: '/people/alice' };
            this.ljsReq = new LJSRequest(req);

            this.sinon.stub(console, 'info');
            this.sinon.stub(console, 'warn');
        });

        it('should find JsonSchema collection by name and execute provided callback', function(done) {
            var jsonSchema = JsonSchema.create({ modelName: 'person', collectionName: 'people' });

            var callback = this.sinon.spy();
            var next = function() {
                expect(callback).to.have.been.called;
                done();
            };

            JsonSchema.findByCollectionName(this.ljsReq, next, callback)

            JsonSchema.remove({ modelName: 'person' });
        });

        it('should log when collection JSON schema was not found', function(done) {
            var next = function() {
                expect(console.warn).to.have.been.calledWith('JSON Schema for collectionName', 'people', 'not found.');
                done();
            };

            JsonSchema.findByCollectionName(this.ljsReq, next, null);
        });
    });
});
