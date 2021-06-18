import React, { useState } from "react";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";

const Report = ({ report, token, loading }) => {
	let [thisReport, setThisReport] = useState(null);
	if (!token) {
		return (
			<p className="text-center text-grey padding-main">
				Нет токена доступа. Закройте приложение и войдите еще раз. Если
				доступ к отчетам не восстановится, сообщите об этом
				администратору Битрикс 24
			</p>
		);
	}
	if (!report) {
		return (
			<p className="text-center text-grey padding-main">
				Выберите группу отчетов и конкретный отчет для отображения
			</p>
		);
	}
	if (loading) {
		return (
			<p className="text-center text-grey padding-main">
				Загрузка отчета
			</p>
		);
	}
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
