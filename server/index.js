const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./connection');
const bodyParser = require('body-parser')

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


app.get('/', (req, res) => {
    const sqlSelect = 'SELECT * FROM students'

    db.query(sqlSelect, (err, result) =>{
        if (err) return res.send({MessageChannel:"Error in the server"});
        res.send(result)
    })
})

// app.get('/', (req, res) => {

//     const { search } = req.query;

//     const key = [Nom, Email]

//     const searchFunction = (data) => {
//         return data.filter((item)=>
//             key.some((key) => item[key].toLowercase().includes(search))
//         )

//     }

    

// })



app.post('/students', (req,res) =>{

    const Insert="INSERT INTO students (Nom, Email, Annee) VALUES (?,?,?)";
    console.log(req.body);
    
    const nom = req.body.nom;
    const email = req.body.email;
    const annee = req.body.annee;
        
    db.query(Insert, [nom,email,annee] , (err, result) =>{
        if (err) {
            console.log(err)
        } else {
            res.send('Insertion réussie')
        }
    })
})

app.get('/read/:id', (req, res) => {
    const id = req.params.id;
    const sqlSelect = 'SELECT * FROM students WHERE id = ?'

    db.query(sqlSelect,[id], (err, result) =>{
        if (err) return res.send({MessageChannel:"Error in the server"});
        res.send(result)
    })
})

app.put('/edit/:id', (req, res) =>{
    
    const nom = req.body.nom;
    const email = req.body.email;
    const annee = req.body.annee;
    const id = req.params.id;
    const sqlUpdate = 'UPDATE students SET `Nom`=?, `Email`=? `Annee`=? WHERE `id`=?'

    db.query(sqlUpdate,[nom, email, annee, id], (err, result) =>{
        if (err) return res.send({MessageChannel:"Error in the server"});
        res.send(result)
    })

})

app.delete('/delete/:id' , (req, res) =>{
    const id = req.params.id;

    const sqlDelete = 'DELETE  FROM students WHERE `id`=?';
    
    db.query(sqlDelete, id, (err, result)=>{
        if (err) return res.send({MessageChannel:"Error in the server"});
        res.send(result)
    })

})
 
app.listen(3001, ()=>{ 
    console.log('Running on port 3001'); 
} ) 