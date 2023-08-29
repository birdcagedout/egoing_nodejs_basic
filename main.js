// 생활코딩(egoing)님의 nodejs 강의: node.js 기초
// 
// 블로그: https://opentutorials.org/module/3549/21032
// 유튜브: https://www.youtube.com/playlist?list=PLuHgQVnccGMA9QQX5wqj6ThK7t2tsGxjm

var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(
	function(request,response){
    var _url = request.url;
		// console.log(_url);						// /?id=HTML

		var queryData = url.parse(_url, true).query;
		console.log(queryData);							// [Object: null prototype] { id: 'HTML' }
		// console.log(queryData.id);				// HTML
		var title = queryData.id;

		console.log(url.parse(_url, true));
		// 만약 http://localhost:3000 라고 입력했다면 (맨 뒤에 /는 자동으로 붙어서)
		// Url {
		// 	protocol: null,
		// 	slashes: null,
		// 	auth: null,
		// 	host: null,
		// 	port: null,
		// 	hostname: null,
		// 	hash: null,
		// 	search: null,
		// 	query: [Object: null prototype] {},					// 이 경우 queryData.id === undefined
		// 	pathname: '/',
		// 	path: '/',
		// 	href: '/'
		// }

		// 만약 http://localhost:3000/?id=HTML 라고 입력했다면
		// Url {
		// 	protocol: null,
		// 	slashes: null,
		// 	auth: null,
		// 	host: null,
		// 	port: null,
		// 	hostname: null,
		// 	hash: null,
		// 	search: '?id=HTML',
		// 	query: [Object: null prototype] { id: 'HTML' },
		// 	pathname: '/',
		// 	path: '/?id=HTML',
		// 	href: '/?id=HTML'
		// }

		// 만약 http://localhost:3000/api/user?id=HTML 라고 입력했다면
		// Url {
		// 	protocol: null,
		// 	slashes: null,
		// 	auth: null,
		// 	host: null,
		// 	port: null,
		// 	hostname: null,
		// 	hash: null,
		// 	search: '?id=HTML',
		// 	query: [Object: null prototype] { id: 'HTML' },
		// 	pathname: '/api/user',
		// 	path: '/api/user?id=HTML',
		// 	href: '/api/user?id=HTML'
		// }


		var pathname = url.parse(_url, true).pathname;
		if(pathname === '/') {
			// 홈(WEB)
			if(queryData.id === undefined) {
				var title = 'Welcome';
				var intro = 'Hello, node.js';
			}
			// HTML
			else if(queryData.id === 'HTML') {
				var title = 'HTML';
			}
			// CSS
			else if(queryData.id === 'CSS') {
				var title = 'CSS';
			}
			// JavaScript
			else if(queryData.id === 'JavaScript') {
				var title = 'JavaScript';
			}
			// 그 외
			else {
				response.writeHead(404);
				response.end('Not Found');
			}

			fs.readFile(`./data/${queryData.id}`, 'utf-8', (err, description) => {
				var template = `
				<!doctype html>
				<html>
				<head>
					<title>WEB1 - ${title}</title>
					<meta charset="utf-8">
				</head>
				<body>
					<h1><a href="/">WEB</a></h1>
					<ol>
						<li><a href="/?id=HTML">HTML</a></li>
						<li><a href="/?id=CSS">CSS</a></li>
						<li><a href="/?id=JavaScript">JavaScript</a></li>
					</ol>
					<h2>${title}</h2>
					<p>
					${intro ?? description}
					</p>
				</body>
				</html>`;
	
				response.writeHead(200);
				// console.log(__dirname + _url);													// /Users/birdcagedout/Dev/egoing_express/index.html
				// response.end(fs.readFileSync(__dirname + _url));
				response.end(template);
			});	
		} else {
			response.writeHead(404);
			response.end('Not Found');
		}


		 
});

app.listen(3000);