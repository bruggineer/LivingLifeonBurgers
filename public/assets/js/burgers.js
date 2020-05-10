// Make sure we wait to attach the handlers until the DOM is fully loaded.
$(function () {
  // Select burger's element ID 
  var id;
  var newDevour;

  $(".name-button").on("click", function (event) {
    console.log(event)
    newDevour = $(this).data("newdevour");
    id = $(this).attr("id");
    console.log(id)
    console.log(newDevour)
    var changeDevour = {
      id: id,
      devoured: newDevour
    };
    console.log(changeDevour)

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: changeDevour
    }).then(function () {
      console.log("updated devoured state for " + id);
      location.reload();
    })
  })

  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#burger").val().trim(),
      devoured: 0
    };
    console.log(newBurger)

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});


