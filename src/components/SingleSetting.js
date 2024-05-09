import { useState, useEffect } from "react";
export const SingleSetting = ({ name, type, value, callback }) => {
	const [val, setVal] = useState(value);
	useEffect(() => {
		callback(name, val);
	}, [val]);
	let inputType = type;
	if (type == "string") {
		inputType = "text";
	}
	return (
		<>
			<label htmlFor={name} className="components-base-control__label">
				{name}
			</label>

			{type == "boolean" ? (
				<select
					name={name}
					type="text"
					className="components-text-control__input is-next-40px-default-size"
					value={val}
					onChange={(e) => {
						setVal(e.target.value);
					}}
				>
					<option value="true">true</option>
					<option value="false">false</option>
				</select>
			) : (
				<input
					name={name}
					type={type}
					value={val}
					onChange={(e) => setVal(e.target.value)}
				/>
			)}
		</>
	);
};
