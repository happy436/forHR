import { Badge, Button, Card, Divider } from "@tremor/react";
import React, { useState } from "react";

const Admin = () => {
	const listTaskTypes = [
		"Двигун",
		"Клапан",
		"Робота з архівом",
		"Уборка мусора",
	];
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
	const [newData, setnewData] = useState([]);
	const [name, setName] = useState("");

	const handleMouseEnter = (name) => {
		let newData = data.find((item) => item.name === name)?.listCategories;
		newData = listTaskTypes.filter((item) => !newData.includes(item));
		setnewData(newData);
		setName(name);
	};

	const handleMouseLeave = () => {
		setnewData([]);
		setName("");
	};

	const handleAddCategory = (name, category) => {
		setData((prevData) =>
			prevData.map((item) => {
				if (item.name === name) {
					return {
						...item,
						listCategories: [...item.listCategories, category],
					};
				}
				return item;
			})
		);
        handleMouseLeave()
	};

	return (
		<div>
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
									<Card
										className="flex-grow basis-2/3"
										onMouseEnter={() =>
											handleMouseEnter(worker.name)
										}
										onMouseLeave={handleMouseLeave}
									>
										<h2 className="text-xl mb-3">
											Категории работ
										</h2>
                                        <p className="text-slate-600">наведи на меня мышкой</p>
										<ul className="flex flex-wrap gap-3">
											{worker.listCategories.map(
												(item) => (
													<li key={item}>
														<Badge>{item}</Badge>
													</li>
												)
											)}
											{name === worker.name &&
												newData.map((item) => (
													<li key={item}>
														<Badge color="gray">
															<Button
																className="m-0 mr-2 p-0"
																color="gray"
																onClick={() =>
																	handleAddCategory(
																		worker.name,
																		item
																	)
																}
															>
																+
															</Button>
															{item}
														</Badge>
													</li>
												))}
										</ul>
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
