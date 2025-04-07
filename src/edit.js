import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from "@wordpress/block-editor";
import { Panel, PanelBody, PanelRow } from "@wordpress/components";
import { useState, useEffect } from "react";
import { SplideSettings } from "./components/SplideSettings.js";
import { SingleSetting } from "./components/SingleSetting.js";
import "./editor.scss";
import SettingsOptions from "./splideSettings.json";
export default function Edit({ attributes, setAttributes }) {
	const [splideSettings, setSplideSettings] = useState(SettingsOptions);
	const [autoScroll, setAutoScroll] = useState(attributes.autoscroll);

	useEffect(() => {
		let settings = attributes.splideSettings;

		if (settings) {
			console.log("ran");
			settings = JSON.parse(settings);
			console.log(settings);
			const newSettings = splideSettings.map((setting) => {
				if (settings[setting.key]) {
					setting.value = settings[setting.key];
				}
				return setting;
			});
			console.log("newSettings: ", newSettings);
			setSplideSettings(newSettings);
		}
	}, []);

	useEffect(() => {
		console.log("setAttributes");
		let splideAtts = splideSettings ? splideSettings : "";
		console.log(splideAtts);
		let dataSplide = splideAtts
			? splideAtts
					.filter((setting) => {
						if (
							(setting.key == "autoWidth" && setting.value == "false") ||
							!setting.value
						) {
							return false;
						} else {
							return true;
						}
					})
					.map((setting) => {
						return { [setting.key]: setting.value };
					})
			: "";
		dataSplide = dataSplide
			? JSON.stringify(Object.assign({}, ...dataSplide))
					.replace("[", "")
					.replace("]", "")
					.replaceAll("\\", "")
			: "";
		console.log("datasplide", dataSplide);
		setAttributes({ splideSettings: dataSplide });
	}, [splideSettings]);

	function updateSettings(key, val) {
		let updatedSettings = splideSettings;
		const newSettings = updatedSettings.map((setting) => {
			if (setting.key == key) {
				setting.value = val;
			}
			return setting;
		});
		console.log("newSettings: ", newSettings);
		setSplideSettings(newSettings);
	}

	function updateAutoScroll(name, val) {
		setAutoScroll({ autoscroll: val });
	}

	console.log(splideSettings);
	console.log(attributes.splideSettings);
	const allowed_blocks = ["create-block/gutenberg-splide-slide"];

	return (
		<section {...useBlockProps}>
			<InspectorControls>
				<Panel header="My Panel">
					<PanelBody title="Select Featured Posts" initialOpen={true}>
						<PanelRow className="home-banner-panelrow">
							{splideSettings.length ? (
								<SplideSettings
									settings={{
										value: splideSettings,
										callback: updateSettings,
									}}
								/>
							) : (
								""
							)}
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div
				className="splide"
				role="group"
				data-splide={attributes.splideSettings}
				data-autoscroll={autoScroll}
				aria-label="Splide Basic HTML Example"
			>
				<div class="splide__track">
					<ul class="splide__list">
						<InnerBlocks allowedBlocks={allowed_blocks} />
					</ul>
				</div>
			</div>
		</section>
	);
}
