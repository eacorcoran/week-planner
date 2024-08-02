/* exported data */
interface eventFormat {
  eventID: number;
  time: string;
  day: string;
  info: string;
}

let data = {
  dow: readDOW(),
  events: readEntries(),
  editing: {} as eventFormat,
  nextEventId: readNextEventID(),
};

/* writing date selected to local storage */
function writeDOW(selectedDate): void {
  const dowJSON: string = JSON.stringify(selectedDate);
  localStorage.setItem('dow', dowJSON);
}

/* writing entries (and edits) to local storage */
function writeEntries(): void {
  const entriesJSON: string = JSON.stringify(data.events);
  const nextEntryJSON: string = JSON.stringify(data.nextEventId);
  localStorage.setItem('events', entriesJSON);
  localStorage.setItem('nextEventID', nextEntryJSON);
}

/* reading date selected from local storage */
function readDOW(): string {
  let dow = '';
  const readJSON = localStorage.getItem('dow');
  if (readJSON === null) {
    dow = '';
  } else {
    dow = JSON.parse(readJSON);
  }
  return dow;
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

/*Function to update the dom tree for events that match the date selected*/
function updateDOMbyDay(): void {
  const $table = document.querySelector('table');
  if (!$table) throw new Error('The $table query failed');

  /* removes all entries */
  let rowNumdelete = 1;

  for (let i = 0; i < data.events.length; i++) {
    const $row = $table.rows[rowNumdelete];
    $row.className = '';
    const $time = $row.cells[0];
    $time.textContent = '';
    const $info = $row.cells[1];
    $info.textContent = '';
    const $actions = $row.cells[2];
    $actions.innerHTML = '';

    rowNumdelete++;
  }

  /* updates the dom tree with the data object entries */
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
      $actions.innerHTML = '';
      $actions.appendChild($editButton);
      $actions.appendChild($deleteButton);

      rowNum++;
    }
  }
}
