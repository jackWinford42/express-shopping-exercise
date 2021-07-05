const express = require('express');
let items = require('./fakeDb')
const router = express.Router();

router.get('', function(req, res) {
    return res.json(items)
})

router.post('', function(req, res) {
    items.push(req.body)
    return res.json({"added": req.body})
})

router.get('/:name', function(req, res) {
    for (i in items) {
        const item = items[i]
        if (item['name'] == req.params.name) {
            return res.json(item)
        }
    }
    return res.json({'error': 'the given name does not correspond to an item'})
})

router.patch('/:name', function(req, res) {
    for (i in items) {
        const item = items[i]
        if (item['name'] == req.params.name) {
            items.splice(i, 1); //remove the item from items
            items.push(req.body);
            return res.json({"updated": req.body})
        }
    }
    return res.json({'error': 'the given name does not correspond to an item'})
})

router.delete('/:name', function(req, res) {
    for (i in items) {
        const item = items[i]
        if (item['name'] == req.params.name) {
            items.splice(i, 1); //remove the item from items
            return res.json({"message": "Deleted"})
        }
    }
    return res.json({'error': 'the given name does not correspond to an item'})
})

module.exports = router