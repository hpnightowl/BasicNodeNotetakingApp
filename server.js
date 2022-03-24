const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        // saving in json file
        const fs = require('fs');
        // create notes.json if not exists
        if (!fs.existsSync('notes.json')) {
            fs.writeFileSync('notes.json', '[]');
        }
        // read notes.json
        const notes = JSON.parse(fs.readFileSync('notes.json'));
        // add new note
        notes.push({
            title: argv.title,
            body: argv.body
        });
        // write notes.json
        fs.writeFileSync('notes.json', JSON.stringify(notes));
        console.log('Note added successfully');
    }
})

yargs.parse();