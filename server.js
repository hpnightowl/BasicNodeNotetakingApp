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

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
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
        // remove note
        const newNotes = notes.filter(note => note.title !== argv.title);
        // write notes.json
        fs.writeFileSync('notes.json', JSON.stringify(newNotes));
        console.log('Note removed successfully');
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: function () {
        // saving in json file
        const fs = require('fs');
        // create notes.json if not exists
        if (!fs.existsSync('notes.json')) {
            fs.writeFileSync('notes.json', '[]');
        }
        // read notes.json
        const notes = JSON.parse(fs.readFileSync('notes.json'));
        // print notes
        notes.forEach(note => console.log(note.title));
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
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
        // print note
        const note = notes.find(note => note.title === argv.title);
        if (note) {
            console.log(note.title);
            console.log(note.body);
        } else {
            console.log('Note not found');
        }
    }
})

yargs.parse();