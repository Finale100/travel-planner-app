let addTrip = document.getElementById('new-trip')

document.addEventListener('DOMContentLoaded', init)

function init() {
  fetchTrips()
  addTrip.addEventListener('click', createNewTrip)
}

function createNewTrip() {
  Trip.newTrip()
}

function fetchTrips() {
  fetch('http://localhost:3000/trips')
  .then(response => response.json())
  .then(json => {
    for(let trip of json) {
      Trip.renderSideBar(trip)
    }
  })
}

function renderTripProfile(event) {
  let id = event.currentTarget.dataset.id
  let app = new App()
    App.fetchOneTrip(id).then(tripJson => {
    Trip.renderTripSegment(tripJson)
    Accommodation.createAccommodationSegment(tripJson)
    Ticket.createTicketSegment(tripJson)
    Experience.createExperienceSegment(tripJson)
  })
}

function createSegment(name) {
  let columnDiv = document.querySelector('.twelve')
  let segmentDiv = document.createElement('div')
  let labelDiv = document.createElement('div')
  let addButtonDiv = document.createElement('div')
  let cardsDiv = document.createElement('div')

  segmentDiv.classList.add("ui", "segment")
  labelDiv.classList.add("ui", "top", "attached", "label")
  addButtonDiv.classList.add("ui", "blue", "button")
  cardsDiv.classList.add("ui", "cards")

  addButtonDiv.innerText = "Add New"
  labelDiv.innerText = name

  columnDiv.appendChild(segmentDiv)
  segmentDiv.append(labelDiv, addButtonDiv, cardsDiv)

  return segmentDiv
}
