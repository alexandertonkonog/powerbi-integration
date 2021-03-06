import React from 'react';

const Input = (props) => {
    const meta = props.meta;

    return (
		<div
			className={
				props.addClass
					? "input-container " + props.addClass
					: "input-container"
			}
		>
			<p className="input-header text-small mb-small">
				<label htmlFor="" className="input-label">
					{props.text}
					{props.req && <span className="input_req"> *</span>}
				</label>
				{meta && meta.touched && meta.error && (
					<span className="input-error">{meta.error}</span>
				)}
			</p>
			<input
				{...props.input}
				type="text"
				className={
					meta && meta.touched && meta.error
						? "input input_error"
						: "input"
				}
				placeholder={props.placeholder ? props.placeholder : ""}
			/>
			{props.description && (
				<p className="input-des text-small text-grey">
					{props.description}
				</p>
			)}
		</div>
	);
}

export default Input;