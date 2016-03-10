
$(function() {
	var c = $('.processingbar');
	animateEle();
	$(window).scroll(function() {
		animateEle()
	});

	function animateEle() {
		var b = {
			top: $(window).scrollTop(),
			bottom: $(window).scrollTop() + $(window).height()
		};
		c.each(function() {
			if (b.top <= $(this).offset().top && b.bottom >= $(this).offset().top && !$(this).data('bPlay')) {
				$(this).data('bPlay', true);
				var a = $(this).parent().find('font').text().replace(/\%/, '');
				$(this).svgCircle({
					parent: $(this)[0],
					w: 80,
					R: 30,
					sW: 6,
					color: ["#E8C23B", "#E8C23B", "#E8C23B"],
					perent: [100, a],
					speed: 150,
					delay: 200
				})
			}
		})
	}
});
