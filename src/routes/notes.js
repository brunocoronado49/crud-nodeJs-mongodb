const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

module.exports = router;

router.get('/notes', async (req, res) => {
    const notes = await Note.find({}).lean().sort({date: 'desc'});
    res.render('notes/notes', {notes});
});

router.get('/notes/create', (req, res) => {
    res.render('notes/create');
});

router.post('/notes/save', async (req, res) => {
    const {title, description} = req.body;
    const errors = [];
    if(!title) {
        errors.push({text: 'Ingresa un título'});
    }
    if(!description) {
        errors.push({text: 'Ingresa una descripción'});
    }
    if(errors.length > 0) {
        res.render('notes/create', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({title, description});
        await newNote.save();
        req.flash('success_msg', 'Nota agregada!');
        res.redirect('/notes')
    }
});

router.get('/notes/update/:id', async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/update', {note});
});

router.put('/notes/upgrade/:id', async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description}).lean();
    req.flash('success_msg', 'Nota actualizada!');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id).lean();
    req.flash('success_msg', 'Nota eliminada!');
    res.redirect('/notes');
});