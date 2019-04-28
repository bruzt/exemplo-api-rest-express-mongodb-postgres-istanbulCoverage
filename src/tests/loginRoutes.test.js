const assert = require('assert');
const axios = require('axios');
const api = require('../app');

let auth, url, headers, id;
describe('Login Routes Test Suit (Postgres)', () => {
    before(async () => {

        await api;

        auth = await axios.post('http://localhost:3000/auth', {
            username: "user1",
            password: "passwd"
        });

        headers = {
            Authorization: `Bearer ${auth.data.token}`
        }

        url = 'http://localhost:3000/login';

    });
    
    it('Deve cadastar um usuario', async () => {
        const result = await axios({ 
            method: 'POST',
            url,
            headers, 
            data: { 
                username: "test1",
                email: "test@test.com",
                password: "test11"                     
            } 
        });
        
        id = result.data.id;
        
        assert.deepStrictEqual(result.status, 200);
    });

    it('Deve tentar cadastar o mesmo usuario e não conseguir', async () => {

        try {

            await axios({ 
                method: 'POST',
                url,
                headers, 
                data: { 
                    username: "test1",
                    email: "test@test.com",
                    password: "test11"                     
                } 
            });
            
        } catch (error) {
            
            assert.deepStrictEqual(error.response.status, 400);
            
        }
    });

    it('Deve listar tudo', async () => {
        const result = await axios({
            method: 'GET',
            url,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
    });

    it('Deve listar pelo ID em query', async () => {
        const result = await axios({
            method: 'GET',
            url: `${url}?id=${id}`,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data[0].id, id);
    })

    it('Deve listar pelo ID em params', async () => {
        const result = await axios({
            method: 'GET',
            url: `${url}/${id}`,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data.id, id);
    })

    it('Deve listar pelo username', async () => {
        const result = await axios({
            method: 'GET',
            url: `${url}?username=user1`,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data[0].username, 'user1');
    })

    it('Deve atualizar um usuario', async () => {
        const result = await axios({
            method: 'PUT',
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

    it('Deve deletar um usuario', async () => {
        const result = await axios({
            method: 'DELETE',
            url: `${url}/${id}`,
            headers
        });
        
        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data, true);
    })


});