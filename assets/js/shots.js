// Opens project screenshots in an on-page viewer. Without JavaScript the links open the full image.
(function () {
  var box = document.getElementById('lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  var img = document.getElementById('lightbox-img');
  var webp = document.getElementById('lightbox-webp');
  var cap = document.getElementById('lightbox-caption');
  var opener = null;

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a.shot');
    if (!a) return;
    e.preventDefault();
    opener = a;
    webp.srcset = a.getAttribute('data-webp');
    img.src = a.getAttribute('href');
    img.alt = a.getAttribute('data-caption');
    cap.textContent = a.getAttribute('data-caption') + ' (mock data)';
    box.showModal();
  });

  function close() { box.close() }
  document.getElementById('lightbox-close').addEventListener('click', close);
  box.addEventListener('click', function (e) { if (e.target === box) close() }); // click on the backdrop
  box.addEventListener('close', function () { if (opener) opener.focus() });
})();
