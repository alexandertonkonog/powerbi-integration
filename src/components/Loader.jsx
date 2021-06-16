import React from "react";
import load from "../images/load.gif";

const Loader = (props) => {
	return (
		<div className={"loader-container " + props.addClass}>
			<img src={load} className="loader" alt="Загрузка" />
		</div>
	);
};

export default Loader;
