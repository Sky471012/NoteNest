import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [form, setForm] = useState({ title: "", content: "" });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch notes
    const fetchNotes = async () => {
        try {
            const { data } = await api.get("/notes");
            setNotes(data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load notes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    // Create or update note
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (editingId) {
                await api.put(`/notes/${editingId}`, form);
            } else {
                await api.post("/notes", form);
            }

            setForm({ title: "", content: "" });
            setEditingId(null);
            fetchNotes();
        } catch (err) {
            setError(err.response?.data?.message || "Operation failed");
        }
    };

    // Edit note
    const handleEdit = (note) => {
        setForm({
            title: note.title,
            content: note.content
        });

        setEditingId(note._id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Delete note
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }

        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter((note) => note._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || "Delete failed");
        }
    };

    // Cancel editing
    const cancelEdit = () => {
        setForm({ title: "", content: "" });
        setEditingId(null);
    };

    return (
        <>
            <Navbar />

            <div className="container py-5">
                <div className="mb-4">
                    <h2 className="fw-bold">My Notes</h2>
                    <p className="text-muted">
                        Create and manage your personal notes.
                    </p>
                </div>

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                {/* Create / Edit Form */}
                <div className="card border-0 shadow-sm mb-5">
                    <div className="card-body p-4">
                        <h5 className="fw-bold mb-3">
                            {editingId ? "Edit Note" : "Create New Note"}
                        </h5>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Note Title"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                                required
                            />

                            <textarea
                                className="form-control mb-3"
                                rows="4"
                                placeholder="Write your note here..."
                                value={form.content}
                                onChange={(e) =>
                                    setForm({ ...form, content: e.target.value })
                                }
                            />

                            <button className="btn btn-primary me-2">
                                {editingId ? "Update Note" : "Add Note"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={cancelEdit}
                                >
                                    Cancel
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {/* Notes List */}
                <h5 className="fw-bold mb-3">Your Notes ({notes.length})</h5>

                {loading ? (
                    <p>Loading notes...</p>
                ) : notes.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        <h5>No notes yet!</h5>
                        <p>Create your first note above.</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {notes.map((note) => (
                            <div className="col-md-6 col-lg-4" key={note._id}>
                                <NoteCard
                                    note={note}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;