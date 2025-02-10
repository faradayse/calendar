// Array of event objects
const events = [
    {
      title: "Team Meeting",
      date: new Date('2025-02-15T10:00:00'),
      location: "Conference Room A",
      attendees: new Set(["Alice", "Bob", "Charlie"])
    },
    {
      title: "Product Launch",
      date: new Date('2025-02-20T14:00:00'),
      location: "Main Hall",
      attendees: new Set(["Dave", "Eve", "Frank"])
    },
    {
      title: "Project Review",
      date: new Date('2025-02-18T16:00:00'),
      location: "Board Room",
      attendees: new Set(["George", "Hannah"])
    }
  ];
  
  // WeakMap to store event organizers
  const eventOrganizers = new WeakMap();
  eventOrganizers.set(events[0], "Alice");
  eventOrganizers.set(events[1], "Dave");
  eventOrganizers.set(events[2], "George");
  
  // Function to display all events within the next 7 days
  function displayNextWeekEvents() {
    const now = new Date('2025-02-09T21:59:00');//current date and time as provided
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Format all events for display
  const tableData = events.map(event => {
    const isUpcoming = event.date > now && event.date < nextWeek;
    return {
      'Title': event.title,
      'Date': event.date.toLocaleDateString(),
      'Time': event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      'Location': event.location,
      'Attendees': Array.from(event.attendees).join(', '),
      'Upcoming': isUpcoming ? '✅' : '' // Highlight upcoming events
    };
})
  console.table(tableData);
}


  // Function to add an attendee to an event
  function addAttendee(eventTitle, attendeeName) {
    const event = events.find(e => e.title === eventTitle);
    if (event) {
      event.attendees.add(attendeeName);
      console.log(`${attendeeName} has been added to ${eventTitle}.`);
    } else {
      console.log(`Event "${eventTitle}" not found.`);
    }
  }
  
  // Function to convert all events to JSON with custom date formatting
  function eventsToJson() {
    const jsonEvents = JSON.stringify(events.map(event => {
      const formattedDate = event.date.toJSON().slice(0, 10).replace(/-/g, '/');
      return {
        ...event,
        date: event.date.toISOString(), // Convert to ISO string for JSON
        formattedDate: formattedDate
      };
    }));
    console.log(jsonEvents);
  }
  
  // Display properties of all events
  function displayAllEventsProperties() {
    events.forEach((event, index) => {
      console.log(`\nEvent ${index + 1} Properties:`);
      console.log("Keys:", Object.keys(event));
      console.log("Values:", Object.values(event).map(v => v instanceof Set ? Array.from(v) : v));
      console.log("Entries:");
      Object.entries(event).forEach(([key, value]) => {
        console.log(`${key}: ${value instanceof Set ? Array.from(value) : value}`);
      });
    });
  }
  
  // Display all event titles and dates
  function displayAllEvents() {
    events.forEach(event => {
      console.log(`${event.title} - ${event.date.toDateString()}`);
    });
  }
  
  // Delete all events from array
  function deleteAllEvents() {
    events.splice(0, events.length);
    console.log("All events have been deleted.");
  }
  
  // Find event with most attendees from all events
  function eventWithMostAttendees() {
    if (events.length === 0) {
      console.log("No events found.");
      return;
    }
    
    const event = events.reduce((max, event) => 
      event.attendees.size > max.attendees.size ? event : max
    );
    console.log(`Event with most attendees: ${event.title} with ${event.attendees.size} attendees.`);
  }
  
  // Example usage for all events:
  console.log("Events in next 7 days:");
  displayNextWeekEvents();
  
  // Add attendees to different events
  addAttendee("Team Meeting", "NewPerson1");
  addAttendee("Product Launch", "NewPerson2");
  
  console.log("\nAll events with dates:");
  displayAllEvents();
  
  console.log("\nJSON representation of all events:");
  eventsToJson();
  
  console.log("\nAll Events Properties:");
  displayAllEventsProperties();
  
  console.log("\nDeleting all events:");
  deleteAllEvents();
  
  console.log("\nAfter deletion, remaining events:");
  displayAllEvents();
  
  // Since all events are deleted, we'll add one back just for this example
  events.push({
    title: "New Event",
    date: new Date('2025-02-21T10:00:00'),
    location: "New Location",
    attendees: new Set(["Person1", "Person2"])
  });
  
  console.log("\nNew event added for demonstration:");
  displayAllEvents();
  
  console.log("\nEvent with most attendees (among new event):");
  eventWithMostAttendees();