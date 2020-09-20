const express = require('express');
const minionsWorkRouter = express.Router();

minionsWorkRouter.get('/', (req, res, next) => {
    console.log('minionsWork')
    res.status(200).send();
})


module.exports = minionsWorkRouter;