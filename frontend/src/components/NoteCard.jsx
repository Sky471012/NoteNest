const NoteCard = ({ note, onEdit, onDelete }) => {
    return (
        <div className="card h-100 shadow-sm border-0">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">
                    {note.title}
                </h5>

                <p className="card-text text-secondary flex-grow-1">
                    {note.content || "No content"}
                </p>

                <small className="text-muted mb-3">
                    {new Date(note.createdAt).toLocaleDateString()}
                </small>

                <div className="d-flex gap-2">
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => onEdit(note)}
                    >
                        Edit
                    </button>

                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onDelete(note._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;