var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(
	function(request,response){
    var _url = request.url;
		// console.log(_url);						// /?id=HTML

		var queryData = url.parse(_url, true).query;
		// console.log(queryData);					// [Object: null prototype] { id: 'HTML' }
		// console.log(queryData.id);				// HTML
		var title = queryData.id;

    if(_url == '/'){
      title = 'Welcome';
    }

    if(_url == '/favicon.ico'){
      // return response.writeHead(404);
			response.writeHead(404);
			response.end();
			return;
    }

    response.writeHead(200);

		fs.readFile(`./data/${queryData.id}`, 'utf-8', (err, data) => {
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
				${data}
				</p>
			</body>
			</html>`;

			// console.log(__dirname + _url);													// /Users/birdcagedout/Dev/egoing_express/index.html
    	// response.end(fs.readFileSync(__dirname + _url));
			response.end(template);
		});
 
});

app.listen(3000);