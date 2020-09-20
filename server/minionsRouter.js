const express = require('express');
const minionsRouter = express.Router();
let bodyParser = require('body-parser')
const db = require('./db');
let minions = db.getAllFromDatabase('minions');

minionsRouter.use(bodyParser.json());
minionsRouter.param('id', (req, res, next, id) => {

    if (!id) {
        console.log('nije unet id')

    } else {
        req.id = id;
        req.body.id = id;
        next();
    }
});

minionsRouter.get('/', (req, res, next) => {
    console.log(req.id)
    console.log('minions get')
    res.send(minions);


})

minionsRouter.post('/', (req, res, next) => {
    console.log('minions post')
    db.addToDatabase('minions', req.body);
    res.status(201).send('You successful created new minion')

})

minionsRouter.get('/:id', (req, res, next) => {
    console.log(req.id);
    console.log(req.body.id);
    console.log('minion get by id');

    let wantedMinion = db.getFromDatabaseById('minions', req.id)
    res.send(wantedMinion);

})



minionsRouter.put('/:id', (req, res, next) => {
    console.log('minion PUT by id');

    db.updateInstanceInDatabase('minions', req.body)
    res.status(200).send(`Minion with id:${req.id} is updated`);

})

minionsRouter.delete('/:id', (req, res, next) => {
    console.log('minion Delete by id');

    db.deleteFromDatabasebyId('minions', req.id)
    res.status(204).send(`minion with id:${req.id} was successful deleted`);

})

minionsRouter.get('/:id/work', (req, res, next) => {

    console.log('all works of all minions');
    let minionId = req.id;
    let arrayOfallWorks = db.getAllFromDatabase('work');

    let worksForWantedMinion = [];
    arrayOfallWorks.forEach(work => {

        if (work.minionId === minionId) {
            worksForWantedMinion.push(work)
        }
    })

    console.log(worksForWantedMinion)
    res.status(200).send(worksForWantedMinion);

})

minionsRouter.post('/:id/work', (req, res, next) => {
    console.log('minionsPostWork')
    req.body.minionId = req.id
    let newWorkForMinion = db.addToDatabase('work', req.body);
    console.log(newWorkForMinion)
    res.status(201).send('work adedd!')
})

minionsRouter.put('/:id/work/:workId', (req, res, next) => {
    console.log('minionsPuttWork');

    let workIdForUpdate = req.params.workId;
    let minionId = req.id;


    let newWorkForPush = req.body;
    newWorkForPush.id = workIdForUpdate;
    newWorkForPush.minionId = minionId;
    db.updateInstanceInDatabase('work', newWorkForPush);
    res.status(200).send('work was successful updated!');


})

minionsRouter.delete('/:id/work/:workId', (req, res, next) => {
    console.log('minionsDeleteWork')
    let workIdForDelete = req.params.workId;
    db.deleteFromDatabasebyId('work', workIdForDelete)
    res.status(204).send()
})


module.exports = minionsRouter;