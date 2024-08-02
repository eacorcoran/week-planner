var data = {
    dow: readDOW(),
    events: readEntries(),
    editing: {},
    nextEventId: readNextEventID(),
};
/* writing date selected to local storage */
function writeDOW(selectedDate) {
    var dowJSON = JSON.stringify(selectedDate);
    localStorage.setItem('dow', dowJSON);
}
/* writing entries (and edits) to local storage */
function writeEntries() {
    var entriesJSON = JSON.stringify(data.events);
    var nextEntryJSON = JSON.stringify(data.nextEventId);
    localStorage.setItem('events', entriesJSON);
    localStorage.setItem('nextEventID', nextEntryJSON);
}
/* reading date selected from local storage */
function readDOW() {
    var dow = '';
    var readJSON = localStorage.getItem('dow');
    if (readJSON === null) {
        dow = '';
    }
    else {
        dow = JSON.parse(readJSON);
    }
    return dow;
}
/* reading events from local storage */
function readEntries() {
    var newEvents = [];
    var readJSON = localStorage.getItem('events');
    if (readJSON === null) {
        newEvents = [];
    }
    else {
        newEvents = JSON.parse(readJSON);
    }
    return newEvents;
}
/* get next event ID from local storage */
function readNextEventID() {
    var nextEventID = 1;
    var readJSON = localStorage.getItem('nextEventID');
    if (readJSON === null) {
        nextEventID = 1;
    }
    else {
        nextEventID = JSON.parse(readJSON);
    }
    return nextEventID;
}
/*Function to update the dom tree for events that match the date selected*/
function updateDOMbyDay() {
    var $table = document.querySelector('table');
    if (!$table)
        throw new Error('The $table query failed');
    /* removes all entries */
    var rowNumdelete = 1;
    for (var i = 0; i < data.events.length; i++) {
        var $row = $table.rows[rowNumdelete];
        $row.className = '';
        var $time = $row.cells[0];
        $time.textContent = '';
        var $info = $row.cells[1];
        $info.textContent = '';
        var $actions = $row.cells[2];
        $actions.innerHTML = '';
        rowNumdelete++;
    }
    /* updates the dom tree with the data object entries */
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
            $actions.innerHTML = '';
            $actions.appendChild($editButton);
            $actions.appendChild($deleteButton);
            rowNum++;
        }
    }
}
