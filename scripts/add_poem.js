const fs = require('fs');

function addPoem(newPoem) {
    fs.readFile('poems.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        let poems;
        try {
            poems = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return;
        }
        poems.push(newPoem);
        fs.writeFile('poems.json', JSON.stringify(poems, null, 2), (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
                return;
            }
            console.log('Poem added successfully!');
        });
    });
}

module.exports = addPoem;