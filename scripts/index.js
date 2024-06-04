"use strict";
//   Add an Event Handler for the window load event and functions that "listen" for the following events occurring on the form
//   (Note:  You can see these requirements in action under the "expected results" section below).
window.addEventListener("load", function() {
  document.getElementById("weight").oninput = handleWeightUpdate;
  document.getElementById("days").oninput = handleDaysUpdate;

  // add event listeners to all checkboxes on initial load
  document.getElementById("sing").addEventListener("change", handleCheckboxChange)
  document.getElementById("cute").addEventListener("change", handleCheckboxChange)
  document.getElementById("trick").addEventListener("change", handleCheckboxChange)

  // run checkbox on load to set initial state
  handleCheckboxChange()
  // run total cost on load to set initial state
  updateTotalCost()
})


// TODO: Changes to the Kennel Size dropdown box
//    There is an input element that gathers the weight of the pet. Then it displays the size of the kennel in the adjacent text box.
//    - Define a variable for size
//      - Use an if/else if statement or a case statement to set the value of the size
//        - if the weight is NaN, set the size to the empty string ("")
//        - if weight is less than or equal to 4, set the size to "mini"
//        - if weight is greater than 4 but less than or equal to 12, set size to "small"
//        - if weight is greater than 12 but less than or equal to 50, set size to "medium"
//        - if the weight is greater than 50, set the size to "large"
//      - Display the text value of the size variable in the size element

function handleWeightUpdate() {
  var weight = document.getElementById("weight").value;
  var size = document.getElementById("size").value;
  if (weight < 1 || isNaN(weight)) {
    size = "";
  } else if (weight <= 4) {
    size = "mini";
  } else if (weight <= 12) {
    size = "small";
  } else if (weight <= 50) {
    size = "medium";
  } else {
    size = "large";
  }

  document.getElementById("size").value = size;
  // finally update the total cost
  updateTotalCost()
}


// TODO: Changes to the Days of Boarding text box
//    - There is an input element that gathers the number of days for boarding. Then it displays the cost of the boarding in the adjacent text box.
//    - Gather the value of the days' input element
//    - If the value of days is NaN
//        - set the days input to 0
//        - set the boardingFee input to 0.00
//    - If the value of days is a number
//        - set the days input to the integer returned from the parseInt function
//        - set the boardingFee to 19.99 times the number of days
//        - specify this value only has two digits after the decimal place
//        - make sure the boarding fee is still calculated correctly when boarding days exceed 50 and the total exceeds $1000.

function handleDaysUpdate() {
  var days = document.getElementById("days").value;
  var boardingFee;
  if (days === "" || isNaN(days)) {
    days = 0;
    boardingFee = 0.00;
  } else {
    days = parseInt(days);
    boardingFee = (19.99 * days).toFixed(2);
  }

  document.getElementById("days").value = days;
  document.getElementById("boardingFee").value = boardingFee;
  updateTotalCost()
}



// TODO: Add a Function that Updates the Total Costs
//    - At the bottom of the page is a section that displays the total costs including boarding, registration, and total. Write a function that updates these values when called.
//        - Define a variable for registration cost with an initial value of zero
//        - Define a variable for the number of events with an initial value of zero
//        - Define a variable for boarding cost
//          - get the value from the boardingFee input
//          - if the value is the empty string ("")
//            - set the boarding cost to 0 (the number zero as it will be used in an addition problem later)
//            - otherwise, turn it into a number (be sure to save the result back in the variable for later use)
//        - If the sing checkbox is checked *check below for an example
//          - add one to the number of events
//        - If the cute checkbox is checked
//          - add one to the number of events
//        - If the trick checkbox is checked
//          - add one to the number of events
//        - Compute the registration cost
//          - it is 120 * the number of events
//        - Compute the total
//          - it is the boarding cost + registration cost
//        - Display the boarding cost in the boardingCost element
//          - specify this value only has two digits after the decimal place
//        - Display the registration cost in the registrationCost element
//          - specify this value only has two digits after the decimal place
//        - Display the total in the totalCost element
//          - specify this value only has two digits after the decimal place
//    - Now go back to the days of boarding event handler
//      - add a call to this update total cost function
//      - test it to make sure the totals update as expected

function updateTotalCost() {
  var registrationCost = 0;
  var numEvents = 0;
  var boardingCost = document.getElementById("boardingFee").value === "" ? 0 : parseFloat(document.getElementById("boardingFee").value);
  if (document.getElementById("sing").checked) {
    numEvents++;
  }
  if (document.getElementById("cute").checked) {
    numEvents++;
  }
  if (document.getElementById("trick").checked) {
    numEvents++;
  }

  // calculate costs
  registrationCost = 120 * numEvents;
  var total = boardingCost + registrationCost;

  // update values
  document.getElementById("boardingCost").value = boardingCost.toFixed(2);
  document.getElementById("registrationCost").value = registrationCost.toFixed(2);
  document.getElementById("totalCost").value = total.toFixed(2);

}

// TODO: Add Event Handlers for the Checkboxes
//  - There are three checkboxes. Each is followed by a div containing a fieldset, labels, and input elements. T
//    his div is to only be shown when the associated checkbox is checked.
// I'm assuming more than one checkbox can be checked at a time. -- instruction video says yes

function handleCheckboxChange() {
  var singCheckbox = document.getElementById("sing");
  var cuteCheckbox = document.getElementById("cute");
  var trickCheckbox = document.getElementById("trick");

  if (singCheckbox.checked) {
    document.getElementById("singAdd").style.display = "block";
  } else {
    document.getElementById("singAdd").style.display = "none";
  }

  if (cuteCheckbox.checked) {
    document.getElementById("cuteAdd").style.display = "block";
  } else {
    document.getElementById("cuteAdd").style.display = "none";
  }

  if (trickCheckbox.checked) {
    document.getElementById("trickAdd").style.display = "block";
  } else {
    document.getElementById("trickAdd").style.display = "none";
  }

  // finally update total cost
  updateTotalCost()
}

// does it have to be in the css file? or can I inline it? I inlined it. I suppose I could have set a className?
// TODO: In the .css file
//  - Add a style block for these three divs
//  - Set the display property to none


// I added a single handle function for all these checkboxes and put initial call in the window load event so inital state is loaded
// TODO: Add an event handler to the sing checkbox
//    - Have it respond to the change event
//    - If the checkbox is checked
//      - set the display to block X
//    - If the checkbox is not checked (can just use else) X
//      - set the display to none X
//    - add a call to the update total cost function
//    - test it to make sure the totals update as expected X
// TODO: Add another event listener like the one above for the cute checkbox.

// TODO: Add another event listener like the one above for the trick checkbox.
