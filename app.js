var http = require('http'),
	fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
	if (!responseCode){ 
		responseCode = 200;
	}

	fs.readFile(__dirname + path, function(err, data){
		if(err){
			res.writeHead(500, { 'Content-Type': 'text/plain'});
			res.end('500 - Internal server error');
		} else {
			res.writeHead(responseCode, {'Content-Type' : contentType});
			res.end(data);
		}
	})
}

http.createServer(function(req,res){
	// normalize url by removing querystring, optional
	// trailing slash, and making it lowercase
	var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
	switch(path){
		case '':
			serveStaticFile(res, '/public/home.html', 'text/html');
		break;
		case '/about':
			serveStaticFile(res, '/public/about.html', 'text/html');
		break;
		case '/img/logo.jpg':
			serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');
		break;
		case '/img/logo.png':
			serveStaticFile(res, '/public/img/logo.png', 'image/png');
		break;
		default:
			serveStaticFile(res, '/public/404.html', 'text/html');
		break;
	}
}).listen(3000);

console.log("Server en puerto 3000; presiona Ctrl+C para terminarlo.....");


	
