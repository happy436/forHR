import React from "react";
import { useDrag } from "react-dnd";

const Word = ({ word, isLeftColumn, setWords }) => {
	const [{ isDragging }, drag] = useDrag({
		type: "WORD",
		item: { word },
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult();
			if (!dropResult && !isLeftColumn) {
				// Удаление слова, если оно перетащено из правой колонки и отпущено за пределами
				setWords((prevWords) => prevWords.filter((w) => w !== word));
			}
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	return (
		<div
			ref={drag}
			className={`p-2 mb-2 border cursor-pointer ${
				isDragging ? "opacity-50" : "opacity-100"
			}`}
		>
			{word}
		</div>
	);
};

export default Word;
