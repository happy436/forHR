import {
	Button,
	Dialog,
	DialogPanel,
	SearchSelect,
	SearchSelectItem,
	TextInput,
} from "@tremor/react";
import React, { useEffect, useState } from "react";

type ModalProps = {};

const Modal: React.FC<ModalProps> = ({
	handleChange,
	isOpen,
	setIsOpen,
	handleCreateTask,
	data,
	handleConfirmEditTask,
    edit
}) => {
	const listTaskTypes = ["Двигун", "Клапан", "Робота з архівом"];
	return (
		<Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
			<DialogPanel>
				<h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
					Задача
				</h3>
				<div className="flex flex-col gap-3">
					<TextInput
						placeholder="Назва задачі"
						onChange={handleChange}
						name="taskName"
						value={data.taskName}
					/>
					<TextInput
						placeholder="Скільки часу?"
						onChange={handleChange}
						name="hours"
						value={data.hours}
					/>
					<div className="mb-4 mt-8 text-center font-mono text-sm text-slate-500">
						Тип задачі
					</div>
					<SearchSelect
						onValueChange={(value) =>
							handleChange({
								target: {
									name: "type",
									value: value,
								},
							})
						}
						defaultValue={data.type}
					>
						{listTaskTypes.map((type) => (
							<SearchSelectItem value={type} key={type}>
								{type}
							</SearchSelectItem>
						))}
					</SearchSelect>
				</div>
				{edit ? (
					<Button
						className="mt-8 w-full"
						onClick={() => handleConfirmEditTask(data.id)}
					>
						Edit
					</Button>
				) : (
					<Button className="mt-8 w-full" onClick={handleCreateTask}>
						Got it!
					</Button>
				)}
			</DialogPanel>
		</Dialog>
	);
};
export default Modal;
