/* exported data */
interface eventFormat {
  eventID: number;
  time: string;
  day: string;
  info: string;
}

let data = {
  dow: 'monday',
  events: readEntries(),
  editing: {} as eventFormat,
  nextEventId: readNextEventID(),
};

/* writing entries (and edits) to local storage */
function writeEntries(): void {
  const entriesJSON: string = JSON.stringify(data.events);
  const nextEntryJSON: string = JSON.stringify(data.nextEventId);
  localStorage.setItem('events', entriesJSON);
  localStorage.setItem('nextEventID', nextEntryJSON);
}

/* reading events from local storage */
function readEntries(): eventFormat[] {
  let newEvents: eventFormat[] = [];
  const readJSON = localStorage.getItem('events');
  if (readJSON === null) {
    newEvents = [];
  } else {
    newEvents = JSON.parse(readJSON);
  }
  return newEvents;
}

/* get next event ID from local storage */
function readNextEventID(): number {
  let nextEventID: number = 1;
  const readJSON = localStorage.getItem('nextEventID');
  if (readJSON === null) {
    nextEventID = 1;
  } else {
    nextEventID = JSON.parse(readJSON);
  }
  return nextEventID;
}
