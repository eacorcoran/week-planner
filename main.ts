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
  updateDOMbyDay();

  /* form is reset */
  $form.reset();

  /* entries are written to local storage */
  writeEntries();

  $dialog.close();
});

/* listener for when content is loaded */
document.addEventListener('DOMContentLoaded', function () {
  const $dowSelection = document.getElementById('dow') as HTMLSelectElement;
  if (!$dowSelection) throw new Error('$dowSelection is null');

  data.dow = readDOW();
  $dowSelection.value = data.dow;

  updateDOMbyDay();

});

/* Updates local storage, data array, and the DOM event tree with events for the selected date*/
const $dowSelection = document.getElementById('dow');
if (!$dowSelection) throw new Error('$dowSelection is null');

$dowSelection.addEventListener('change', function (event) {
  const $eventTarget = event.target as HTMLSelectElement;
  const selectedDate = $eventTarget.value;
  writeDOW(selectedDate);
  data.dow = selectedDate;
  updateDOMbyDay();
});
