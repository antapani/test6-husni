exports.register = function (server, options, next) {

    options = options || {};
    options.prefix = '->';

    server.route({
        method: 'GET',
        path: '/ping',
        handler: function (request, reply) {
            reply({
                ping: options.prefix + ' pong'
            });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'hello',
    version: '1.0.0'

};
