/* eslint-disable */
import $ from 'jquery';
import 'jquery-mask-plugin';

window.$ = $;
window.jQuery = $;

// form 
// input select
$(document).ready(function () {
	$('.order-form-select__header').click(function () {
		$('.order-form-select__options').toggleClass('show');
		$('.order-form-select').toggleClass('active');
	});

	$(document).click(function (event) {
		let target = $(event.target);
		if (!target.closest('.order-form-select').length) {
			$('.order-form-select__options').removeClass('show');
			$('.order-form-select').removeClass('active');
		}
	});

	$('.order-form-select__options li').click(function () {
		$('.order-form-select').removeClass('active');
		let selectedValue = $(this).text();
		$('.order-form-select__selected').text(selectedValue);
		$('.order-form-select__input').val(selectedValue)

		$('.order-form-select__options li').removeClass('selected');
		$(this).addClass('selected');

		$('.order-form-select__options').removeClass('show');
	});
});

//input range
$(document).ready(function () {
	$('.order-form-range__input').on('input', function () {
		let value = $(this).val();
		$('.order-form-range__count').text(value + '%');
	});
});

//input file
$(document).ready(function () {
	$('.order-form-file__input').change(function () {
		let fileName = $(this).prop('files')[0].name;
		$('.order-from-file__desc span').html(fileName);
	});
});

//menu mobile
$(document).ready(function () {
	$('.header-burger').click(function () {
		$(this).toggleClass('active');
		$('.mobile-menu').toggleClass('active');
	});
});
