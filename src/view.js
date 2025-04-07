import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

// Select all instances of the block
document.querySelectorAll(".splide").forEach((block) => {
	// Get the autoscroll attribute from the block's wrapper
	const autoscroll = block.getAttribute("data-autoscroll") === "true";
	const speed = block.getAttribute("data-speed") || 1; // Default speed is 1 if not set

	// Initialize Splide for this block
	const splide = new Splide(block);

	// If autoscroll is enabled, add the necessary configuration
	if (autoscroll) {
		splide.mount({ AutoScroll });
	} else {
		splide.mount();
	}
});
