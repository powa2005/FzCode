(function($) {
	$.fn.svgCircle = function(i) {
		i = $.extend({
			parent: null,
			w: 75,
			R: 30,
			sW: 20,
			color: ["#000", "#000"],
			perent: [100, 100],
			speed: 0,
			delay: 1000
		}, i);
		return this.each(function() {
			var e = i.parent;
			if (!e) return false;
			var w = i.w;
			var r = Raphael(e, w, w),
				R = i.R,
				init = true,
				param = {
					stroke: "#f2dab1"
				},
				hash = document.location.hash,
				marksAttr = {
					fill: hash || "#444",
					stroke: "none"
				};
			r.customAttributes.arc = function(b, c, R) {
				var d = 360 / c * b,
					a = (90 - d) * Math.PI / 180,
					x = w / 2 + R * Math.cos(a),
					y = w / 2 - R * Math.sin(a),
					color = i.color,
					path;
				if (c == b) {
					path = [
						["M", w / 2, w / 2 - R],
						["A", R, R, 0, 1, 1, w / 2 - 0.01, w / 2 - R]
					]
				} else {
					path = [
						["M", w / 2, w / 2 - R],
						["A", R, R, 0, +(d > 180), 1, x, y]
					]
				}
				return {
					path: path
				}
			};
			var f = r.path().attr({
				stroke: "#e2e2e2", //底色
				"stroke-width": i.sW
			}).attr({
				arc: [100, 100, R]
			});
			var g = r.path().attr({
				stroke: "#f36767",
				"stroke-width": i.sW
			}).attr(param).attr({
				arc: [0.01, i.speed, R]
			});
			var h;
			if (i.perent[1] > 0) {
				setTimeout(function() {
					g.animate({
						stroke: i.color[1],
						arc: [i.perent[1], 100, R]
					}, 900, ">")
				}, i.delay)
			} else {
				g.hide()
			}
		})
	}
})(jQuery);

