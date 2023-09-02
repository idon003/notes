import React from "react";
import { Link } from "react-router-dom";

const getTitle = (note) => {
	const title = note.body.split("\n")[0];
	if (title.length > 45) {
		return title.slice(0, 45);
	}
	return title;
};

const getTime = (note) => {
	return new Date(note.updated).toLocaleDateString();
};

const getBody = (note) => {
	const title = getTitle(note);
	let body = note.body.replaceAll("\n", " ");
	body = body.replaceAll(title, "");

	if (body.length > 45) {
		return body.slice(0, 45) + "...";
	}
	return body;
};

const ListItem = ({ note }) => {
	return (
		<Link to={`/note/${note.id}/`}>
			<div className="notes-list-item">
				<h3> {getTitle(note)} </h3>
				<p>
					<span>{getTime(note)}</span>
					{getBody(note)}
				</p>
			</div>
		</Link>
	);
};

export default ListItem;
