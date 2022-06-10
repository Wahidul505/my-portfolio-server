const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.opw0q.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        client.connect();
        const projectCollection = client.db('my_portfolio').collection('projects');

        app.get('/project', async (req, res) => {
            const projects = await projectCollection.find().toArray();
            res.send(projects);
        });

        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const project = await projectCollection.findOne({ _id: ObjectId(id) });
            res.send(project);
        })
    }
    finally { }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('started');
});

app.listen(port, () => console.log('listening to port,', port)); 