class Users {
    constructor() {
        this.people = [];
    }

    addPerson(id, name, room) {
        const person = { id, name, room };
        this.people.push(person);
        return this.people;
    }

    getPerson(id) {
        const person = this.people.filter(person => person.id === id)[0];
        return person;
    }

    getPeople() {
        return this.people;
    }

    getPeoplePerRoom(room) {
        const peopleOnRoom = this.people.filter(person => person.room === room);
        return peopleOnRoom;
    }

    deletePerson(id) {
        let deletedPerson = this.getPerson(id);
        this.people = this.people.filter(person => person.id != id);
        return deletedPerson;
    }

}

module.exports = {
    Users
}