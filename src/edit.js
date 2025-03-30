import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from "@wordpress/block-editor";
import { Panel, PanelBody, PanelRow } from "@wordpress/components";
import { useState, useEffect } from "react";
import { SplideSettings } from "./components/SplideSettings.js";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const [splideSettings, setSplideSettings] = useState([
		{
			key: "type",
			type: "string",
			value: "loop",
		},
		{
			key: "rewind",
			type: "boolean",
			value: "",
		},
		{
			key: "speed",
			type: "number",
			value: "",
		},
		{
			key: "rewindspeed",
			type: "number",
			value: "",
		},
		{
			key: "rewindByDrag",
			type: "boolean",
			value: "",
		},
		{
			key: "width",
			type: "string",
			value: "",
		},
		{
			key: "height",
			type: "string",
			value: "",
		},
		{
			key: "fixedWidth",
			type: "string",
			value: "",
		},
		{
			key: "fixedHeight",
			type: "string",
			value: "",
		},
		{
			key: "heightRatio",
			type: "number",
			value: "",
		},
		{
			key: "autoWidth",
			type: "boolean",
			value: "",
		},
		{
			key: "autoHeight",
			type: "boolean",
			value: "",
		},
		{
			key: "start",
			type: "boolean",
			value: "",
		},
		{
			key: "perPage",
			type: "number",
			value: "",
		},
		{
			key: "perMove",
			type: "number",
			value: "",
		},
		{
			key: "focus",
			type: "string",
			value: "",
		},
		{
			key: "gap",
			type: "string",
			value: "",
		},
		{
			key: "padding",
			type: "string",
			value: "",
		},
		{
			key: "arrows",
			type: "boolean",
			value: "",
		},
		{
			key: "pagination",
			type: "boolean",
			value: "",
		},
		{
			key: "easing",
			type: "string",
			value: "",
		},
		{
			key: "easingFunc",
			type: "number",
			value: "",
		},
		{
			key: "drag",
			type: "string",
			value: "",
		},
		{
			key: "snap",
			type: "boolean",
			value: "",
		},
		{
			key: "noDrag",
			type: "string",
			value: "",
		},
		{
			key: "dragMinThreshold",
			type: "string",
			value: "",
		},
		{
			key: "flickPower",
			type: "number",
			value: "",
		},
		{
			key: "flickMaxPages",
			type: "number",
			value: "",
		},
		{
			key: "waitForTransition",
			type: "boolean",
			value: "",
		},
		{
			key: "arrowPath",
			type: "string",
			value: "",
		},
		{
			key: "autoplay",
			type: "boolean",
			value: "",
		},
		{
			key: "interval",
			type: "number",
			value: "",
		},
		{
			key: "pauseOnHover",
			type: "boolean",
			value: "",
		},
		{
			key: "pauseOnFocus",
			type: "boolean",
			value: "",
		},
		{
			key: "resetFocus",
			type: "boolean",
			value: "",
		},
		{
			key: "lazyload",
			type: "boolean",
			value: "",
		},
	]);

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
						if (setting.value && setting.value !== "false") {
							return true;
						} else {
							return false;
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
			// if (setting.key == "autoWidth" && setting.value == "false") {
			// 	return;
			// }
			if (setting.key == key) {
				setting.value = val;
			}
			return setting;
		});
		console.log("newSettings: ", newSettings);
		setSplideSettings(newSettings);
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
