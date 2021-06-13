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

	const inputSquare0 = document.getElementById('square-0');
	const inputSquare1 = document.getElementById('square-1');
	const inputsSquare = [inputSquare0, inputSquare1];

	rangeSliderSquare.noUiSlider.on('update', function(values, handle){
		inputsSquare[handle].value = Math.round(values[handle]);
		
	});

	const setRangeSliderSquare = (i, value) => {
		let arr = [null, null];
		arr[i] = value;
	
		console.log(arr);
	
		rangeSliderSquare.noUiSlider.set(arr);
	};

	inputsSquare.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			console.log(index);
			setRangeSliderSquare(index, e.currentTarget.value);
		});
	});
}

if (rangeSliderPrice) {

	noUiSlider.create(rangeSliderPrice, {
		start: [2, 18],
		step: 1,
		connect: true,
		range: {
				'min': 1,
				'max': 25
		}
});

	const inputPrice0 = document.getElementById('price-0');
	const inputPrice1 = document.getElementById('price-1');
	const inputsPrice = [inputPrice0, inputPrice1];

	rangeSliderPrice.noUiSlider.on('update', function(values, handle){
		inputsPrice[handle].value = Math.round(values[handle]);
		
	});

	const setRangeSliderPrice = (i, value) => {
		let arr = [null, null];
		arr[i] = value;
	
		console.log(arr);
	
		rangeSliderPrice.noUiSlider.set(arr);
	};

	inputsPrice.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			console.log(index);
			setRangeSliderPrice(index, e.currentTarget.value);
		});
	});
}

