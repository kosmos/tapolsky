'use strict';


const fs = require('fs');
const mkdirp = require('mkdirp');

let blockName = process.argv[2];
let extensions = [];

extensions = uniqueArray(extensions.concat(process.argv.slice(3)));

// Путь к папке с блокам
let basePath = 'src/blocks/';

// Шаблоны
let templates = [
		{
			type: 'necessary',
			ext: 'jade',
			tpl: 'mixin b_{blockName}(data)\n\t+b.{blockName}&attributes(attributes)\n\t\t\n'
		},
		{
			type: 'necessary',
			ext: 'scss',
			tpl: '.{blockName} {\n\t//\n}\n'
		},
		{
			type: 'optional',
			ext: 'js',
			tpl: '// (function(){\n// \n// }());\n'
		},
		{
			type: 'optional',
			ext: 'yml',
			path: 'data',
			tpl: '---\n  {blockName}:\n    default:\n      \n'
		},
		{
			type: 'optional',
			ext: 'json',
			path: 'data',
			tpl: '{\n\t"{blockName}": {\n\t\t"default": {}\n\t}\n}'
		}
	];


// Если есть имя блока
if (blockName) {

	let dirPath = basePath + blockName + '/'; // полный путь к создаваемой папке блока

	// создаем
	mkdirp(dirPath, function(err) {

		// Если какая-то ошибка — покажем
		if (err) {
			console.error('Отмена операции: ' + err);
		}

		// Нет ошибки, поехали!
		else {
			console.log('Создание папки ' + dirPath + ' (создана, если ещё не существует)');

			// Обходим массив расширений и создаем файлы, если они еще не созданы
			templates.forEach(function(template) {
				let filePath = dirPath + blockName + '.' + template.ext;
				let fileContent = template.tpl.replace(/{blockName}/g, blockName);
				let fileCreateMsg = '';

				if (typeof template.path !== 'undefined') {
					if (extensions.indexOf(template.ext) >= 0) {
						mkdirp(dirPath + template.path);
						filePath = dirPath + template.path + '/' + blockName + '.' + template.ext;
					}
				}


				if (template.type !== 'optional') {
					writeFile(filePath, fileContent, fileCreateMsg);
				}
				else {
					if (extensions.indexOf(template.ext) >= 0) {
						writeFile(filePath, fileContent, fileCreateMsg);
					}
				}

			});
		}
	});
} else {
	console.log('Отмена операции: не указан блок');
}

// Оставить в массиве только уникальные значения (убрать повторы)
function uniqueArray(arr) {
	var objectTemp = {};
	for (var i = 0; i < arr.length; i++) {
		var str = arr[i];
		objectTemp[str] = true; // запомнить строку в виде свойства объекта
	}
	return Object.keys(objectTemp);
}

// Проверка существования файла
function fileExist(path) {
	const fs = require('fs');
	try {
		fs.statSync(path);
	} catch (err) {
		return !(err && err.code === 'ENOENT');
	}
};

function writeFile(filePath, fileContent, fileCreateMsg) {
	if (fileExist(filePath) === false) {
		fs.writeFile(filePath, fileContent, function(err) {
			if (err) {
				return console.log('Файл НЕ создан: ' + err);
			}
			console.log('Файл создан: ' + filePath);
			if (fileCreateMsg) {
				console.warn(fileCreateMsg);
			}
		});
	} else {
		console.log('Файл НЕ создан: ' + filePath + ' (уже существует)');
	}
};
