const router = require("express").Router();
// const db = require("../db/db.json");
const path = require('path');
const fs = require("fs");
const util = require('util');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');



// get api/notes should read db.json return all notes is json
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });



// post api/notes db.json
router.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);
  
    const { title, text, id } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json('./db/db.json');
    } else {
      res.error('Error in adding note');
    }

  });

// delete api/notes/:id
// taking it all with ids and sticking it in own array and adding array 
router.delete('/notes/:id', (req, res) => {
    let noteId = req.params.id;
    console.log(`\n\nDELETE note request for noteId: ${noteId}`);
    let data = JSON.parse(fs.readFileSync("./db/db.json")).filter(currentNote => {
        return currentNote.id != noteId;
    });
    console.log(data);
    writeToFile('./db/db.json', data);
    console.log(`\nSuccessfully deleted note with id : ${noteId}`);
    res.json('./db/db.json');
});



module.exports = router;