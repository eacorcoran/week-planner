/* global data */
/* event listener for if a user tries to add a new entry */
var $dialog = document.querySelector('dialog');
if (!$dialog)
    throw Error('$dialog does not exist');
var $newEntryClick = document.querySelector('.new-event');
if (!$newEntryClick)
    throw Error('$newEntryClick does not exist');
$newEntryClick.addEventListener('click', function (event) {
    $dialog.showModal();
});
var $dismissModal = document.querySelector('.dismiss-modal-cancel');
if (!$dismissModal)
    throw Error('$dismissModal does not exist');
$dismissModal.addEventListener('click', function (event) {
    $dialog.close();
});
var $form = document.querySelector('form');
if (!$form)
    throw new Error('$form is null');
/* listener for when user submits new event entry */
$form.addEventListener('submit', function (event) {
    event.preventDefault();
    var $formElements = $form.elements;
    var $dialog = document.querySelector('dialog');
    if (!$dialog)
        throw Error('$dialog does not exist');
    /* event id should always increment so that no two events share an event id */
    var eventID = data.nextEventId;
    var eventDetail = {
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
    var $dowSelection = document.getElementById('dow');
    if (!$dowSelection)
        throw new Error('$dowSelection is null');
    data.dow = readDOW();
    $dowSelection.value = data.dow;
    updateDOMbyDay();
});
/* Updates local storage, data array, and the DOM event tree with events for the selected date*/
var $dowSelection = document.getElementById('dow');
if (!$dowSelection)
    throw new Error('$dowSelection is null');
$dowSelection.addEventListener('change', function (event) {
    var $eventTarget = event.target;
    var selectedDate = $eventTarget.value;
    writeDOW(selectedDate);
    data.dow = selectedDate;
    updateDOMbyDay();
});
