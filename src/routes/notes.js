const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const {isAuthenticated} = require('../helpers/auth');

module.exports = router;

router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find({user: req.user.id}).lean().sort({date: 'desc'});
    res.render('notes/notes', {notes});
});

router.get('/notes/create', isAuthenticated, (req, res) => {
    res.render('notes/create');
});

router.post('/notes/save', isAuthenticated, async (req, res) => {
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
        newNote.user = req.user.id,
        await newNote.save();
        req.flash('success_msg', 'Nota agregada!');
        res.redirect('/notes')
    }
});

router.get('/notes/update/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/update', {note});
});

router.put('/notes/upgrade/:id', isAuthenticated, async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description}).lean();
    req.flash('success_msg', 'Nota actualizada!');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id).lean();
    req.flash('success_msg', 'Nota eliminada!');
    res.redirect('/notes');
});