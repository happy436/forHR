import {
	Button,
	Card,
} from "@tremor/react";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { RiEditLine } from "@remixicon/react";
import { nanoid } from "nanoid";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Report = () => {
    const location = useNavigate()
	const needHours = 176;
	const [edit, setEdit] = useState(false);
	const [relax] = useState(16);
	const [hours, setHours] = useState(relax);
	const [data, setData] = useState([]);
	const [task, setTask] = useState({});
	const handleChange = (e) => {
		setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => console.log(hours == needHours));

	const handleCreateTask = () => {
		setEdit(false);
		setIsOpen(false);
		console.log(task);
		setData((prev) => [...prev, { ...task, id: nanoid() }]);
	};

	useEffect(() => {
		const sumHours = data.reduce(
			(sum, item) => Number(sum) + Number(item.hours),
			0
		);
		setHours(Number(sumHours) + Number(relax));
		//console.log(data)
	}, [data]);

	const handleEditTask = (ID) => {
		setEdit(true);
		setIsOpen(true);
		const task = data.find((task) => task.id === ID);
		setTask(task);
	};

	const handleConfirmEditTask = (ID) => {
		setEdit(false);
		setIsOpen(false);
		setData((prevData) =>
			prevData.map((item) =>
				item.id === ID ? { ...item, ...task } : item
			)
		);
	};

	const onSubmit = (e) => {
		e.preventDefault();
        if(data.length === 0){
            toast.error("Отчет пустой!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            return null;
        }
		toast.success("Отчет направлен в обработку!", {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
			transition: Bounce,
		});
        location('/home')
	};

	return (
		<section>
			<div className="mb-3">
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
							<p>
								Часов: {hours} / {needHours}
							</p>
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
							{hours !== needHours && (
								<Button
									onClick={() => {
										setTask({});
										setIsOpen(true);
									}}
									type="button"
								>
									Добавить активность
								</Button>
							)}
						</div>
					</Card>
					<Button
						color="green"
						type="submit"
						onClick={(e) => onSubmit(e)}
					>
						Отправить отчет
					</Button>
				</form>
			</div>
		</section>
	);
};
export default Report;
