# babyloninnode
ISOLATED SOLUTION: showing .babylon files, exported from blender, loading in NodeJS, via dynamic MIME type.

Two example requests included:

   1) .babylon using BABYLON AssetsManager
   
   2) .babylon using BABYLON SceneLoader.ImportMesh
   
## Dynamic MIME types in Node.js:

   1) ADD Mime type into an array of all supported MIME types:

		var extensions = [".babylon" : "application/babylon"] 

   2) Within Node createServer() handler:

        http.createServer(function(){...});

   3) Initialize a dynamic mimeType variable from given file type:

        var fileName = path.basename(req.url) || 'index.html',
            ext = path.extname(fileName);
        var mimeType = extensions[ext];     
 
   4) Populate response Content-type:

		fs.readFile(filePath,function(err,cont){
			if(!err){
				res.writeHead(200,{
					"Content-type" : mimeType
				});
				res.end(cont);
			}
		});

## Usage:
After clone, with node installed, at root, type in command line: node server
  
## Credit: 
A great blog tutorial by Kevin Chisholm showed how to set up dynamic Mime Types in NodeJS:
https://blog.kevinchisholm.com/javascript/node-js/making-a-simple-http-server-with-node-js-part-iv/
. It provides a very good baseline Node.js template for node/babylon.js server, if you need one. 

## Result: 
3D (and VR) in Node.js, thanks to Blender: https://www.blender.org/ and BabylonJS: http://babylonjs.com/.
 

License MIT. 
njoy.
