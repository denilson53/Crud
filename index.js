const express = require ("express")
const app = express ()
const bodyParser = require ("body-parser")
const connection = require('./database/database')
const slugfy = require ('slugify');


const Category = require('./categories/Category');

//View engine
app.set('view engine','ejs')

// Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database
connection
.authenticate()
.then(() => {
  console.log('Conexão feita com sucesso ao banco!')
}).catch((error) => {
  console.log(error);
})

//Principal
app.get('/', (req , res) =>{

    Category.findAll().then(categories =>{
      res.render('index', {categories : categories})
    });
  });

//Adição de Usuairo
app.get('/new', (req ,res) => {
    res.render('new')
 })

app.post('/categories/save',(req, res) => {
    var nome = req.body.nome; 
    var sobrenome = req.body.sobrenome;
    var email = req.body.email;
    var telefone = req.body.telefone;


  
    if(nome != undefined){
  
      Category.create({
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        telefone:telefone
       

 
  
      }).then(() =>{
        res.redirect('/');
      })
  
    }else{
    res.redirect('new');
    }
  
  });

  //Deletar
  app.post('/categories/delete', (req, res) =>{
    var id = req.body.id;
    if(id !=undefined){
      if(!isNaN(id)){
      
        Category.destroy({
          where: {
            id: id
          }
  
        }).then(() => {
          res.redirect('/');
        });
  
  
      }else{ // NÃO FOR UM NÚMERO
        res.redirect('/');
      }
  
    }else{ //NULL
      res.redirect('/');
    }
  })

//Update
app.get('/edit/:id', (req, res) => {
    var id = req.params.id;
  
    if(isNaN(id)){
      res.redirect('/')
    }
  
    Category.findByPk(id).then(category => {
      if(category != undefined){
  
        res.render('edit',{category: category})
  
      }else{
        res.redirect('/')
      }
  
    }).catch(erro => {
      res.redirect('/')
    })
  });

  app.post('/categories/update', (req,res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var email = req.body.email;
    var telefone = req.body.telefone;

    Category.update({nome: nome, sobrenome: sobrenome, email: email, telefone:telefone}, {
      where: {
        id: id}
    }).then(() =>{
      res.redirect('/')
    })
  })
  





app.listen(8080, () =>{
    console.log('O Servido esta rodando!')
})
