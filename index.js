const Joi = require('joi');
const express = require('express');
const res = require('express/lib/response');
const app = express();
//import json express for the get update and delete post api
app.use(express.json());
//list with products in the api
const product = [
  {id:1, name:'product'},
];

//fetch all products in the API
app.get('/api/product',(req, res) =>{
    res.send(product);
});

//fetch only one product in the API specifying by id
app.get('/api/product/:id',(req, res) =>{
  const products = product.find(c => c.id === parseInt(req.params.id));
  if(!products) return res.status(404).send('The products with the given id was not found.');
    res.send(products);
});

//post send one product for the api add in the list 
app.post('/api/product',(req,res) =>{
  const {error} = validateProduct(req.body);
 if(error){

  res.status(400).send(error.details[0].message);
  return;
}


  const products = {
    id: product.length + 1,
    name: req.body.name
  };
  product.push(products);
  
  res.send(products);

});
//update an product existing in the API especifying by id
app.put('/api/product/:id',(req,res) =>{
  const products = product.find(c => c.id === parseInt(req.params.id));
  if(!products) return res.status(404).send('The product with the given id was not found.');
 
  
   const result = validateProduct(req.body);
   const {error} = validateProduct(req.body);
 if(error) return res.status(400).send(error.details[0].message);



  products.name = req.body.name;
  res.send(products);

});

/*this function validate the product checking if characters
 in the name is greater than 3 ,if so ,
 it's runs normaly if not it display a message on the screen */
function validateProduct(products){
  const schema = {
    name:Joi.string().min(3).required()
  };
    return Joi.validate(products,schema);
}
///this function delete the product the list 
app.delete('/api/product/:id',(req,res) =>{
  const products = product.find(c => c.id === parseInt(req.params.id));
  if(!products) res.status(404).send('The product with the given id was not found.');

  const index = product.indexOf(products);
  product.splice(index,1);

  res.send(products);
});

//try runs port 3000 if not it runs on the port especified by the server

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on Port ${port}`));