/* event listener for if a user tries to add a new entry */
const $dialog = document.querySelector('dialog');
if (!$dialog) throw Error('$dialog does not exist');

const $newEntryClick = document.querySelector('.new-event');
if (!$newEntryClick) throw Error('$newEntryClick does not exist');

$newEntryClick.addEventListener('click', function (event) {
  const $EventTarget = event.target as HTMLElement;
  if (!$EventTarget) throw new Error('$eventTarget is null');

  /* checking to make sure that delete-entry is selected */
  if ($EventTarget.matches('.new-event')) {
    $dialog.showModal();
  }
});
