import React from "react";
import styles from "./Input.module.scss";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: React.ReactNode | string;
	containerClassName?: string;
	onChange?: (
		param: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
};

export const Input: React.FC<InputProps> = ({
	id,
	name,
	type = "text",
	label,
	containerClassName = "",
	className = "",
	style,
	onChange,
	placeholder,
	defaultValue,
	defaultChecked,
	min,
	max,
	maxLength,
	title,
	required,
}) => {
	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (onChange) {
			if (type === "textarea") {
				onChange(event as React.ChangeEvent<HTMLTextAreaElement>);
			} else {
				onChange(event as React.ChangeEvent<HTMLInputElement>);
			}
		}
	};
	return (
		<label className={`${styles.label} ${containerClassName}`}>
			{label && typeof label === "string" ? <span>{label}</span> : label}

			{type === "textarea" ? (
				<textarea
					id={id}
					title={title}
					name={name}
					className={`${styles.textarea} ${className}`}
					style={style}
					placeholder={placeholder}
					onChange={handleChange}
					defaultValue={defaultValue}
					maxLength={maxLength}
					required={required}
				/>
			) : (
				<input
					id={id}
					name={name}
					title={title}
					type={type}
					className={`${styles.input} ${className}`}
					style={style}
					onChange={handleChange}
					placeholder={placeholder}
					defaultValue={defaultValue}
					defaultChecked={defaultChecked}
					min={min}
					max={max}
					maxLength={maxLength}
					required={required}
				/>
			)}
		</label>
	);
};
