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
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end('About');
		break;
		default:
			res.writeHead(404, {'Content-Type': 'text/html'});
			res.end('Not found');
		break;
	}
	
}).listen(3000);

console.log("Server en puerto 3000; presiona Ctrl+C para terminarlo.....");


	
