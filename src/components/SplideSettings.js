import { SingleSetting } from "./SingleSetting.js";

export const SplideSettings = ({ settings }) => {
	return (
		<>
			{settings.value.map((setting, index) => {
				return (
					<SingleSetting
						key={index}
						name={setting?.key}
						type={setting?.type}
						value={setting?.value}
						callback={settings?.callback}
					/>
				);
			})}
		</>
	);
};
