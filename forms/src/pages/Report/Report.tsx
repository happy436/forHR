import {
	Button,
	Card,
	Dialog,
	DialogPanel,
	SearchSelect,
	SearchSelectItem,
	TextInput,
} from "@tremor/react";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { RiEditLine } from "@remixicon/react";
import { nanoid } from "nanoid";

type ReportProps = {};

const Report: React.FC<ReportProps> = () => {
    const needHours = 90
    const [edit, setEdit] = useState(false);
	const [relax, setRelax] = useState(16);
	const [hours, setHours] = useState(relax);
	const [data, setData] = useState([]);
	const handleCreateActivity = () => {
		setActivityList();
	};
	const [task, setTask] = useState({});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const [isOpen, setIsOpen] = useState(false);

    useEffect(() => console.log(hours == needHours))

	const handleCreateTask = () => {
        setEdit(false)
		setIsOpen(false);
		console.log(task);
		setData((prev) => [...prev, { ...task, id: nanoid() }]);
	};

	useEffect(() => {
		const sumHours = data.reduce((sum, item) => Number(sum) + Number(item.hours), 0);
		setHours(Number(sumHours) + Number(relax));
		//console.log(data)
	}, [data]);

	const handleEditTask = (ID) => {
        setEdit(true)
		setIsOpen(true);
		const task = data.find((task) => task.id === ID);
		setTask(task);
	};

	const handleConfirmEditTask = (ID) => {
        setEdit(false)
		setIsOpen(false);
		setData((prevData) =>
			prevData.map((item) =>
				item.id === ID ? { ...item, ...task } : item
			)
		);
	};

	return (
		<section>
			<div>
				<h1>Ivan Ivanov</h1>
				<h1>Создать репорт</h1>
			</div>

			<Modal
				handleChange={handleChange}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				handleCreateTask={handleCreateTask}
				data={task}
				handleConfirmEditTask={handleConfirmEditTask}
                edit={edit}
			/>
			<div>
				<form className="flex flex-col gap-5">
					<Card>
						<div>
							<p>Часов: {hours} / {needHours}</p>
							<p>Дней по болезни: 1 - 19.05.2024</p>
							<p>Отпуск: 1 - 18.05.2024</p>
						</div>
					</Card>
					<Card className="flex flex-col gap-3">
						<h2>Проделанная работа</h2>
						<div className="flex flex-col gap-3">
							<ul className="flex flex-wrap">
								{data.map((item) => (
									<Card
										key={item}
										className="mx-auto max-w-xs relative"
										decoration="top"
										decorationColor="indigo"
									>
										<Button
											type="button"
											icon={RiEditLine}
											className="absolute top-10 right-10"
											onClick={() =>
												handleEditTask(item.id)
											}
										/>
										<label>{item.taskName}</label>
										<p>Часів: {item.hours}</p>
										<p>Тип задачі: {item.type}</p>
									</Card>
								))}
							</ul>
                            {
							(hours !== needHours) && <Button
								onClick={() => {
                                    setTask({})
									setIsOpen(true);
								}}
								type="button"
							>
								Добавить активность
							</Button> }
						</div>
					</Card>
                    <Button color="green">Отправить отчет</Button>
				</form>
			</div>
		</section>
	);
};
export default Report;
