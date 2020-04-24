process.env.NODE_ENV = 'test';

const fs = require('fs')
const nock = require('nock')
const expect = require('chai').expect
const app = require('../app')
const supertest = require('supertest')        
const content = fs.readFileSync('./test/mocked/openexchange.json')
server = app.listen()
api = supertest(server)

describe('#COTAÇÃO', () => {
    describe('GET', () => {
        it('cotacao should return with success with default response', (done) => {
            const parsedContent = JSON.parse(content)
            //nock mocka a chamada ao endpoint: https://openexchangerates.org/api/latest.json?app_id=<OPENEXCHANGEAPITOKEN>
            nock('https://openexchangerates.org/api/')
            .get(`/latest.json?app_id=${process.env.OPENEXCHANGEAPITOKEN}`)
            .reply(200, parsedContent)
            api.get('/cotacao')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res)  => {
                if (err) throw err;                
                expect(res.body).to.have.property('disclaimer')
                expect(res.body.disclaimer).equal('Usage subject to terms: https://openexchangerates.org/terms')
                expect(res.body).to.have.property('license')
                expect(res.body.license).equal('https://openexchangerates.org/license')
                expect(res.body).to.have.property('timestamp')
                expect(res.body.timestamp).equal(1584540000)
                expect(res.body).to.have.property('base')
                expect(res.body.base).equal('USD')
                expect(res.body).to.have.property('rates')
                done()
            })
        });
        it('Index should return default error if fallback fail', (done) => {
            //nock mocka a chamada ao endpoint, dessa vez retornando o erro 500: https://openexchangerates.org/api/latest.json?app_id=<OPENEXCHANGEAPITOKEN>
            nock('https://openexchangerates.org/api/')
            .get(`/latest.json?app_id=${process.env.OPENEXCHANGEAPITOKEN}`)
            .replyWithError({
                message: 'Houve um erro ao acessar a api do open exchange.',
                code: 500,
            })
            api.get('/cotacao')
            .expect(500)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res)  => {
                if (err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('location')
                expect(res.body.errors[0].location).equal('cotacao')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('Houve um erro ao acessar a api do open exchange.')
                expect(res.body.errors[0]).to.have.property('param')
                expect(res.body.errors[0].param).equal('openexchangerates')
                done()
            })
        });
    });
});