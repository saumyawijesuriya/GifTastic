console.log("heloo")
var animalNames = ["dog", "cat", "monkey", "mouse"]

function showAnimlas() {

  var animals = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animals + "&api_key=gba5YpH7CDaQVBMrjAkgMkbvKacAVXHU&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    var result = response.data;

    for (var i = 0; i < result.length; i++) {

      var picDiv = $('<div>');
      var p = $('<p>');

      var picRating = result[i].rating;
      p.text('Rating : ' + picRating);
      picDiv.append(p);
      console.log(picRating)

      var animalpic = $('<img>');
      var still = result[i].images.fixed_height_small_still.url;
      var animate = result[i].images.fixed_height_small.url


      animalpic.attr("src", result[i].images.fixed_height_still.url);
      animalpic.attr("data-still", still); // still image
      animalpic.attr("data-animate", animate); // animated image
      animalpic.attr("data-state", "still"); // set the image state
      animalpic.addClass('pics');
      picDiv.prepend(animalpic);

      $('#animal-pics').prepend(picDiv);

      // var btn = $("<button>");
      // btn.addClass('pic-btn');
      // btn.attr("data-name", animalNames[i]);
      // btn.text(animalNames[i]);

      // $('#"pic-button">').append(btn);



    }

  });
}

function renderButtons() {
  $("#pic-button").empty();

  for (var i = 0; i < animalNames.length; i++) {
    var btn = $("<button>");
    btn.addClass('pic-btn');
    btn.attr("data-name", animalNames[i]);
    btn.text(animalNames[i]);

    $('#pic-button').append(btn);



  }
}


$('#add-animal-name').on('click', function (event) {
  event.preventDefault();

  var nameOfAnimal = $('#animal-input').val().trim();
  animalNames.push(nameOfAnimal);

  renderButtons();

});


$(document).on('click', '.pics', function () {
  var state = $(this).attr('data-state');

  if (state === 'still') {
    $(this).attr("src", $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
  }
  else {
    $(this).attr("src", $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }
});

$(document).on("click", ".pic-btn", showAnimlas);

renderButtons();
