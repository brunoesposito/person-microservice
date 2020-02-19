'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
    up () {
        this.create('users', (table) => {
            table.increments()
            table.string('full_name', 80).notNullable()
            table.string('email', 254).notNullable().unique()
            table.string('password', 60).notNullable()
            table.string('cpf', 15).notNullable().unique()
            table.string('rg', 15).notNullable().unique()
            table.string('cep', 10).notNullable()
            table.string('street', 50).notNullable()
            table.integer('street_number', 10).notNullable()
            table.string('district', 50).notNullable()
            table.string('state', 50).notNullable()
            table.string('complement', 100)
            table.string('account_status')
            table.timestamps()
        })
    }

    down () {
        this.drop('users')
    }
}

module.exports = UserSchema
