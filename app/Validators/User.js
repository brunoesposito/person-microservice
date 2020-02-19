'use strict'

class User {
    get rules () {
        return {
            full_name: 'required|string|max:80',
            email: 'required|string|max:254|unique:users,email',
            password: 'required|string|max:60',
            password_confirmation: 'required|string|max:60',
            cpf: 'required|string|max:15|unique:users,cpf',
            rg: 'required|string|max:15|unique:users,rg',
            cep: 'required|string|max:10',
            street: 'required|string|max:50',
            street_number: 'required|integer|max:10',
            district: 'required|string|max:50',
            state: 'required|string|max:50',
            complement: 'string|max:100',
        }
    }
}

module.exports = User
