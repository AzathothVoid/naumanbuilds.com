// Scroll reveals. Skipped entirely for reduced-motion users or browsers without IntersectionObserver.
(function () {
  if (!window.matchMedia || !matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  // [selector, stagger in seconds between siblings]
  var groups = [
    ['.focus h2, .focus .focus-lede', 0.08],
    ['.services .service', 0.1],
    ['.first-job h3', 0],
    ['.first-job li', 0.12],
    ['.terms .sec-head', 0],
    ['.terms li', 0.07],
    ['.projects .sec-head', 0],
    ['.viewer', 0],
    ['.contact figure, .contact > div', 0.1]
  ];
  var els = [];
  groups.forEach(function (g) {
    Array.prototype.forEach.call(document.querySelectorAll(g[0]), function (el, i) {
      el.setAttribute('data-reveal', '');
      if (g[1]) el.style.setProperty('--d', (i * g[1]).toFixed(2) + 's');
      els.push(el);
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  els.forEach(function (el) { io.observe(el) });
  document.documentElement.classList.add('motion');

  // Safety net: never leave content hidden (e.g. printing, odd scroll containers).
  window.addEventListener('beforeprint', function () { els.forEach(function (el) { el.classList.add('in') }) });
  setTimeout(function () {
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add('in');
    });
  }, 1500);
})();
