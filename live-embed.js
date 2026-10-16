// Scales each .live-embed iframe (rendered at a fixed 1280px desktop width) down to its container.
(function () {
  var W = 1280, H = 800;
  function fit(box) {
    var f = box.querySelector('iframe');
    if (!f) return;
    var w = box.clientWidth;
    if (!w) return;
    var s = w / W;
    var h = box.classList.contains('live-embed--hero') ? H : Math.max(H, box.clientHeight / s);
    f.style.width = W + 'px';
    f.style.height = h + 'px';
    f.style.transform = 'scale(' + s + ')';
  }
  function init() {
    var boxes = document.querySelectorAll('.live-embed');
    if (!boxes.length) return;
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function (es) { es.forEach(function (e) { fit(e.target); }); });
      boxes.forEach(function (b) { ro.observe(b); });
    } else {
      boxes.forEach(fit);
      addEventListener('resize', function () { boxes.forEach(fit); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
