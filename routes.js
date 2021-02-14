const express = require('express');
const routes = express.Router();
const bodyparser = require('body-parser');  
const mongoose = require('mongoose'); 
const database = require('./database.js');

routes.use(bodyparser.json());

//Middleware for parsing URL encoded bodies
routes.use(bodyparser.urlencoded({ extended: true }));

//MongoDB Connection
mongoose.connect("mongodb://localhost:27017/xmemedb",{
    useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log("Database Connected")).catch((err) => console.log(err))

//Function to query for latest 100 memes from the Database
function findMeme(){
    return new Promise((resolve,reject) =>{
        resolve(database.find())
        reject("Database has some error!")
    })
}

//Get Route for /memes
routes.get('/memes',(req,res) =>{
    findMeme().then((memeList) =>{
        memeList.reverse();
        let len=memeList.length;
        let sub=0;
        if(len>100)
            sub=len-100;
        memeList.length-=sub;

        var List = []
        for(var i=0;i<memeList.length;i++)
        {
            List[i]={}
            List[i].id=memeList[i].id;
            List[i].name=memeList[i].name;
            List[i].url=memeList[i].url;
            List[i].caption=memeList[i].caption;
        }
       res.setHeader('Content-Type', 'application/json');
       res.json(List)
    }).catch((err) =>{
        res.send("Error Occured");
        console.log(err)
    })
})

//Get Route for a particular meme id
routes.get('/memes/:id',(req,res) =>{
    var id=req.params.id
    database.find({"_id": id}).then((data)=>{
        var fetchedData = {}
        fetchedData.id = data[0].id
        fetchedData.name = data[0].name
        fetchedData.url = data[0].url
        fetchedData.caption = data[0].caption

        res.setHeader('Content-Type', 'application/json');
        res.json(fetchedData)
    }).catch((err) =>{
        res.sendStatus(404);
    })
})

//POST Route to /memes
routes.post('/memes',(req,res) =>{
    var {name,caption,url} = req.body;

    const memeData = new database({
        name:name,
        caption:caption,
        url:url
    })

    memeData.save().then((returnId) =>{
        console.log("Data Saved in DB through API")
        res.setHeader('Content-Type', 'application/json');
        res.json({id:returnId.id})
    }).catch((err) =>{
        res.send("Error Occurred");
        console.log(err)
    })
})


//Routes for Application to Work
routes.get('/', (req,res) =>{
    findMeme().then((memeList) =>{
        memeList.reverse();
        let len=memeList.length;
        let sub=0;
        if(len>100)
            sub=len-100;
        memeList.length-=sub;

        res.render(__dirname+'/Frontend/views/memes',{memeList:memeList});
    }).catch((err) =>{
        res.render(__dirname+'/Frontend/views/memes',{problem:"Some Database error occurred"});
        console.log(err)
    })
})

routes.post('/',(req,res) =>{
    var {Fullname,Caption,URL} = req.body;

    if(!Fullname || !Caption || !URL) {
        var err="Please fill all the fields!";
        findMeme().then((memeList) =>{
            //console.log(memeList)
            memeList.reverse();
            let len=memeList.length;
            let sub=0;
            if(len>100)
                sub=len-100;
            memeList.length-=sub;

            res.render(__dirname+'/Frontend/views/memes',{memeList:memeList,err:err});
        }).catch((err) =>{
            res.render(__dirname+'/Frontend/views/memes',{problem:"Some Database error occurred"});
            console.log(err)
        })
    }
    else {
            const memeData = new database({
                name:Fullname,
                caption:Caption,
                url:URL
            })

            memeData.save().then(()=>{
                console.log("Data Saved in DB")
                findMeme().then((memeList) =>{
                    memeList.reverse();
                    let len=memeList.length;
                    let sub=0;
                    if(len>100)
                        sub=len-100;
                    memeList.length-=sub;

                    res.render(__dirname+'/Frontend/views/memes',{memeList:memeList});
                }).catch((err) =>{
                    res.render(__dirname+'/Frontend/views/memes',{problem:"Some Database error occurred. Sorry, your meme wasn't posted."});
                    console.log(err)
                })
            }).catch((err)=>{
                res.render(__dirname+'/Frontend/views/memes',{problem:"Some Database error occurred. Sorry, your meme wasn't posted."});
                console.log(err)
            })
        }
})

module.exports = routes;