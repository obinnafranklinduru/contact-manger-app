const request = require('supertest');

const app = require('../../app');
const Contacts = require('../../models/contacts.model');
const User = require('../../models/users.model');
const { mongooseConnect, mongooseDisconnect } = require('../../config/mongoose');

describe('Contact Routes Endpoints', () => {
    let authToken;

    beforeAll(async () => {
        await mongooseConnect();

        await User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password',
        });

        const login = await request(app)
            .post('/v1/auth/login')
            .send({ email: 'testuser@example.com', password: 'password' });

        authToken = login.body.accessToken;
    });

    afterAll(async () => {
        await Contacts.deleteMany({});
        await User.deleteMany({});

        await mongooseDisconnect();
    });

    describe('POST /v1/contacts', () => {
        it('should require authentication', async () => {
            const response = await request(app)
                .post('/v1/contacts');

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });

        it('should create a new contact', async () => {
            const response = await request(app)
                .post('/v1/contacts')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ name: 'obinna', email: 'obinna@gmail.com', phone: '12345' });

            expect(response.status).toBe(201);
            expect(response.body.message).toBeDefined();
        });

        it('should throw validation errors if contact details are not provided', async () => {
            const response = await request(app)
                .post('/v1/contacts')
                .set('Authorization', `Bearer ${authToken}`)
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /v1/contacts', () => {
        it('should require authentication', async () => {
            const response = await request(app)
                .get('/v1/contacts');

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });

        it('should return an object of contacts', async () => {
            const response = await request(app)
                .get('/v1/contacts')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(typeof response.body.contacts).toBe('object');
        });
    });

    describe('GET /v1/contacts/:id', () => {
        it('should require authentication', async () => {
            const response = await request(app)
                .get('/v1/contacts/1');

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });

        it('should require a valid ID', async () => {
            const response = await request(app)
                .get('/v1/contacts/1')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should return a contact by ID when authenticated', async () => {
            const contact = await Contacts.findOne({ name: 'obinna' });

            const response = await request(app)
                .get(`/v1/contacts/${contact._id}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(typeof response.body.contact).toBe('object');
        });
    });

    describe('PUT /v1/contacts/:id', () => {
        it('should require authentication', async () => {
            const response = await request(app)
                .put('/v1/contacts/1');

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });

        it('should require a valid ID', async () => {
            const response = await request(app)
                .put('/v1/contacts/1')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should not update a contact if the contact ID is not found', async () => {
            const response = await request(app)
                .put('/v1/contacts/6468dec66dd5df03267cdf6e')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ name: 'global news' });

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });

        it('should update a contact', async () => {
            const contact = await Contacts.findOne({ name: 'obinna' });

            const response = await request(app)
                .put(`/v1/contacts/${contact._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ name: 'franklin' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBeDefined();
        });
    });

    describe('DELETE /v1/contacts/:id', () => {
        it('should require authentication', async () => {
            const response = await request(app)
                .delete('/v1/contacts/1');

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });

        it('should require a valid ID', async () => {
            const response = await request(app)
                .delete('/v1/contacts/1')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should not delete a contact if the contact ID is not found', async () => {
            const response = await request(app)
                .delete('/v1/contacts/6468dec66dd5df03267cdf6e')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });

        it('should delete a contact', async () => {
            const contact = await Contacts.findOne({ name: 'franklin' });

            const response = await request(app)
                .delete(`/v1/contacts/${contact._id}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBeDefined();
        });
    });
});