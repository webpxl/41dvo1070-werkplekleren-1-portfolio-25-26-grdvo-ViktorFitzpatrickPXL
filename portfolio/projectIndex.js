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

    function applyFilter(filter) {
        articles.forEach(a => {
            if (filter === 'all') {
                a.style.display = '';
                return;
            }
            const matches = (
                (filter === 'personal' && a.classList.contains('personalproject')) ||
                (filter === 'school' && a.classList.contains('schoolproject'))
            );
            a.style.display = matches ? '' : 'none';
        });
        filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });

    // initialize to 'all'
    if (filterButtons.length) applyFilter('all');
});
