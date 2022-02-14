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

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // caso o curso nao seja localizado vai retornar status 404 e uma mensagem ao usuario.
    if(!course) return res.status(404).send('The course with the given ID was not found.'); 
    // caso positivo, retorna course solicitado
    res.send(course);
});

/* app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params.id); // enviando de volta o parametro enviado na URL
    res.send(req.params); // enviando de volta os parametros da requisição
    res.send(req.query); // retorna a query de procura que veio da requisiçao
});*/


app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Check if the Course exist
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');

    // const result = validateCourse(req.body); // result.error
    const { error } = validateCourse(req.body); // Using JS Object destructuring
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name; // Update the Course
    res.send(course);
    
});

app.delete('/api/courses/:id', (req, res) => {
    
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.'); 

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    // Validate using schema
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000; // essa é porta de acordo com o ambiente
// On windows?? e Linux set o comando para definir a porta como: export PORT=5000

app.listen(port, () => console.log(`Server running on port ${port}...`));


