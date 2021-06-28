import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";

const Report = ({ token, groups }) => {
	let [thisReport, setThisReport] = useState(null);

	const params = useParams();

	if (!params.groupId || !params.reportId) {
		return (
			<p className="text-center text-grey padding-main">
				Выберите конкретный отчет для отображения в меню выше
			</p>
		);
	}

	if (!token) {
		return (
			<p className="text-center text-grey padding-main">
				Нет токена доступа. Закройте приложение и войдите еще раз. Если
				доступ к отчетам не восстановится, сообщите об этом
				администратору Битрикс 24
			</p>
		);
	}

	const groupItem = groups.find(item => item.id === +params.groupId);
    const report = groupItem.reports.find(item => item.id === params.reportId);

	return (
		<PowerBIEmbed
			embedConfig={{
				type: "report",
				id: report.id,
				embedUrl: report.url,
				accessToken: token,
				tokenType: models.TokenType.Aad,
				settings: {
					panes: {
						filters: {
							expanded: true,
							visible: true,
						},
					},
					background: models.BackgroundType.Transparent,
				},
			}}
			eventHandlers={
				new Map([
					[
						"loaded",
						function () {
							console.log("Report loaded");
						},
					],
					[
						"rendered",
						function () {
							console.log("Report rendered");
							const iFrame = document.querySelector(
								".report-style-class iframe"
							);
							iFrame.setAttribute("frameborder", 0);
						},
					],
					[
						"error",
						function (event) {
							console.log(event.detail);
						},
					],
				])
			}
			cssClassName={"report-style-class"}
			getEmbeddedComponent={(embeddedReport) => {
				setThisReport(embeddedReport);
			}}
		/>
	);
};

export default Report;
