const fs = require('fs');

try {
    const data = fs.readFileSync('./words-test.txt', 'utf8');
    console.log(data.toString().split('\r\n'));
} catch (err) {
    console.error(err);
}