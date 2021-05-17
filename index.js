const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
const port = 5000
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
app.use(cors())
app.use(bodyParser.json());

app.use(express.static('allteam'));
app.use(fileupload());

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aujfn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const collection = client.db("YSF-OUR-PROJECT").collection("PROJECTS");

//     console.log('connect successfully mama');
// });

// Admin area staRt here

client.connect(err => {
    const AdminCollection = client.db("YSF-ADMIN").collection("ADMINS");

    app.post('/addAdmin', (req, res) => {
        const admin = req.body;
        AdminCollection.insertOne(admin)
            .then(result => res.send(result.insertedCount > 0))
    })

    app.get('/loadAdmin', (req, res) => {
        AdminCollection.find({})
            .toArray((error, document) => {
                res.send(document)
            })
    })

    app.post('/isAdmin', (req, res) => {
        const email = req.body.email;
        AdminCollection.find({email: email})
        .toArray((error, isAdmin) => {
            res.send(isAdmin.length > 0)
        })
    })

    app.delete('/adminDelete/:id', (req, res) => {
        AdminCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                console.log(result);
            })
    })
});

// Admin area end here

// DONATE area START here


client.connect(err => {
    const donateCollection = client.db("YSF-DONATE").collection("ALLDONATE");
    app.post('/addDonate', (req, res) => {
        const donates = req.body;
        donateCollection.insertOne(donates)
            .then(result => res.send(result.insertedCount > 0))

    })

    app.get('/allDonates', (req, res) => {
        donateCollection.find({})
            .toArray((err, results) => {
                res.send(results)
            })
    })

});


// DONATE area END here

// WHO WE ARE area START here

client.connect(err => {
    const whoWeAreCollection = client.db("YSF-WHOWEARE").collection("WHOWEARES");

    app.post('/addWhoWeAre', (req, res) => {
        const whoWeAre = req.body;
        whoWeAreCollection.insertOne(whoWeAre)
            .then(result => res.send(result.insertedCount > 0))
    })

    app.get('/allWhoWeAreLoad', (req, res) => {
        whoWeAreCollection.find({})
            .toArray((err, result) => {
                res.send(result)
            })
    })

    app.delete('/deleteWhoWeAre/:id', (req, res) => {
        console.log(req.params.id);
        whoWeAreCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                res.send(result.deletedCount > 0)
            })
    })
});

// WHO WE ARE area END here
// allTeam area start here

client.connect(err => {
    const allTeamCollection = client.db("YSF-ALLTEAM").collection("ALLTEAMS");
    app.post('/addTeam', (req, res) => {
        const team = req.body;
        console.log(team);
        allTeamCollection.insertOne(team)
        .then(result => res.send(result.insertedCount > 0))
        // const file = req.files.file;
        // const name = req.body.name;
        // const title = req.body.title;
        // const description = req.body.description;
        // console.log(file, name, title, description);
        // file.mv(`${__dirname}/allteam/${file.name}`, err => {
        //     if(err){
        //         console.log(err);
        //         return res.status(500).send({msg:'file upload file sir'});
        //     }
        //     return res.send({name: file.name,  path: `/${file.name}`})
        // })
    })

    app.get('/allteam', (req, res ) => {
        allTeamCollection.find({})
        .toArray((error, result) => {
            res.send(result)
        })
    })

    app.delete('/deleteTeam/:id', (req, res) => {
        console.log(req.params.id);
        allTeamCollection.deleteOne({_id: ObjectId(req.params.id)})
        .then(result =>{
            res.send(result.deletedCount > 0)
        })
    })
});


// allTeam area END here


// Active member collection start here
client.connect(err => {
    const activeMemberCollection = client.db("YSF-ACTIVE-MEMBER").collection("ACTIVE-MEMBER");

    app.post('/addActiveMember', (req, res) => {
        const donates = req.body;
        activeMemberCollection.insertOne(donates)
            .then(result => res.send(result.insertedCount > 0))

    })

    app.get('/allActiveMember', (req, res) => {
        activeMemberCollection.find({})
            .toArray((err, results) => {
                res.send(results)
            })
    })
});

