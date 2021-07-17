const Note = require('../models/Note');

const notesExport = {};

// Render all notes
notesExport.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id})
    .sort({date: "desc"})
    .lean();
    res.render('notes/notes', {notes});
}

// Render create a new note form
notesExport.renderCreateNoteForm = (req, res) => res.render('notes/create');

// Save the new note created
notesExport.saveNewNote = async (req, res) => {
    const {title, description} = req.body;
    const errors = [];

    if(!title) {
        errors.push({text: 'Por favor ingresa un titulo.'});
    }

    if(!description) {
        errors.push({text: 'Por favor ingresa una descripcion.'});
    }

    if(errors.length > 0) {
        res.render('notes/create', {
            errors,
            title,
            description,
        });
    } else {
        const newNote = new Note({title, description});
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Nota agregada exitosamente.');
        res.redirect('/notes');
    }
}

// Edit note form
notesExport.renderEditNoteForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if(note.user != req.user.id) {
        req.flash('error_msg', 'No estas autorizado.');
        return res.redirect('/notes');
    }
    res.render('notes/update', {note});
}

// Update notes
notesExport.updateNote = async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Nota actualizada exitosamente.');
    res.redirect('/notes');
}

// Delete note
notesExport.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada exitosamente.');
    res.redirect('/notes');
}

module.exports = notesExport;