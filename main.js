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
            d.style.display = ''; // reset to CSS default (hover controls it)
        });
    }
});


/* ── 4. REGISTER PAGE — TAB SWITCHER ─────────────────────────
   
   What this does:
   - On the Register page there are two tabs: "Register" and "Sign In"
   - When you click a tab, it highlights that tab and shows
     the matching form, hiding the other one
   
   The "if" guard means this only runs on the Register page
   where .auth-tab elements actually exist.
--------------------------------------------------------------- */
if (document.querySelector('.auth-tab')) {
    const tabs = document.querySelectorAll('.auth-tab');
    const registerForm = document.getElementById('register-form');
    const signinForm = document.getElementById('signin-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {

            // Remove "active" from all tabs first
            tabs.forEach(t => t.classList.remove('active'));

            // Add "active" to the tab that was clicked
            tab.classList.add('active');

            // Show the correct form based on which tab was clicked
            if (tab.dataset.tab === 'register') {
                registerForm.classList.remove('hidden');
                signinForm.classList.add('hidden');
            } else {
                signinForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
            }
        });
    });
}


/* ── 5. REGISTER PAGE — PASSWORD SHOW/HIDE ───────────────────
   
   What this does:
   - There is a small eye icon button inside each password field
   - Clicking it switches the input between type="password" 
     (shows dots ••••) and type="text" (shows actual characters)
   - The icon also changes to show whether it's visible or not
   
   The "if" guard means this only runs on the Register page.
--------------------------------------------------------------- */
if (document.querySelector('.toggle-pw')) {
    document.querySelectorAll('.toggle-pw').forEach(btn => {
        btn.addEventListener('click', () => {

            // Find the password input inside the same wrapper div
            const input = btn.closest('.auth-input-wrap').querySelector('input');

            // Find the icon inside the button
            const icon = btn.querySelector('.material-symbols-outlined');

            // If currently hidden (password), show it — and vice versa
            if (input.type === 'password') {
                input.type = 'text';
                icon.textContent = 'visibility_off'; // eye with a line through it
            } else {
                input.type = 'password';
                icon.textContent = 'visibility'; // normal eye icon
            }
        });
    });
}


/* ── 6. DYNAMIC DISPLAY — POLLING (הצגה דינאמית) ────────────
   
   What this does:
   - Every 10 seconds, the browser automatically asks the server:
     "Are there any new notifications?"
   - If there are, it updates the notification dropdown instantly
     without the user needing to refresh the page
   
   This is called POLLING — the browser keeps checking repeatedly
   on a fixed timer, like tapping someone on the shoulder every
   10 seconds to ask if there's news.
   
   Right now there is no real server, so we simulate the response
   with fake data (clearly marked below). When you have a real
   backend, you replace the fake data with a real fetch() call.
--------------------------------------------------------------- */

// ── Fake data: simulates what a real server would return ──────
// In a real site this would be replaced with:
//   const response = await fetch('/api/notifications');
//   const notifications = await response.json();
function getFakeNotifications() {
    // Returns a random number of notifications each time
    // so you can see the dropdown actually changing
    const all = [
        '3 unread messages',
        '2 interview reminders',
        '1 new saved job match',
        'New job alert: Frontend Developer',
        'Your resume was viewed by Acme Logistics',
        'BlueWave Services replied to your message',
    ];

    // Pick a random slice of the list to simulate new data coming in
    const count = Math.floor(Math.random() * 3) + 2; // between 2 and 4 items
    return all.slice(0, count);
}

// ── The polling function — runs every 10 seconds ──────────────
function pollNotifications() {
    // Find the notifications dropdown in the nav
    const dropdown = document.querySelector('.notification .dropdown');

    // If there's no dropdown on this page, do nothing
    if (!dropdown) return;

    // Get the (fake) notifications data
    const notifications = getFakeNotifications();

    // Clear the old list
    dropdown.innerHTML = '';

    // Build new list items from the fresh data
    notifications.forEach(message => {
        const li = document.createElement('li'); // create a new <li> element
        li.textContent = message;                // fill it with the message text
        dropdown.appendChild(li);               // add it to the dropdown
    });

    console.log('Polling ran — notifications updated'); // visible in browser Console (F12)
}

// Run immediately when the page loads so there's no delay
pollNotifications();

// Then repeat every 10 seconds (10000 milliseconds)
// setInterval means: "run this function every X milliseconds forever"
setInterval(pollNotifications, 10000);
