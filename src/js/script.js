// Range Sliders

const rangeSliderSquare = document.getElementById('range-slider-square');
const rangeSliderPrice= document.getElementById('range-slider-price');

if (rangeSliderSquare) {

		noUiSlider.create(rangeSliderSquare, {
			start: [32, 186],
			step: 1,
			connect: true,
			range: {
					'min': 25,
					'max': 250
			}
	});
}

if (rangeSliderPrice) {

	noUiSlider.create(rangeSliderPrice, {
		start: [1.5, 17.5],
		step: 0.5,
		connect: true,
		range: {
				'min': 0.5,
				'max': 25
		}
});
}