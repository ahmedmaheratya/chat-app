var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Mike';
        var text = 'Hey guys';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toInclude({from,text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate the correct location message object', () => {
        var from = 'Admin',
        var lat = 1;
        var lng = 1;
        var message = generateLocationMessage(from, lat, lng);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toBe('https://www.google.com/maps?q=1,1');
    });
});