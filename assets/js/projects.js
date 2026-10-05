// Project filters. Shown only once there are MIN_PROJECTS or more; without JavaScript every project shows.
(function () {
  var MIN_PROJECTS = 8; // filters only help once the list is long
  var bar = document.querySelector('.filters');
  var items = Array.prototype.slice.call(document.querySelectorAll('.project'));
  if (!bar || items.length < MIN_PROJECTS) return;

  var labels = { all: 'All', ai: 'AI agents', automation: 'Automation', fullstack: 'Full-stack', oss: 'Open source' };
  var counts = { all: items.length };
  items.forEach(function (item) {
    (item.getAttribute('data-tags') || '').split(/\s+/).forEach(function (tag) {
      if (tag) counts[tag] = (counts[tag] || 0) + 1;
    });
  });

  Object.keys(labels).forEach(function (key) {
    if (!counts[key]) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('data-filter', key);
    b.setAttribute('aria-pressed', key === 'all' ? 'true' : 'false');
    b.textContent = labels[key];
    b.setAttribute('aria-label', labels[key] + ', ' + counts[key] + (counts[key] === 1 ? ' project' : ' projects'));
    var n = document.createElement('span');
    n.textContent = counts[key];
    b.appendChild(n);
    bar.appendChild(b);
  });

  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    var f = b.getAttribute('data-filter');
    bar.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false') });
    items.forEach(function (item) {
      var tags = (item.getAttribute('data-tags') || '').split(/\s+/);
      item.hidden = !(f === 'all' || tags.indexOf(f) > -1);
    });
  });

  bar.hidden = false;
})();
