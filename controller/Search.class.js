/**
 * Autor Vinicius <dias.viniciuscesar@gmail.com>
 * Desde 17/07/2019 v0.1
 */
var Search = function(){};

Search.dataList = [];

/**
 * Executa a busca e retorna o resultado
 */
Search.search = function(all){
	let output = [];
	
	// input
	let q         = all.req.query.q;
	let limit     = all.req.query.limit;
	let page      = all.req.query.page;
	let sortField = all.req.query.sortField;
	let sortType  = all.req.query.sortType;
	
	let qArray = q.split(" ");
	
	// validação
	if(q.length <= 1){
		throw "Pesquisa muito curta, mínimo 2 caracteres";
	}
	
	// filtrando e classificando
	for(let i in Search.dataList){
		let data = Search.dataList[i];
		
		// verificando se algum pedaço esta no produto
		let find = false;
		for(let j in qArray){
			if(data.all.indexOf(qArray[j]) != -1){
				find = true;
				break;
			}
		}
		if(!find){
			continue;
		}
		
		// campo para ordenação por relevancia
		data.relevance1 = 0;
		data.relevance2 = 0;
		
		// igual ao código do produto
		if(q == data.productid){
			data.relevance1 = 1;
		}
		
		// no começo do título
		if(data.name.toLowerCase().indexOf(q.toLowerCase()) == 0){
			data.relevance2 = 1;
		}
		
		output.push(data);
	}
	
	// ordenando
	let sort = {};
	let validFields = ["relevance","price","stock","sales_count"];
	
	if(validFields.includes(sortField)){
		if(sortType != "desc"){
			sortType = "asc";
		} 
		eval('sort = {'+sortField+': "'+sortType+'"};');
	}else{
		sort = {relevance1: "desc",relevance2: "desc"};	
	}
	
	output.keySort(sort);
	
	return output;
}

/**
 * Atualiza os dados
 */
Search.update = function(dataList){
	if(!Array.isArray(dataList)){
		throw "Parâmetro inválido, envie um array de objetos JSON";
	}
	
	for(let i in dataList){
		let data = dataList[i];
		data.all = (data.name+" "+data.brand+" "+data.category+" "+data.keywords).toLowerCase();
		dataList[i] = data;
	}
	
	Search.dataList = dataList;
}

/**
 * Ordenação de array de objetos
 * 
 * Exemplo de uso
 * var sorto = { SCORE:"desc",TIME:"asc", AGE:"asc" };
 * obja.keySort(sorto);
 * 
 * @source https://stackoverflow.com/questions/2784230/how-do-you-sort-an-array-on-multiple-columns
 */
Array.prototype.keySort = function(keys) {

	keys = keys || {};

	// via
	// https://stackoverflow.com/questions/5223/length-of-javascript-object-ie-associative-array
	var obLen = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key))
	            size++;
	    }
	    return size;
	};

	// avoiding using Object.keys because I guess did it have IE8 issues?
	// else var obIx = function(obj, ix){ return Object.keys(obj)[ix]; } or
	// whatever
	var obIx = function(obj, ix) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            if (size == ix)
	                return key;
	            size++;
	        }
	    }
	    return false;
	};

	var keySort = function(a, b, d) {
	    d = d !== null ? d : 1;
	    // a = a.toLowerCase(); // this breaks numbers
	    // b = b.toLowerCase();
	    if (a == b)
	        return 0;
	    return a > b ? 1 * d : -1 * d;
	};

	var KL = obLen(keys);

	if (!KL)
	    return this.sort(keySort);

	for ( var k in keys) {
	    // asc unless desc or skip
	    keys[k] = 
	            keys[k] == 'desc' || keys[k] == -1  ? -1 
	          : (keys[k] == 'skip' || keys[k] === 0 ? 0 
	          : 1);
	}

	this.sort(function(a, b) {
	    var sorted = 0, ix = 0;

	    while (sorted === 0 && ix < KL) {
	        var k = obIx(keys, ix);
	        if (k) {
	            var dir = keys[k];
	            sorted = keySort(a[k], b[k], dir);
	            ix++;
	        }
	    }
	    return sorted;
	});
	return this;
};

module.exports = Search;