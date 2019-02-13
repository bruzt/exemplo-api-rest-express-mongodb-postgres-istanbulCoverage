const assert = require('assert');
const axios = require('axios');
const api = require('../app');

let auth, url, headers, id;
describe('Register Routes Test Suit', async () => {
    before(async () => {

        await api;

        auth = await axios.post('http://localhost:3000/auth', {
            username: "user",
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
                age: "test Age",
                gender: "test Gender"
            }
        });

        id = result.data._id;
        
        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data.name, 'test Name');
        assert.deepStrictEqual(result.data.age, 'test Age');
        assert.deepStrictEqual(result.data.gender, 'test Gender');
    });

    it('Deve retornar tudo do /register limitado a 5', async () => {
        const result = await axios({
            method: 'GET',
            url: `${url}?limit=5`,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
        assert.ok(result.data.length >= 1);
        assert.ok(result.data.length <= 5);
    });

    it('Deve retornar registro pelo ID', async () => {
        const result = await axios({
            method: 'GET',
            url: `${url}?id=${id}`,
            headers
        });

        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data._id, id);
    });

    it('Deve retornar registros do /register filtrado pelo nome', async () => {
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
            method: 'PATCH',
            url: `${url}/${id}`,
            headers,
            data: {
                age: "30"
            }
        });

        assert.deepStrictEqual(result.status, 200);
        assert.deepStrictEqual(result.data.age, "30");
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