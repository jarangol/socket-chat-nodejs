const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMsg } = require('../utilities/utilities');

const users = new Users();
io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {
        if (!data.name || !data.room) {
            return callback({
                err: true,
                msg: 'Name and room are required.'
            });
        };

        client.join(data.room);
        users.addPerson(client.id, data.name, data.room);

        client.broadcast.to(data.to).emit('peopleList', users.getPeoplePerRoom(data.room));
        client.broadcast.to(data.to).emit('createMsg', createMsg('Admin', `${ data.name} join the chat.`));
        callback(users.getPeoplePerRoom(data.room));

    });


    client.on('disconnect', () => {
        let deletedPerson = users.deletePerson(client.id);
        client.broadcast.to(deletedPerson.to).emit('createMsg', createMsg('Admin', `${ deletedPerson.name} left the chat.`));
        client.broadcast.to(deletedPerson.to).emit('peopleList', users.getPeoplePerRoom(deletedPerson.room));
    });

    client.on('createMsg', (data, callback) => {
        let person = users.getPerson(client.id);
        let msg = createMsg(person.name, data.msg);

        client.broadcast.to(person.to).emit('createMsg', msg);

        callback(msg);
    });

    client.on('privateMsg', data => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.to).emit('privateMsg', createMsg(person.name, data.msg));
    });
});