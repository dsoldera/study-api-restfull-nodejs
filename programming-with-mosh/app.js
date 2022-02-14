const Joi = require('joi'); // what return from this plugin is a Class
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/', (req, res) =>{
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});


app.post('/api/courses', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (!req.body.name || req.body.length < 3) {
        // 400 Bad request
        res.status(400).send('Name is required a should be minimum 3 characters')
        return ;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // caso o curso nao seja localizado vai retornar status 404 e uma mensagem ao usuario.
    if(!course) res.status(404).send('The course with the given ID was not found.'); 
    // caso positivo, retorna course solicitado
    res.send(course);
});


/* app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params.id); // enviando de volta o parametro enviado na URL
    res.send(req.params); // enviando de volta os parametros da requisição
    res.send(req.query); // retorna a query de procura que veio da requisiçao
});*/

const port = process.env.PORT || 3000; // essa é porta de acordo com o ambiente
// On windows?? e Linux set o comando para definir a porta como: export PORT=5000

app.listen(port, () => console.log(`Server running on port ${port}...`));


