var data = {
    dow: "Monday",
    events: readEntries(),
    editing: {},
    nextEventId: readNextEventID(),
};
/* writing entries (and edits) to local storage */
function writeEntries() {
    var entriesJSON = JSON.stringify(data.events);
    var nextEntryJSON = JSON.stringify(data.nextEventId);
    localStorage.setItem('events', entriesJSON);
    localStorage.setItem('nextEventID', nextEntryJSON);
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
