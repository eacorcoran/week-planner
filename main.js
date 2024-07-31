/* global data */
/* event listener for if a user tries to add a new entry */
var $dialog = document.querySelector('dialog');
if (!$dialog)
    throw Error('$dialog does not exist');
var $newEntryClick = document.querySelector('.new-event');
if (!$newEntryClick)
    throw Error('$newEntryClick does not exist');
$newEntryClick.addEventListener('click', function (event) {
    var $EventTarget = event.target;
    if (!$EventTarget)
        throw new Error('$eventTarget is null');
    /* checking to make sure that new event is selected */
    if ($EventTarget.matches('.new-event')) {
        $dialog.showModal();
    }
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
    /* form is reset */
    $form.reset();
    /* entries are written to local storage */
    writeEntries();
    $dialog.close();
});
