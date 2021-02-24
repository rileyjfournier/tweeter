
const inputCounter = function() {
  let length = this.value.length;
  if (length > 140) {
    $('#tweet-text-counter').css('color', 'red')
  }
  $('#tweet-text-counter').html(140 - length)
}

const createHoverShadow = function() {
  $('.individual-tweet').css('box-shadow', '5px 10px #888888')
  $('.hover-shadow').css('text-shadow', '0.5px 0.5px #888888')
  $('#avatar-image').css('filter', 'drop-shadow(1px 1px #888888)')
  $('.fade-text').html('@rileyjfournier')
}

const removeHoverShadow = function() {
  $('.individual-tweet').css('box-shadow', '')
  $('.hover-shadow').css('text-shadow', '')
  $('#avatar-image').css('filter', 'drop-shadow(0px 0px #888888)')
  $('.fade-text').html('')
}

$(document).ready(function() {

  $('#tweet-input').on('keyup', inputCounter)

  $('.individual-tweet').on('mouseover', createHoverShadow)

  $('.individual-tweet').on('mouseout', removeHoverShadow)

})
