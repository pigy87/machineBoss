const express=require('express');
const minionWork=express.Router;
const bodyParser=require('body-parser');


const pathMinionsId='/minions/:minionId/work';
const pathMinionsIdAndWorksId='/minions/:minionId/work/:workId';
let path;

minionWork.use(bodyParser);

minionWork.use([pathMinionsId,pathMinionsIdAndWorksId],(req,res,next)=>{
    if(req.path===pathMinionsId){
        req.minionId=req.params.minionId;
        console.log('minionsId')
    }else{
        req.minionId=req.params.minionId;
        req.workId=req.params.workId;
        console.log('minion and workID')
    }
})

minionWork.get('/',(req,res,next)=>{
    console.log('Method get na route'+req.path);
    res.status(200).send('sve sljaka kao leptir')
})



//proba

module.exports=minionWork;