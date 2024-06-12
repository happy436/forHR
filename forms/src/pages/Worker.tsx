import { Button, Card } from "@tremor/react";
import React from "react";
import { Link } from "react-router-dom";

type WorkerProps = {};

const Worker: React.FC<WorkerProps> = () => {
	return (
		<section>
			<div className="mb-5 flex gap-3 items-center">
				<h1>Трекинг</h1>
				<Link to="/report">
					<Button>Создать репорт</Button>
				</Link>
			</div>
			<div className="flex gap-5">
				<Card className="flex flex-col">
					<p>Отработано сегодня</p>
					<span className="flex gap-3 items-center">
						<p>00:00 / 00:00</p>
						<p className="text-xs">(00:00)</p>
					</span>
					<p>00:00 / 00:00</p>
					<p></p>
				</Card>
				<Card>
					<p>Отработано за месяц</p>
					<p>90 / 100</p>
					<p>В месяце: 176</p>
				</Card>
				<Card>
					<p>Социальный пакет</p>
					<p>Отпуск: 5</p>
					<p>Больничный: 1 / 30</p>
				</Card>
			</div>
		</section>
	);
};
export default Worker;
