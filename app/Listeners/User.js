'use strict'

const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/UserSendEmail');

const User = exports = module.exports = {}

User.sendEmail = async ({ user }) => {
    await Bull.add( Job.key, user, { removeOnComplete: true });
}
