import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock/lib/bodyScrollLock.min.js';
import velocity from 'velocity-animate/velocity.min.js';

$('.js-toggle-nav')
	.on('click', function(e) {
		if ($(window).width() <= 1150) {
		 let $this = $(this),
			$mobileMenu = $this.next('.js-mobile-menu');

		 if ($mobileMenu.length) {
			if ($mobileMenu.is(':visible')) {
				$mobileMenu
					.velocity("slideUp", {
						duration: 300,
						complete: function() {
							$this.removeClass('is-open');
						}
					});
				enableBodyScroll('body');
			} else {
				disableBodyScroll('body');
				$mobileMenu
					.velocity("slideDown", {
						duration: 300,
						complete: function() {
							$this.addClass('is-open');
						}
					})
				}
			}
		}
	});
