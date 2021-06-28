import React from "react";

const ModalWrap = ({ options, children }) => {
	if (!options.visible) {
		return <></>;
	}
	const clickModal = (e) => {
		if (e.target.classList.contains("modal")) {
			options.modal({
				visible: false,
				screen: 1,
				error: null,
			});
		}
	};
	return (
		<div className="modal" onClick={clickModal}>
			<div className="modal__content">
				<p
					className="modal__exit"
					onClick={() =>
						options.modal({
							visible: false,
							screen: 1,
							error: null,
						})
					}
				>
					&times;
				</p>
				<h2 className="title-small mb-main">{options.title}</h2>
				{options.screen === 1 && (
					<div className="modal__screen">{children}</div>
				)}
				{options.screen === 2 && (
					<div className="modal__screen">
						<p className="text-main text-grey">{options.success}</p>
					</div>
				)}
				{options.screen === 3 && (
					<div className="modal__screen">
						<p className="text-main text-grey">{options.error}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ModalWrap;
