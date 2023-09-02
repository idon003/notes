import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
	let { id } = useParams();
	const history = useNavigate();
	const [note, setNote] = useState(null);

	useEffect(() => {
		const getNote = async () => {
			if (id === "new") return;
			const response = await fetch(`/api/note/${id}/`);
			const data = await response.json();
			setNote(data);
		};
		getNote();
	}, [id]);

	const updateNote = async () => {
		const response = await fetch(`/api/note/${id}/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(note),
		});
		const data = await response.json();
		setNote(data);
	};

	const createNote = async () => {
		const response = await fetch(`/api/notes/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(note),
		});
		const data = await response.json();
		setNote(data);
	};

	const deleteNote = async () => {
		fetch(`/api/note/${id}/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		history("/");
	};

	const handleSubmit = () => {
		if (id !== "new" && !note.body) {
			deleteNote();
		} else if (id !== "new") {
			updateNote();
		} else if (id === "new" && note !== null) {
			createNote();
		}
		history("/");
	};

	return (
		<div className="note">
			<div className="note-header">
				<h3>
					<ArrowLeft onClick={handleSubmit} />
				</h3>
				{id !== "new" ? (
					<button onClick={deleteNote}> Delete </button>
				) : (
					<button onClick={handleSubmit}> Done </button>
				)}
			</div>
			<textarea
				onChange={(e) => {
					setNote({ ...note, body: e.target.value });
				}}
				value={note?.body}
			></textarea>
		</div>
	);
};

export default NotePage;
