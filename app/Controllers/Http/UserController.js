'use strict'

const Persona = use('Persona');

class UserController {

    async register ({ request }) {
        const data = request.only([ 'full_name', 'email', 'password', 'password_confirmation', 'cpf', 'rg', 'cep', 'street', 'street_number', 'district', 'state', 'complement' ]);
        const user = await Persona.register(data);
        
        return user;
    }

    async verifyEmail ({ request, response }) {
        try {
            const { token } = request.only([ 'token' ]);
            const user = await Persona.verifyEmail(token);
        
            return { message: 'Email verified' }
        }catch {
            return response.status(400).send([
                { 
                    message: 'The token is invalid or expired',
                    field: 'token',
                    validation: 'valid or exist'
                }
            ]);
        }
    }

    async session ({ request, auth, response }) {
        const { uid, password } = request.only(['uid', 'password']);
        const { email, account_status } = await Persona.verify({ uid, password });

        if( account_status === 'pending' ){
            return response.status(400).send([
                { 
                    message: 'Your email has not yet been verified',
                    field: 'account_status',
                    validation: 'active'
                }
            ]);
        }

        const token = await auth.attempt(email, password);
        return token;
    }

}

module.exports = UserController
