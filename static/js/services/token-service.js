function token(){
  return {
    read(){
      return localStorage.getItem('token');
    },
    write(tokenValue){
      localStorage.setItem('token', tokenValue);
    }
  };
}

export default token();
