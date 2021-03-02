import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Tasks } from './tasks.js';

if(Meteor.isServer) {
    describe('Tasks', () => {
        describe('methods', () => {
            const userId = Random.id();
            let taskId;

            beforeEach(() => {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'test task',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'abc'
                });
            });

            it('can delete owned task', () => {
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];
                const invocation = { userId };
        
                // Run the method with `this` set to the fake invocation
                deleteTask.apply(invocation, [taskId]);
        
                // Verify that the method does what we expected
                assert.equal(Tasks.find({}).count(), 0);
            });
        });
    });
};