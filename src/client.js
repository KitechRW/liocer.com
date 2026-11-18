const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');
function closeMenu() {
  menu?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('is-open');
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.header-inner')) closeMenu();
});
navigation?.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
const interest = document.querySelector('#interest');
const form = document.querySelector('#enquiry-form');
if (interest && form) {
  const requested = new URLSearchParams(location.search).get('interest');
  if ([...interest.options].some(option => option.value === requested)) interest.value = requested;
  const showTimeline = () => { document.querySelector('#timeline-field').hidden = interest.value !== 'custom'; };
  showTimeline();
  interest.addEventListener('change', showTimeline);
  let brief = '';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const category = interest.selectedOptions[0].textContent;
    brief = [
      `LIOCER enquiry: ${category}`,
      '', `Name: ${data.get('name').trim()}`, `Email: ${data.get('email').trim()}`,
      data.get('organization').trim() ? `Organization: ${data.get('organization').trim()}` : '',
      interest.value === 'custom' && data.get('timeline').trim() ? `Preferred timeline: ${data.get('timeline').trim()}` : '',
      '', data.get('message').trim()
    ].filter((line, index, all) => line || index === 1 || (index > 1 && all[index - 1])).join('\n');
    const email = document.body.dataset.contactEmail;
    const emailLink = document.querySelector('#email-brief');
    emailLink.hidden = !email;
    if (email) emailLink.href = `mailto:${email}?subject=${encodeURIComponent(`LIOCER enquiry: ${category}`)}&body=${encodeURIComponent(brief)}`;
    document.querySelector('#brief-content').textContent = brief;
    form.hidden = true;
    document.querySelector('#enquiry-result').hidden = false;
    document.querySelector('#result-title').focus();
  });
  document.querySelector('#copy-brief').addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(brief);
      status.textContent = 'Enquiry copied.';
    } catch {
      status.textContent = 'Copy is unavailable here. Use Download brief or select the text above.';
    }
  });
  document.querySelector('#download-brief').addEventListener('click', () => {
    const target = document.createElement('a');
    target.href = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
    target.download = 'LIOCER-Enquiry.txt';
    target.click();
    setTimeout(() => URL.revokeObjectURL(target.href), 1000);
  });
  document.querySelector('#edit-brief').addEventListener('click', () => {
    document.querySelector('#enquiry-result').hidden = true;
    document.querySelector('#copy-status').textContent = '';
    form.hidden = false;
    document.querySelector('#name').focus();
  });
}
