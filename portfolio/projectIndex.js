document.addEventListener('DOMContentLoaded', () => {
    const tagsContainer = document.getElementById('tags');
    const input = document.getElementById('tagInput');
    const addBtn = document.getElementById('addTagBtn');

    function createTag(label) {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = label;
        return span;
    }

    function addTagFromInput() {
        const value = input.value.trim();
        if (!value) return;
        tagsContainer.appendChild(createTag(value));
        input.value = '';
        input.focus();
    }

    addBtn && addBtn.addEventListener('click', addTagFromInput);
    input && input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); addTagFromInput(); } });
});

// Filter buttons for project categories
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = Array.from(document.querySelectorAll('.filters [data-filter]'));
    const articles = Array.from(document.querySelectorAll('main > article'));

    // Animations disabled on projectIndex: mark project items visible immediately
    const projectItems = Array.from(document.querySelectorAll('main > article'));
    projectItems.forEach(a => a.classList.add('is-visible'));
    const headerEl = document.querySelector('header h1');
    const navBtn = document.querySelector('nav>button');
    headerEl && headerEl.classList.add('is-visible');
    navBtn && navBtn.classList.add('is-visible');

    function applyFilter(filter) {
        articles.forEach((a, i) => {
            if (filter === 'all') {
                a.style.display = '';
                a.classList.add('is-visible');
                return;
            }
            const matches = (
                (filter === 'personal' && a.classList.contains('personalproject')) ||
                (filter === 'school' && a.classList.contains('schoolproject'))
            );
            if (matches) {
                a.style.display = '';
                a.classList.add('is-visible');
            } else {
                // fade out then hide
                a.classList.remove('is-visible');
                a.style.transition = 'opacity 260ms ease, transform 260ms ease';
                a.style.opacity = '0';
                a.style.transform = 'translateY(12px)';
                setTimeout(() => { a.style.display = 'none'; a.style.opacity = ''; a.style.transform = ''; a.style.transition = ''; }, 280);
            }
        });
        filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });

    // initialize to 'all'
    if (filterButtons.length) applyFilter('all');
});
