import { Button, Card } from "@tremor/react";
import React from "react";
import { Link } from "react-router-dom";

type WorkerProps = {};

const Worker: React.FC<WorkerProps> = () => {
	return (
		<section>
			<div>
				<h1>Ivan Ivanov</h1>
			</div>
			<Card className="flex gap-5">
				<div className="flex flex-col gap-3">
					<p>Часы: 90 / 176</p>
					<p>Отпуск: 5</p>
					<Link to="/report">
						<Button>Создать репорт</Button>
					</Link>
				</div>
			</Card>
		</section>
	);
};
export default Worker;
