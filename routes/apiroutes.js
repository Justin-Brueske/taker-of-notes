const router = require("express").Router();
const path = require('path');
const fs = require("fs");
const util = require('util');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');



// get api/notes db.json
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });



// post api/notes db.json
router.post('/notes', (req, res) => {
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
router.delete('/notes/:id', (req, res) => {
    let noteId = req.params.id;
    let data = JSON.parse(fs.readFileSync("./db/db.json")).filter(currentNote => {
        return currentNote.id != noteId;
    });
    writeToFile('./db/db.json', data);
    res.json('./db/db.json');
});



module.exports = router;