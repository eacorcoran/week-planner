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
    /* checking to make sure that delete-entry is selected */
    if ($EventTarget.matches('.new-event')) {
        $dialog.showModal();
    }
});
