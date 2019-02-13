const assert = require('assert');
const axios = require('axios');
const api = require('../app');


describe('Auth Routes Test Suit', () => {
    before(async () => {

        await api;

    });

    it('Deve obter um token', async () => {
        const result = await axios.post('http://localhost:3000/auth', {
            username: "user",
            password: "passwd"
        });
        
        assert.deepStrictEqual(result.status, 200);    
        assert.ok(result.data.token.length > 100);
    });
});