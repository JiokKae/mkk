import { useId } from "react";

function FloatingInput({
	type = "text",
	className,
	autoFocus,
	name,
	required,
	maxLength,
	pattern,
	autoComplete,
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
				maxLength={maxLength}
				pattern={pattern}
				autoComplete={autoComplete}
				required={required}
				autoFocus={autoFocus}
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