// Active member collection end here


// Contact-us start here 

client.connect(err => {
    const contactCollection = client.db("YSF-CONTACT-US").collection("CONTACT-US");
    app.post('/AddContact', (req, res) =>{
        const Contact = req.body;
        // console.log(Contact);
        contactCollection.insertOne(Contact)
        .then(result => {
            res.send(result.insertedCount >0)
        })
    })

    app.get('/allContacts', (req, res) => {
        contactCollection.find({})
        .toArray((error, result) => {
            res.send(result)
        })
    })
});


// Contact-us ends here 

// education start here

client.connect(err => {
    const educationCollection = client.db("YSF-EDUCATION").collection("EDUCATION");

    app.post('/addEducation', (req, res) => {
        const education = req.body;
        // console.log(education);
        educationCollection.insertOne(education)
        .then(result => {
            res.send(result.insertedCount >0)
        })
    })

    app.get('/allEducation', (req, res) => {
        educationCollection.find({})
        .toArray((error, result) => {
            res.send(result)
        })
    })

    app.delete('/deleteEducation/:id', (req, res)=> {
        educationCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                // console.log(result);
            })


    })
});

// education ends here


// social development start here
client.connect(err => {
    const SocialDevelopmentCollection = client.db("YSF-SOCIAL-DEVELOPMENT").collection("SOCIAL-DEVELOPMENT");

    app.post("/AddSocialDevelopment", (req, res) => {
        const socialWork = req.body;
        SocialDevelopmentCollection.insertOne(socialWork)
        .then(result=> {
            res.send(result.insertedCount > 0)
        })

    })

    app.get('/allSocialDevelopment', (req, res) => {
        SocialDevelopmentCollection.find({})
        .toArray((error , result) => {
            res.send(result)
        })
    })

    app.delete('/deleteSocialDevelopment/:id', (req, res) => {
        SocialDevelopmentCollection.deleteOne({_id : ObjectId(req.params.id)})
        .then((error ,result) => {
            res.send(result.deletedCount > 0)
        })
    })
    

})   


// social development ends here

// poor help start here

client.connect(err => {
    const poorHelpCollection = client.db("YSF-POOR-HELP").collection("POOR-HELP");
    
    app.post('/addPoorHelp', (req, res) => {
        const poorHelp = req.body;
        poorHelpCollection.insertOne(poorHelp)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    })

    app.get('/allPoorHelp', (req, res) => {
        poorHelpCollection.find({})
        .toArray((error, result) => {
            res.send(result)
        })
    })

    app.delete('/deletePoorHelp/:id', (req, res) => {
        console.log(req.params.id);
        poorHelpCollection.deleteOne({_id: ObjectId(req.params.id)})
        then(result => {
            res.send(result.deletedCount > 0)
        })
    } )
})



// poor help ends here

// all work start here

client.connect(err => {

    const allWorkCollection = client.db("YSF-ALL-WORK").collection("ALL-WORK");
            app.post("/addAllWork", (req, res) => {
                const allWork = req.body;
                allWorkCollection.insertOne(allWork)
                .then(result => {
                    res.send(result.insertedCount > 0)
                })
            })

            app.get('/allWorkLoad', (req, res) => {
                allWorkCollection.find({})
                .toArray((error, result) => {
                    res.send(result)
                })
            })

            app.delete('/allWorkDelete/:id', (req, res) => {
                console.log(req.params.id);
                allWorkCollection.deleteOne({_id: ObjectId(req.params.id)})
                .then(result => {
                    res.send(result.deletedCount > 0)
                })
            })
})

// all work ends here












app.get('/', (req, res) => {
    res.send('Hello Fahim mama!')
})

app.listen(port, () => {
    console.log(`iam starting`)
})
