const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../helpers/auth');
const {
    renderNotes,
    renderCreateNoteForm,
    saveNewNote,
    renderEditNoteForm,
    updateNote,
    deleteNote,
} = require('../controllers/notesController');

module.exports = router;

// Render all notes
router.get('/notes', isAuthenticated, renderNotes);

// Render create a new note form
router.get('/notes/create', isAuthenticated, renderCreateNoteForm);

// Save the new note
router.post('/notes/save', isAuthenticated, saveNewNote);

// Edit note form
router.get('/notes/update/:id', isAuthenticated, renderEditNoteForm);

// Update note
router.put('/notes/upgrade/:id', isAuthenticated, updateNote);

// Delete note
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;
