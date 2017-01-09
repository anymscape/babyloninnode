# babyloninnode
SOLUTION: .babylon files, exported from blender, loading in NodeJS, via dynamic MIME type.

The following solution is a Node.JS server for babylon.js development, with a .babylon MIME type, to export 3D meshes from Blender.

Two example BABYLON requests are included:
   1) .babylon using BABYLON AssetsManager
   2) .babylon using BABYLON SceneLoader.ImportMesh
   
Primary solution to load .babylon in Node.js is summarized <-- in three steps below:

   1) ADD this Mime type into an array of all supported MIME types:
		var extensions = [".babylon" : "application/babylon"]                  //<--- ADD .babylon MIME type.
   2) Then, within the Node createServer handler:
        http.createServer(function(){//populate following here});
   3) Initialize dynamic mimeType variable like this:
        var fileName = path.basename(req.url) || 'index.html',
            ext = path.extname(fileName);
        var mimeType = extensions[ext];                                      //<-- INIT dynamic MIME type. 
   4) Populate response Content-type, like this:
		fs.readFile(filePath,function(err,contents){
			if(!err){
				res.writeHead(200,{
					"Content-type" : mimeType,                               //<-- SET dynamic MIME type.
					"Content-Length" : contents.length
				});
				res.end(contents);
			}
		});

Entire Code Solution Available on github here:
https://github.com/anymscape/babyloninnode

INSTRUCTIONS for use:
clone or download, then with node.js installed, and in the root directory, cmd line:

node server
   
RESULT:
 - a bunch of complex mesh objects exported from blender into .babylon file, loaded by Node server via dynamic MIME type.
 - simple exported materials.
 - loading indicator.
 - animated orbiting lights from babylon playground.
   
Credit: original node tutorial by Kevin Chisholm revealed dynamic Mime Types setup in NodeJS (hard to find):
https://blog.kevinchisholm.com/javascript/node-js/making-a-simple-http-server-with-node-js-part-iv/
It provides a very good Node.js template for setting up a simple (standalone) node/babylon.js server. 
Just include the solution above to send NodeJS to 3D with BabylonJS.


License MIT & njoy.