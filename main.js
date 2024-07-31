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
    var $table = document.querySelector('table');
    if (!$table)
        throw new Error('The $table query failed');
    var rowNum = 1;
    for (var i = 0; i < data.events.length; i++) {
        if (data.dow === data.events[i].day) {
            var $row = $table.rows[rowNum];
            $row.className = data.events[i].eventID.toString();
            var $time = $row.cells[0];
            $time.textContent = data.events[i].time;
            var $info = $row.cells[1];
            $info.textContent = data.events[i].info;
            var $actions = $row.cells[2];
            $actions.style.display = 'flex';
            $actions.style.justifyContent = 'space-evenly';
            $actions.style.alignItems = 'center';
            /* create edit button */
            var $editButton = document.createElement('a');
            $editButton.href = '#';
            $editButton.textContent = 'Edit';
            $editButton.className = 'edit_button';
            /* create delete button */
            var $deleteButton = document.createElement('a');
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
