const Event = use('Event');

Event.on('user::created', 'User.sendEmail');