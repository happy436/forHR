import { Card } from "@tremor/react";
import React from "react";

type AdminProps = {};

const Admin: React.FC<AdminProps> = () => {
	const listWorker = [{ name: "Ivan Ivanov", jobTitle: "Engeener" }];
	return (
		<section>
			<h1>For HR</h1>
			<div>
				<Card>
					<h1>Workers</h1>
					<ul>
						{listWorker.map((worker) => (
							<Card
								className="mx-auto max-w-xs relative"
								decoration="top"
								decorationColor="indigo"
							>
								<div>
									<h2>{worker.name}</h2>
									<h3>{worker.jobTitle}</h3>
								</div>
                                <div className="flex gap-3">
                                    <h3>
                                        Report:
                                    </h3>
                                    <p>Не отримано!</p>
                                </div>
							</Card>
						))}
					</ul>
				</Card>
			</div>
		</section>
	);
};
export default Admin;
