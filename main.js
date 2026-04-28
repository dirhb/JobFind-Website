/* ── 1. ACCORDION (Online Resume page only) ──────────────────
   
   What this does:
   - Finds all accordion section buttons
   - When one is clicked: closes all sections first,
     then opens the clicked one (unless it was already open)
   
   The "if" guard means this code only runs on pages that
   actually have an accordion — it won't cause errors on
   other pages where .accordion doesn't exist.
--------------------------------------------------------------- */
if (document.querySelector('.accordion')) {

    document.querySelectorAll('.accordion-header').forEach(btn => {

        btn.addEventListener('click', () => {

            const item = btn.closest('.accordion-item');
            const body = item.querySelector('.accordion-body');
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            // Close every section
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                i.querySelector('.accordion-body').hidden = true;
                i.classList.remove('open');
            });

            // Open the clicked one — only if it wasn't already open
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                body.hidden = false;
                item.classList.add('open');
            }
        });
    });
}


/* ── 2. NAVIGATION DROPDOWNS ─────────────────────────────────
 
   What this does:
   - Currently the dropdowns work via CSS :hover
   - This adds keyboard support (Enter/Space to toggle)
     so the site is accessible without a mouse
--------------------------------------------------------------- */
document.querySelectorAll('.notification-icon, .account-icon').forEach(btn => {

    btn.addEventListener('keydown', (e) => {

        // If the user presses Enter or Space on the button
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();

            // Find the dropdown inside the same parent <li>
            const dropdown = btn.parentElement.querySelector('.dropdown');
            const isVisible = dropdown.style.display === 'block';

            // Toggle it open or closed
            dropdown.style.display = isVisible ? 'none' : 'block';
        }
    });
});


/* ── 3. CLOSE DROPDOWNS WHEN CLICKING OUTSIDE ────────────────
 
   What this does:
   - If the user clicks anywhere on the page that isn't
     inside a dropdown or its button, close all dropdowns
   - Without this, dropdowns opened via keyboard would
     stay open forever
--------------------------------------------------------------- */
document.addEventListener('click', (e) => {

    // Check if the click was outside any .notification or .account item
    if (!e.target.closest('.notification') && !e.target.closest('.account')) {
        document.querySelectorAll('.dropdown').forEach(d => {
            d.style.display = '';  // reset to CSS default (hover controls it)
        });
    }
});