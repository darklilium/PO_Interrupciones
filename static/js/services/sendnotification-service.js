function sendNotification(level='warning', message){
  $('.searchNotification').css('visibility','initial');

  $('#myNotification')
    .empty()
    //.append('<div><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>'+message+'</strong></div>')
    .append('<div><strong>'+message+'</strong></div>')
    .attr('class', "alert alert-"+level);
}
