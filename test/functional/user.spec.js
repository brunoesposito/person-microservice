'use strict'

const Token = use('App/Models/Token');
const User = use('App/Models/User');
const { test, trait } = use('Test/Suite')('User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('create user: add', async ({ client }) => {
    const response = await client.post('/user').send(
        {
            "full_name": "Teste",
            "email": "teste@gmail.com",
            "password": "123mudar",
            "password_confirmation": "123mudar",
            "cpf": "289.334.580-85",
            "rg": "46.847.047-5",
            "cep": "00000-295",
            "street": "Avenida fake",
            "street_number": "725",
            "district": "Bairro",
            "state": "Mato Grosso do Sul"
        }
    ).end();

    response.assertStatus(200);
});

test('create user: missing fields required', async ({ client }) => {
    const response = await client.post('/user').end();

    response.assertStatus(400);
});

test('create user: duplicate registration', async ({ client }) => {
    await client.post('/user').send(
        {
            "full_name": "Teste",
            "email": "teste@gmail.com",
            "password": "123mudar",
            "password_confirmation": "123mudar",
            "cpf": "289.334.580-85",
            "rg": "46.847.047-5",
            "cep": "00000-295",
            "street": "Avenida fake",
            "street_number": "725",
            "district": "Bairro",
            "state": "Mato Grosso do Sul"
        }
    ).end();
    
    const response = await client.post('/user').send(
        {
            "full_name": "Teste",
            "email": "teste@gmail.com",
            "password": "123mudar",
            "password_confirmation": "123mudar",
            "cpf": "289.334.580-85",
            "rg": "46.847.047-5",
            "cep": "00000-295",
            "street": "Avenida fake",
            "street_number": "725",
            "district": "Bairro",
            "state": "Mato Grosso do Sul"
        }
    ).end();

    response.assertStatus(400);
});

test('verify email: check email using the token', async ({ client }) => {
    await client.post('/user').send(
        {
            "full_name": "Teste",
            "email": "teste@gmail.com",
            "password": "123mudar",
            "password_confirmation": "123mudar",
            "cpf": "289.334.580-85",
            "rg": "46.847.047-5",
            "cep": "00000-295",
            "street": "Avenida fake",
            "street_number": "725",
            "district": "Bairro",
            "state": "Mato Grosso do Sul"
        }
    ).end();

    const { id } = await User.findBy('email', 'teste@gmail.com');
    const { token } = await Token.findBy('user_id', id);
    const response = await client.post('/user/verifyEmail').send(
        {
            "token": token
        }
    ).end();

    response.assertStatus(200);
    response.assertJSONSubset(
        {
            message: "Email verified"
        }
    );
});

test('verify email: check token is invalid or expired', async ({ client }) => {
    const response = await client.post('/user/verifyEmail').send(
        {
            "token": "327780871b9432f20daa1153"
        }
    ).end();

    response.assertStatus(400);
    response.assertError([
        { 
            message: 'The token is invalid or expired',
            field: 'token',
            validation: 'valid or exist'
        }
    ]);
});

test('session: create user session', async ({ client }) => {
    await client.post('/user').send(
        {
            "full_name": "Teste",
            "email": "teste@gmail.com",
            "password": "123mudar",
            "password_confirmation": "123mudar",
            "cpf": "289.334.580-85",
            "rg": "46.847.047-5",
            "cep": "00000-295",
            "street": "Avenida fake",
            "street_number": "725",
            "district": "Bairro",
            "state": "Mato Grosso do Sul"
        }
    ).end();

    const { id } = await User.findBy('email', 'teste@gmail.com');
    const { token } = await Token.findBy('user_id', id);

    await client.post('/user/verifyEmail').send(
        {
            "token": token
        }
    ).end();
    
    const response = await client.post('/user/session').send(
        {
            "uid": "teste@gmail.com",
            "password": "123mudar"
        }
    ).end();

    response.assertStatus(200);
});

test('session: try create user session without having selected the email', async ({ client }) => {
    await client.post('/user').send(
        {
            "full_name": "Teste",
            "email": "teste@gmail.com",
            "password": "123mudar",
            "password_confirmation": "123mudar",
            "cpf": "289.334.580-85",
            "rg": "46.847.047-5",
            "cep": "00000-295",
            "street": "Avenida fake",
            "street_number": "725",
            "district": "Bairro",
            "state": "Mato Grosso do Sul"
        }
    ).end();

    const response = await client.post('/user/session').send(
        {
            "uid": "teste@gmail.com",
            "password": "123mudar"
        }
    ).end();

    response.assertStatus(400);
    response.assertError([
        { 
            message: 'Your email has not yet been verified',
            field: 'account_status',
            validation: 'active'
        }
    ]);
});

test('session: use any info to try to create session', async ({ client }) => {
    const response = await client.post('/user/session').send(
        {
            "uid": "teste@gmail.com",
            "password": "123mudar"
        }
    ).end();

    response.assertStatus(400);
});