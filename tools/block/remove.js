'use strict';

const fs = require('fs');

let blockName = process.argv.slice(2).join(' ');
let basePath = 'src/blocks/';

let filePath = basePath + blockName;

if (blockName) {
	deleteFolderRecursive(filePath);
	console.log('Блок "' + blockName + '" удален!');
}

function deleteFolderRecursive (path) {
	if( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file,index) {
			var curPath = path + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) {
				// recurse
				deleteFolderRecursive(curPath);
			}
			else {
				// delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};
