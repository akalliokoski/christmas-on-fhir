export class Patient {
  id;
  firstName;
  lastName;

  constructor(id = null, firstName = null, lastName = null) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export class Appointment {
  id;
  start;
  end;
  practitionerId;
  roomId;

  constructor(
    id = null,
    start = null,
    end = null,
    practitionerId = null,
    roomId = null
  ) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.practitionerId = practitionerId;
    this.roomId = roomId;
  }
}

export class Practitioner {
  id;
  firstName;
  lastName;

  constructor(id = null, firstName = null, lastName = null) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export class Room {
  id;
  info;

  constructor(id = null, info = null) {
    this.id = id;
    this.info = info;
  }
}
