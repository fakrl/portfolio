// Scales each .live-embed iframe (rendered at a fixed desktop width) down to its container.
// Card previews render the site at a narrower virtual width than the big hero preview, so
// the text stays readable at card size (1024px on cards, 820px on phone-width cards).
// Hero previews are click-to-interact: a shield keeps the iframe from swallowing page scroll.
(function () {
  var H = 800;
  function virtualWidth(box, w) {
    if (box.classList.contains('live-embed--hero')) return 1280;
    return w < 420 ? 820 : 1024;
  }
  function fit(box) {
    var f = box.querySelector('iframe');
    if (!f) return;
    var w = box.clientWidth;
    if (!w) return;
    var W = virtualWidth(box, w);
    var s = w / W;
    var h = box.classList.contains('live-embed--hero') ? H : Math.max(H, box.clientHeight / s);
    f.style.width = W + 'px';
    f.style.height = h + 'px';
    f.style.transform = 'scale(' + s + ')';
  }
  window.LiveEmbed = { fit: fit };

  // click (or tap) to interact with a hero preview; leaving it hands scrolling back to the page
  function shield(box) {
    if (!box.classList.contains('live-embed--hero') || box.classList.contains('live-embed--modal')) return;
    if (box.querySelector('.live-embed__shield')) return;
    var s = document.createElement('button');
    s.type = 'button';
    s.className = 'live-embed__shield';
    s.setAttribute('aria-label', 'Click to interact with the live site');
    s.innerHTML = '<span>Click to interact</span>';
    box.appendChild(s);
    s.addEventListener('click', function () { box.classList.add('live-embed--active'); });
    box.addEventListener('mouseleave', function () { box.classList.remove('live-embed--active'); });
    document.addEventListener('touchstart', function (e) {
      if (!box.contains(e.target)) box.classList.remove('live-embed--active');
    }, { passive: true });
  }

  function init() {
    var boxes = document.querySelectorAll('.live-embed');
    if (!boxes.length) return;
    boxes.forEach(shield);
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
