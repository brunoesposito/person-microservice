'use strict'

const Persona = use('Persona');
const Env = use('Env');

class UserController {

    async register ({ request, response }) {
        const appKey = request.header('app-key');
        
        if( appKey !== Env.getOrFail('APP_KEY') ){
            return response.status(400).send([
                { 
                    message: 'This request does not have permission',
                    field: 'App Key',
                    validation: 'valid'
                }
            ]);
        }

        const data = request.only([ 'full_name', 'email', 'password', 'password_confirmation', 'cpf', 'rg', 'cep', 'street', 'street_number', 'district', 'state', 'complement' ]);
        const user = await Persona.register(data);
        
        return user;
    }

    async verifyEmail ({ request, response }) {
        try {
            const appKey = request.header('app-key');
        
            if( appKey !== Env.getOrFail('APP_KEY') ){
                return response.status(400).send([
                    { 
                        message: 'This request does not have permission',
                        field: 'App Key',
                        validation: 'valid'
                    }
                ]);
            }

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
        const appKey = request.header('app-key');
        
        if( appKey !== Env.getOrFail('APP_KEY') ){
            return response.status(400).send([
                { 
                    message: 'This request does not have permission',
                    field: 'App Key',
                    validation: 'valid'
                }
            ]);
        }
        
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
