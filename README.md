# search-engine

Serviço de busca em NodeJS

## Serviços

- POST /update/ Atualiza os dados usados na busca
- GET /search/ Executa uma busca nos dados e retorna o resultado

## Exemplos

```javascript
Request
POST /update/
Body

[
	{
		"productid":"P1", 
	  "name": "Pilha Pilhamax",
		"category": "Pilhas", 
		"brand": "Duramax",
		"keywords": "pilha,duramax,energia",
		"price": 11.5, 
		"stock": 2, 
		"sales_count": 2
	},
	{
		"productid":"T1", 
	  "name": "Teclado Turbo Teclamax",
		"category": "Teclados", 
		"brand": "Teclamax",
		"keywords": "teclado,tecla",
		"price": 12.12, 
		"stock": 22, 
		"sales_count": 3
	},
	{
		"productid":"T2", 
	  "name": "Teclado Tabajara Teclamax",
		"category": "Teclados", 
		"brand": "Teclamax",
		"keywords": "teclado,tecla",
		"price": 3.52, 
		"stock": 2, 
		"sales_count": 40
	},
	{
		"productid":"T3", 
	  "name": "Teclado Gamer Teclamax",
		"category": "Teclados", 
		"brand": "Teclamax",
		"keywords": "teclado,tecla",
		"price": 12.12, 
		"stock": 1, 
		"sales_count": 10
	}
] 

Response
Status: 200
Body: none
```

```javascript
Request
GET /search/?q=Termo de Busca&sortField=price&sortType=desc
Body: none

Response
Status: 200
Body

[
  {
    "productid": "T1",
    "name": "Teclado Turbo Teclamax",
    "category": "Teclados",
    "brand": "Teclamax",
    "keywords": "teclado,tecla",
    "price": 12.12,
    "stock": 22,
    "sales_count": 3,
    "all": "teclado turbo teclamax teclamax teclados teclado,tecla",
    "relevance1": 0,
    "relevance2": 1
  },
  {
    "productid": "T3",
    "name": "Teclado Gamer Teclamax",
    "category": "Teclados",
    "brand": "Teclamax",
    "keywords": "teclado,tecla",
    "price": 12.12,
    "stock": 1,
    "sales_count": 10,
    "all": "teclado gamer teclamax teclamax teclados teclado,tecla",
    "relevance1": 0,
    "relevance2": 1
  },
  {
    "productid": "T2",
    "name": "Teclado Tabajara Teclamax",
    "category": "Teclados",
    "brand": "Teclamax",
    "keywords": "teclado,tecla",
    "price": 3.52,
    "stock": 2,
    "sales_count": 40,
    "all": "teclado tabajara teclamax teclamax teclados teclado,tecla",
    "relevance1": 0,
    "relevance2": 1
  }
]
```

