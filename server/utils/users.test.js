const expect = require('expect');

const {Users} = require('./users');

describe('Users Class', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }]
    });

    it('should add a new user', () => {
        var users = new Users();
        var resUser = Users.addUser(9, 'Ahmed', 'The Office');

        expect(users.users).toEqual([{id: 9, name: 'Ahmed', room: 'The Office'}]);
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');
        
        expect(userList).toEqual(['Jen']);
    });
})