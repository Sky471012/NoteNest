const Note = require("../models/Note");

// Get all user's notes
exports.getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ owner: req.user }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        next(error);
    }
};

// Create note
exports.createNote = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        if (!title?.trim()) {
            return res.status(400).json({ message: "Title is required" });
        }

        const note = await Note.create({
            title,
            content,
            owner: req.user
        });

        res.status(201).json(note);
    } catch (error) {
        next(error);
    }
};

// Update note
exports.updateNote = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        if (title !== undefined && !title.trim()) {
            return res.status(400).json({ message: "Title cannot be empty" });
        }

        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, owner: req.user },
            { title, content },
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(note);
    } catch (error) {
        next(error);
    }
};

// Delete note
exports.deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            owner: req.user
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        next(error);
    }
};