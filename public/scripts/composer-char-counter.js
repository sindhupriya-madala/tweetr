$(document).ready( function() {
  $(".new-tweet textarea").keyup(function() {
    var value = $(this).val();
    var count = value.length;
    var counter = $(this).closest('.new-tweet').find('.counter');
    counter.text(140-count);
    counter.css('color', (count > 140) ? "red" : "black");
  });
});