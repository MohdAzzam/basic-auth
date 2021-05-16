'use strict';

const supregoose = require('@code-fellows/supergoose');
const { it, expect } = require('@jest/globals');
const server = require('../src/server');
const base64=require('base-64');
const { async } = require('rsvp');
const mockServer= supregoose(server.app);

describe('User Regester Or Login', () => {
    it('Sign Up ', async () => {
        const user = {username: 'Mohammad',password: 'admin123'};
        const data= await mockServer.post('/signup').send(user);
        const regester = data.body;
        console.log(regester);
        expect(regester.username).toEqual(user.username);
        expect(regester.password).not.toEqual(user.password);
    });
    it('Sigin In ', async ()=>{
        const anotherUser = {username: 'mohammad',password: 'admin123'};
        const data= await mockServer.post('/signup').send(anotherUser);
        const user = base64.encode("mohammad:admin123");
        const response = await mockServer.post('/signin').set('Authorization', `Basic ${user}`)
        expect(response.body.username).toEqual('mohammad');
        
    })
});