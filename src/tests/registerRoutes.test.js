const assert = require('assert');
const axios = require('axios');
const api = require('../app');

let auth, url, headers, id;
describe('Register Routes Test Suit (MongoDB)', async () => {
    before(async () => {

        await api;

        auth = await axios.post('http://localhost:3000/auth', {
            username: "user1",
            password: "passwd"
        });

        headers = {
            Authorization: `Bearer ${auth.data.token}`
        }

        url = 'http://localhost:3000/register';
    });

    it('Deve cadastrar um novo registro', async () => {
        const result = await axios({
            method: 'POST',
            url,
            headers,
            data: {
                name: "test Name",
                age: "18",
                gender: "Female"
            }
        });

        id = result.data._id;
        
        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data.name, 'test Name');
        assert.deepStrictEqual(result.data.age, '18');
        assert.deepStrictEqual(result.data.gender, 'Female');
    });

    it('Deve retornar tudo do registro limitado a 5', async () => {
        const result = await axios({
            method: 'GET',
            url: `${url}?limit=5`,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
        assert.ok(result.data.length >= 1);
        assert.ok(result.data.length <= 5);
    });

    it('Deve retornar registro pelo ID em query', async () => {
        const result = await axios({
            method: 'GET',
            url: `${url}?id=${id}`,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data._id, id);
    });

    it('Deve retornar registro pelo ID em params', async () => {
        const result = await axios({
            method: 'GET',
            url: `${url}/${id}`,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data._id, id);
    });

    it('Deve retornar registro filtrado pelo nome', async () => {
        const result = await axios({
            method: 'GET',
            url: `${url}?name=test Name`,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data[0].name, 'test Name');
    });

    it('Deve atualizar um registro', async () => {
        const result = await axios({
            method: 'PUT',
            url: `${url}/${id}`,
            headers,
            data: {
                age: "30",
                gender: "female"
            }
        });

        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data.age, "30");
        assert.deepStrictEqual(result.data.gender, "female");
    })

    it('Deve apagar um registro', async () => {
        const result = await axios({
            method: 'DELETE',
            url: `${url}/${id}`,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data._id, id);
    });
});