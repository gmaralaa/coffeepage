// highlight the nav link of the section currently on screen
(function () {
    var links = document.querySelectorAll('.unlist a');
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var ids = ['home', 'explore', 'reviews', 'story'];
    function update() {
        var current = 'home';
        ids.forEach(function (id) {
            var el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
        });
        links.forEach(function (a) { a.classList.remove('active'); });
        if (map[current]) map[current].classList.add('active');
    }
    // open / close extra content in place (coffee types, reviews, story)
    document.querySelectorAll('[data-toggle]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var sel = btn.getAttribute('data-toggle');
            var target = document.querySelector(sel);
            var opening = target.hasAttribute('hidden');
            if (opening) { target.removeAttribute('hidden'); } else { target.setAttribute('hidden', ''); }
            var first = null;
            document.querySelectorAll('[data-toggle="' + sel + '"]').forEach(function (b) {
                if (!b.hasAttribute('data-always')) {
                    b.textContent = opening ? b.getAttribute('data-close') : b.getAttribute('data-open');
                    b.setAttribute('aria-expanded', opening ? 'true' : 'false');
                    if (b.hasAttribute('data-hide-when-open')) { b.hidden = opening; first = first || b; }
                }
            });
            if (!opening) { (first || btn).scrollIntoView({ block: 'center' }); }
        });
    });
    window.addEventListener('scroll', update, { passive: true });
    update();
})();
