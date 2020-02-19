'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

/** User Routes */
Route.group(() => {
    Route.post('', 'UserController.register').validator('User');
    Route.post('/verifyEmail', 'UserController.verifyEmail');
    Route.post('/session', 'UserController.session');
}).prefix('user')