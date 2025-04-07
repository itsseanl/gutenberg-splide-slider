import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
	console.log(attributes.splideSettings);
	let atts = attributes.splideSettings;

	if (typeof atts === "string") {
		try {
			atts = JSON.parse(atts); // Convert JSON string to an array or object
			console.log("Parsed settings:", atts);

			// Ensure autoScroll is an object if enabled
			if (atts.autoScroll === "true") {
				console.log("autoscroll is true");
				atts.autoScroll = { speed: parseInt(atts.speed, 10) || 1 }; // Assign an object with the actual value of atts.speed
			}

			//convert string values to boolean
			Object.entries(atts).map(([key, value]) => {
				if (value === "true") {
					atts[key] = true;
				} else if (value === "false") {
					atts[key] = false;
				}
			});
		} catch (error) {
			console.error("Failed to parse splideSettings:", error);
			atts = {}; // Fallback to an empty object if parsing fails
		}
	}

	// Ensure atts is serialized properly for the data-splide attribute
	const serializedSplideSettings = JSON.stringify(atts);

	return (
		<section {...useBlockProps.save()}>
			<div
				className="splide"
				role="group"
				data-splide={serializedSplideSettings} // Properly serialized JSON
				data-autoscroll={attributes.autoscroll}
				aria-label="Splide Basic HTML Example"
			>
				<div className="splide__track">
					<ul className="splide__list">
						<InnerBlocks.Content />
					</ul>
				</div>
			</div>
		</section>
	);
}
