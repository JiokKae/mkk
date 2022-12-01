import { useId } from "react";

function FloatingInput({
	type = "text",
	className,
	autoFocus,
	name,
	required,
	help,
	value,
	onChange,
}) {
	const id = useId();
	return (
		<div className={`form-floating ${className}`}>
			<input
				type={type}
				id={`${id}Input`}
				className="mkk-form form-control"
				placeholder={name}
				required={required ? true : false}
				autoFocus={autoFocus ? true : false}
				value={value}
				onChange={onChange}
			/>
			<label htmlFor={`${id}Input`}>{name}</label>
			{help ? (
				<small id={`${name}HelpBlock`} className="form-text">
					{help}
				</small>
			) : null}
		</div>
	);
}

export default FloatingInput;
