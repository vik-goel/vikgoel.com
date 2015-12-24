$(function(){
  $("#animated-txt").typed({
    strings: ["apps", "games", "websites"],
    typeSpeed: 30,
    loop:true,
    loopCount:false,
    backDelay:1000,
    backSpeed:50,
  });
});

$(document).ready(function() {
	var iconIds = [
		"aligner",
		"gravity-flipper",
		"hackformer",
		"bubble-bite",
		"water-water",
		"bhagavad-gita",
		"repleno-labs",
		"archer"
	];

	function getIconElems() {
		var overlayIndex = 1;

		var suffix = "";
		var windowWidth = $(window).width();

		if(windowWidth < 768) {
			suffix = "-xs";
		}
		else if(windowWidth < 992) {
			suffix = "-sm";
		}

		return iconIds.map(function(id) {
			return {
				elem: $("#"+id+suffix),
				overlay: $("#overlay" + overlayIndex++),
				alpha: 0,
				targetAlpha: 0,
				animated: false
			}
		});
	}

	function animateOverlay(e) {
		var dAlpha = 0.075;

		if(Math.abs(e.targetAlpha - e.alpha) < dAlpha) {
			e.alpha = e.targetAlpha;
			e.animated = false;
		}
		else {
			if(e.alpha < e.targetAlpha) {
				e.alpha += dAlpha;
			}
			else {
				e.alpha -= dAlpha;
			}

			e.animated = true;
			setTimeout(function(){animateOverlay(e)}, 20);
		}

		e.overlay.css("opacity", e.alpha);
	}

	function updateOverlay(e, targetAlpha) {
		e.targetAlpha = targetAlpha;

		var pos = e.elem.offset();
		var size = Math.max(e.elem.width(), e.elem.height()) + 30;

		e.overlay.css("left", pos.left);
		e.overlay.css("top", pos.top);
		e.overlay.css("width", size);
		e.overlay.css("height", size);

		if(!e.animated) {
			animateOverlay(e);
		}
	}

	function makeIcon(e) {
		e.elem.hover(
			function() {
				updateOverlay(e, 0.9);
			},
			function(){
				updateOverlay(e, 0);
			}
		);

		e.elem.click(function() {
			e.targetAlpha = e.alpha = 0;
			e.overlay.css("opacity", 0);
		});

		updateOverlay(e, e.alpha);
	}

	function prepareIcons() {
		getIconElems().forEach(makeIcon);
	}

	$(window).resize(prepareIcons);
	prepareIcons();
	
});