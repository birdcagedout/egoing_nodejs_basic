const testFolder = '.';							// '.' 또는 './' ==> 어떻게 적어도 뒤에 /를 붙여준다
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
	files.forEach(
		(file) => {
			console.log(file);
		}
	);
});

