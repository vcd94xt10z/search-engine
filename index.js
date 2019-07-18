/**
 * Autor Vinicius
 * Desde 17/07/2019
 */
const express    = require('express');
const bodyParser = require('body-parser');
const search     = require('./controller/Search.class.js');

const app = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  res.header('Cache-Control', 'private, no-cache, no-store');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  
  next();
});

Object.data = [];
Object.set = function(key,value){
	Object.data[key] = value;
}

Object.get = function(key){
	return Object.data[key];
}

/**
 * Busca
 * @param req
 * @param res
 * @returns
 */
app.get('/search/', function(req, res) {
	let all = {req:req,res:res};
	
	try {
		let resultList = search.search(all);
		res.status(200).send(resultList);
	}catch(e){
		console.log(e);
		res.status(500).send(e);
	}
});

/**
 * Atualização de dados
 * @param req
 * @param res
 * @returns
 */
app.post('/update/', function(req, res) {
	try {
		search.update(req.body);
		res.status(200).send("Dados atualizados");
	}catch(e){
		res.status(400).send(e);
	}
});

// manipulador de erros
app.use(function(err, req, res, next) {
	console.error(err.stack);
    res.status(500).send('Serviço indisponível');
});

// escutando porta
app.listen(3000, function () {
	console.log("");
	console.log('NodeJS rodando na porta 3000');
	console.log('Aguardando novos clientes');
	console.log("");
	console.log('URIs disponíveis:');
	console.log('GET /search/');
	console.log('POST /update/');
	console.log("");
});