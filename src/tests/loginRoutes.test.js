const assert = require('assert');
const axios = require('axios');
const api = require('../app');

let auth, url, headers, id;
describe('Login Routes Test Suit', () => {
    before(async () => {

        await api;

        auth = await axios.post('http://localhost:3000/auth', {
            username: "user",
            password: "passwd"
        });

        headers = {
            Authorization: `Bearer ${auth.data.token}`
        }

        url = 'http://localhost:3000/login';

    });
    
    it('Deve cadastar um usuario no /login', async () => {
        const result = await axios({ 
            method: 'POST',
            url,
            headers, 
            data: { 
                username: 'test',
                password: 'test'                     
            } 
        });

        id = result.data[0].id;
        
        assert.deepStrictEqual(result.status, 200);
    });

    it('Deve listar tudo do /login', async () => {
        const result = await axios({
            method: 'GET',
            url,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
    });

    it('Deve listar pelo ID', async () => {
        const result = await axios({
            method: 'GET',
            url: `${url}?id=${id}`,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data[0].id, id);
    })

    it('Deve listar pelo username', async () => {
        const result = await axios({
            method: 'GET',
            url: `${url}?username=user`,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data[0].username, 'user');
    })

    it('Deve atualizar um usuario do /login', async () => {
        const result = await axios({
            method: 'PATCH',
            url: `${url}/${id}`,
            headers,
            data: {
                username: 'change',
                password: 'change'
            } 
        });

        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data[0], 1);
    });

    it('Deve deletar um usuario o /login', async () => {
        const result = await axios({
            method: 'DELETE',
            url: `${url}/${id}`,
            headers
        });
        
        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data, 'OK');
    })


});