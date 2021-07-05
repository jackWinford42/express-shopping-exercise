process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app.js");
let items = require("./fakeDb.js")

beforeEach(async () => {
    items.push({ "name": "smoothie", "price": 42.99 })
    items.push({ "name": "cookie", "price": 13.01 })
});

afterEach(async () => {
    items = []
});

test("test the /items route which should return a list of all items", async function() {
    const response = await request(app)
                            .get('/items');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual([{"name": "smoothie", "price": 42.99}, {"name": "cookie", "price": 13.01}])
})

test("test the /items route with a POST request to add an item", async function() {
    const response = await request(app)
                            .post('/items')
                            .set('Accept', 'application/json')
                            .send({name:"banana", price: 68.70});

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({"added":{"name":"banana", "price": 68.70}});
})

test("the /items/:name route return a single item given the name is correct and request is get", async function() {
    const response = await request(app)
                            .get('/items/smoothie');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ "name": "smoothie", "price": 42.99 });
    const responseTwo = await request(app)
                            .get('/items/notReal');
    expect(responseTwo.statusCode).toBe(200);
    expect(responseTwo.body).toEqual({'error': 'the given name does not correspond to an item'});
})

test("the /items/:name route with a request of patch will update the given item", async function() {
    const response = await request(app)
                            .patch('/items/smoothie')
                            .set('Accept', 'application/json')
                            .send({name:"Big Smoothie", price: 4242.70});
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({"updated": { "name": "Big Smoothie", "price": 4242.70 }});
    const responseTwo = await request(app)
                            .patch('/items/notReal');
    expect(responseTwo.statusCode).toBe(200);
    expect(responseTwo.body).toEqual({'error': 'the given name does not correspond to an item'});
})

test("the /items/:name route with a request of patch will update the given item", async function() {
    const response = await request(app)
                            .delete('/items/cookie');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({"message": "Deleted"});
    const responseTwo = await request(app)
                            .delete('/items/notReal');
    expect(responseTwo.statusCode).toBe(200);
    expect(responseTwo.body).toEqual({'error': 'the given name does not correspond to an item'});
})