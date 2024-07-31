/* global data */

interface formElements extends HTMLFormControlsCollection {
  time: HTMLInputElement;
  day: HTMLInputElement;
  info: HTMLInputElement;
}

/* event listener for if a user tries to add a new entry */
const $dialog = document.querySelector('dialog');
if (!$dialog) throw Error('$dialog does not exist');

const $newEntryClick = document.querySelector('.new-event');
if (!$newEntryClick) throw Error('$newEntryClick does not exist');

$newEntryClick.addEventListener('click', function (event) {
    $dialog.showModal();
});

const $dismissModal = document.querySelector('.dismiss-modal-cancel');
if (!$dismissModal) throw Error('$dismissModal does not exist');

$dismissModal.addEventListener('click', function (event) {
    $dialog.close();
});

const $form = document.querySelector('form') as HTMLFormElement;
if (!$form) throw new Error('$form is null');

/* listener for when user submits new event entry */
$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const $formElements = $form.elements as formElements;

  const $dialog = document.querySelector('dialog');
  if (!$dialog) throw Error('$dialog does not exist');

  /* event id should always increment so that no two events share an event id */
  const eventID = data.nextEventId;
  const eventDetail: eventFormat = {
    eventID: eventID,
    time: $formElements.time.value,
    day: $formElements.day.value,
    info: $formElements.info.value,
  };

  /* adding the new event to the exiting data object */
  data.events.push(eventDetail);

  /* entry id should always increment so that no two entries share an entry id */
  data.nextEventId = eventID + 1;

  /* updating the dom tree with the new event */
  const $table = document.querySelector('table') as HTMLTableElement;
  if (!$table) throw new Error('The $table query failed');

  let rowNum = 1;

  for (let i = 0; i < data.events.length; i++) {
    if (data.dow === data.events[i].day) {
      const $row = $table.rows[rowNum];
      $row.className = data.events[i].eventID.toString();
      const $time = $row.cells[0];
      $time.textContent = data.events[i].time;
      const $info = $row.cells[1];
      $info.textContent = data.events[i].info;
      const $actions = $row.cells[2];

      $actions.style.display = 'flex';
      $actions.style.justifyContent = 'space-evenly';
      $actions.style.alignItems = 'center';

      /* create edit button */
      const $editButton = document.createElement('a');
      $editButton.href = '#';
      $editButton.textContent = 'Edit';
      $editButton.className = 'edit_button';

      /* create delete button */
      const $deleteButton = document.createElement('a');
      $deleteButton.href = '#';
      $deleteButton.textContent = 'Delete';
      $deleteButton.className = 'delete_button';

      /* append edit and delete to action cells */
      $actions.appendChild($editButton);
      $actions.appendChild($deleteButton);

      rowNum++;
    }
  }

  /* form is reset */
  $form.reset();

  /* entries are written to local storage */
  writeEntries();

  $dialog.close();
});
