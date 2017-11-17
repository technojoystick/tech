
(() => {
	'use strict';
	const $form = $('.login-form');

	class Form {
		constructor(el) { 
			this.$el = $(el);
			this.inputUnits = this.$el.find('.input');
			this.checkboxUnit = this.$el.find('.checkbox input');
			this.button = this.$el.find('button[type="submit"]')

			this.init();
		}

		init() {
			this.bindHandlers();
			this.validateForm();
		}

		bindHandlers() {
			this.inputUnits.each((indx, item) => {
				const $input = $(item).find('input');
				$input.data('valid', false);

				$input.on('keyup blur', (e) => {
					const $target = $(e.target);
					const value = $target.val();
					const valid = this.validateInput($target, value);

					if (valid) {
						this.clearModifyers($target);
						$(item).addClass('_valid');
						$target.data('valid', true);
					} else {
						this.clearModifyers($target);
						$(item).addClass('_error');
						$target.data('valid', false);
					}

					this.validateForm();
				});

				$input.on('focus', (e) => {
					const $target = $(e.target);
					this.clearModifyers($target);
				});
			});

			this.checkboxUnit.on('change', () => {
				this.validateForm();
			});

			this.$el.on('submit', (e) => {
				e.preventDefault();
				console.log(e);
			});
		}

		validateInput(target, value) {
			const inputType = target.attr('type');

			if (inputType === 'email') {
				return value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
			} else if (inputType === 'password') {
				return value.length >= 5;
			} else {
				return false;
			}
		}

		clearModifyers(target) {
			const parent = target.closest('.input');
			parent.removeClass('_error _valid');
		}

		validateForm() {
			const toggler = this.checkboxUnit.is(':checked');

			this.inputUnits.each((indx, item) => {
				const $input = $(item).find('input');
				const data = $input.data('valid');

				if ( !(toggler && data) ) {
					this.button.attr('disabled', true);
					return false;
				} else {
					this.button.attr('disabled', false);
				}
			})
		}
	}

	$form.each((indx, item) => {
		new Form(item);
	});

})();
