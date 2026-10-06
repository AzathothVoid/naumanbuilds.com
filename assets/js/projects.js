// Project viewer: a list of projects on one side, one project shown at a time, each with its own gallery.
// Without JavaScript every project is shown, stacked, and galleries scroll sideways.
(function () {
  var nav = document.querySelector('.viewer-nav');
  var projects = Array.prototype.slice.call(document.querySelectorAll('.viewer-panels > .project'));
  if (!nav || !projects.length) return;

  var tabs = projects.map(function (p, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.id = p.id + '-tab';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', p.id);
    var kind = document.createElement('span');
    kind.className = 'nav-kind';
    kind.textContent = p.querySelector('.project-kind').textContent;
    var title = document.createElement('span');
    title.className = 'nav-title';
    title.textContent = p.querySelector('h3').textContent;
    b.appendChild(kind);
    b.appendChild(title);
    b.addEventListener('click', function () { select(i, true) });
    nav.appendChild(b);
    p.setAttribute('role', 'tabpanel');
    p.setAttribute('aria-labelledby', b.id);
    return b;
  });
  var count = document.createElement('p');
  count.className = 'nav-count';
  count.textContent = projects.length + ' projects';
  nav.appendChild(count);

  nav.addEventListener('keydown', function (e) {
    var i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    var next = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    next = (next + tabs.length) % tabs.length;
    select(next, true);
    tabs[next].focus();
  });

  function select(i, fromUser) {
    projects.forEach(function (p, j) {
      var on = i === j;
      p.hidden = !on;
      tabs[j].setAttribute('aria-selected', on ? 'true' : 'false');
      tabs[j].tabIndex = on ? 0 : -1;
    });
    if (fromUser) {
      var shown = projects[i];
      shown.classList.remove('is-entering'); void shown.offsetWidth; shown.classList.add('is-entering');
      shown.addEventListener('animationend', function done() { shown.classList.remove('is-entering'); shown.removeEventListener('animationend', done) });
      tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      try { history.replaceState(null, '', '#' + projects[i].id) } catch (e) {}
    }
  }

  var fromHash = projects.findIndex(function (p) { return '#' + p.id === location.hash });
  select(fromHash > -1 ? fromHash : 0, false);
  nav.hidden = false;

  // Galleries
  Array.prototype.forEach.call(document.querySelectorAll('.gallery'), function (g) {
    var track = g.querySelector('.slides');
    var slides = g.querySelectorAll('.slide');
    var thumbs = g.querySelectorAll('.thumb');
    var prev = g.querySelector('.gal-prev');
    var next = g.querySelector('.gal-next');
    var counter = g.querySelector('.gal-count');
    var current = 0;

    function go(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: i * track.clientWidth });
      mark(i);
    }
    function mark(i) {
      current = i;
      counter.textContent = (i + 1) + ' / ' + slides.length;
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
      Array.prototype.forEach.call(thumbs, function (t, j) { t.setAttribute('aria-current', j === i ? 'true' : 'false') });
    }

    prev.addEventListener('click', function () { go(current - 1) });
    next.addEventListener('click', function () { go(current + 1) });
    Array.prototype.forEach.call(thumbs, function (t) {
      t.addEventListener('click', function () { go(+t.getAttribute('data-index')) });
    });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1) }
    });
    var t = null;
    track.addEventListener('scroll', function () { // swipes on touch screens
      clearTimeout(t);
      t = setTimeout(function () { mark(Math.round(track.scrollLeft / Math.max(1, track.clientWidth))) }, 60);
    }, { passive: true });

    mark(0);
  });
})();
