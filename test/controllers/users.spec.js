const { expect } = require('chai')
const request = require('supertest');
const app = require('../../app');
const users = require('../../app/controllers/users')

describe('TESTES DE SUCESSO...', () => {
    describe('Testando funções...', () => {
        let username;
        let password;
        before(() => {
            username = 'hudsonleao';
            password = '123'
        })
        describe('isValid', () => {
            it('Teste na função isValid', async () => {
                const User = users(app);
                const response = await User.isValid(username, password)

                expect(response).to.equal(true)
            })
        })
    });

    describe('Testando rotas...', () => {
        describe('/login', () => {
            it('Teste na rota de login', async () => {
                const response = await request(app)
                    .post('/login')
                    .send({ username: "hudsonleao", password: "123" })
                    .expect(200)

                expect(response.body.message).to.equal('Valid user, username: hudsonleao')
            })
        })
    })
    describe('/api/users', () => {
        it('Teste na rota de usuários', async () => {
            const response = await request(app)
                .get('/api/users')
                .expect(200)

            expect(response.body.data.length).not.equal(0);
        })
    })
    describe('/api/users/:username', () => {
        it('Teste na rota de login com username e password vazio', async () => {
            const username = 'hudsonleao'
            const response = await request(app)
                .get(`/api/users/${username}`)
                .expect(200)

            expect(response.body.data.length).not.equal(0);
        })
    })
});
describe('TESTES DE ERRO...', () => {
    let username;
    let password;
    before(() => {
        username = 'teste';
        password = '123'
    })
    describe('Testando funções...', () => {
        describe('isValid', () => {
            it('Teste na função isValid username incorreto', async () => {
                const User = users(app);
                const response = await User.isValid(username, password)

                expect(response).to.equal(false)
            })
        })
    })
    describe('Testando funções...', () => {
        describe('isValid', () => {
            it('Teste na função isValid', async () => {
                const User = users(app);
                const response = await User.isValid()

                expect(response).to.equal(false)
            })
        })
    })
    describe('Testando rotas...', () => {
        describe('/login', () => {
            it('Teste na rota de login com username e password vazio', async () => {
                const response = await request(app)
                    .post('/login')
                    .send({ username: "", password: "" })
                    .expect(401)

                expect(response.body.message).to.equal('Username and password cannot be empty')
            })
            it('Teste na rota de login com username incorreto', async () => {
                const response = await request(app)
                    .post('/login')
                    .send({ username: "teste", password: "123" })
                    .expect(401)

                expect(response.body.message).to.equal('Invalid user, username: teste')
            })
        })
    })
    describe('/api/users/:username', () => {
        it('Teste na rota de login com username e password vazio', async () => {
            const username = 'teste'
            const response = await request(app)
                .get(`/api/users/${username}`)
                .expect(500)

            expect(response.body.message).to.equal('Invalid username');
        })
    })
});