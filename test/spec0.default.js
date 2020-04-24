process.env.NODE_ENV = 'test';
const app = require('../app'),
    expect = require('chai').expect,
    supertest = require('supertest'),
    server = app.listen(),
    api = supertest(server);

describe('#INDEX', () => {
    describe('GET', () => {
        it('index route should be defined', (done) => {
            api.get('/')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res)  => {
                if (err) throw err;
                expect(res.body).to.have.property('msg');
                expect(res.body.msg).equal('server up and running')
                done()
            })
        });
        it('when no route match expect 404 fallback error route', (done) => {
            api.get('/test')
            .expect(404)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if(err) throw err;
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.be.an('array')
                expect(res.body.errors[0]).to.have.property('location')
                expect(res.body.errors[0].location).equal('route')
                expect(res.body.errors[0]).to.have.property('msg')
                expect(res.body.errors[0].msg).equal('Não encontrado')
                expect(res.body.errors[0]).to.have.property('param')
                expect(res.body.errors[0].param).equal('/test')
                done();
            })
        })
    });
});