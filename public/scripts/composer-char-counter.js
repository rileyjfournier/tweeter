// FUNCTION THAT COUNTS USER INPUT AND CHANGES COLOR IF TEXT EXCEEDS 140
const inputCounter = function() {
  let length = this.value.length;
  if (length > 140) {
    $('#tweet-text-counter').css('color', 'red');
  }
  if (length <= 140) {
    $('#tweet-text-counter').css('color', 'rgb(43, 43, 43)');
  }
  $('#tweet-text-counter').html(140 - length);
};

// FUNCTION CALLED ON TEXT KEYUP
$(document).ready(function() {

  $('#tweet-input').on('keyup', inputCounter);

});
