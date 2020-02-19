const Mail = use('Mail');
const Env = use('Env');
const Token = use('App/Models/Token');

class UserSendEmail {
    static get key() {
        return 'UserSendEmail-key';
    }

    async handle(job) {
        const { data } = job;
        const { token } = await Token.findBy('user_id', data.id);

        if( token ){
            await Mail.send('emails.welcome', { data, token }, message => {
                message
                .to(data.email)
                .from(`<${Env.get('MAIL_USERNAME')}>`)
                .subject('Cadastro feito com sucesso');
            });
        }

        return data;
    }
}

module.exports = UserSendEmail;