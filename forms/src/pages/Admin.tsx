import { Badge, Card, Divider } from "@tremor/react";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";

type AdminProps = {};

const Admin: React.FC<AdminProps> = () => {
	const listTaskTypes = ["Двигун", "Клапан", "Робота з архівом"];
	const mockData = [
		{
			id: "adad",
			name: "Иванов Иван",
			listCategories: ["Двигун", "Клапан", "Робота з архівом"],
		},
		{
			id: "adad2",
			name: "Пономарев Олександр",
			listCategories: ["Робота з архівом"],
		},
	];
	const [data, setData] = useState(mockData);
	const [leftWords, setLeftWords] = useState(["Word1", "Word2", "Word3"]);
	const [rightWords, setRightWords] = useState(["Word4", "Word5", "Word6"]);
	const initialLeftWords = ["Word1", "Word2", "Word3"];
	const initialRightWords = ["Word4", "Word5", "Word6"];

	return (
		<div>
			<DndProvider backend={HTML5Backend}>
				<div className="flex space-x-4">
					<Column
						words={leftWords}
						setWords={setLeftWords}
						oppositeWords={rightWords}
						setOppositeWords={setRightWords}
						initialWords={initialLeftWords}
						isLeftColumn={true}
					/>
					<Column
						words={rightWords}
						setWords={setRightWords}
						oppositeWords={leftWords}
						setOppositeWords={setLeftWords}
						initialWords={initialRightWords}
						isLeftColumn={false}
					/>
				</div>
			</DndProvider>
			<h1 className="mb-3">HR panel</h1>
			<div className="flex gap-3 flex-col">
				<Card className="w-max">
					<p>Сдано отчетов</p>
					<p>10 / 100</p>
				</Card>
				<Card className="flex flex-col gap-3">
					<h2 className="text-xl">Рабочие</h2>
					<Divider></Divider>
					<ul className="flex flex-col gap-3">
						{data.map((worker) => (
							<li key={worker.id}>
								<div className="flex gap-5 items-center">
									<span className="flex-grow basis-1/3">
										{worker.name}
									</span>
									<Card className="flex-grow basis-2/3">
										<h2 className="text-xl mb-3">
											Категории работ
										</h2>
										<DndProvider backend={HTML5Backend}>
											<ul className="flex flex-wrap gap-3">
												{worker.listCategories.map(
													(item) => (
														<li key={item}>
															<Badge>
																{item}
															</Badge>
														</li>
													)
												)}
											</ul>
										</DndProvider>
									</Card>
								</div>
								<Divider />
							</li>
						))}
					</ul>
				</Card>
			</div>
		</div>
	);
};
export default Admin;
