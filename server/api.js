const express = require('express');
const apiRouter = express.Router();
apiRouter.get('/',(req,res,next)=>{
    res.send('sve je ok')
})


module.exports = apiRouter;
