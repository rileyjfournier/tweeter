
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


$(document).ready(function() {

  $('#tweet-input').on('keyup', inputCounter);

});
