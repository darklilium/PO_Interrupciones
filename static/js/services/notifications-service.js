function notifications(message, type, myClass){
  switch (type) {
    case 'Login_Error':
      $('.notification-login')
      .empty()
      .css('visibility','visible')
      .append('<h4 style="padding-left: 3.5em;">'+message+'</h4>');
      break;

    case 'Login_Failed':
      switch (myClass) {
        case '.notification-login':
          $(myClass)
          .empty()
          .css('visibility','visible')
          .append('<h4 style="padding-left: 3.5em;">'+message+'</h4>')
          break;
          default:
        }
        break;

    case 'Login_Sucess':
      switch (myClass) {
        case '.notification-login':
            $(myClass)
            .empty()
            .css('visibility','visible')
            .append('<h4 style="padding-left: 3.5em;">'+message+'</h4>')
          break;
        default:
      }
      break;
      default:

  }
}

export {notifications};
