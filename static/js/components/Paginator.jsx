import React from 'react';

class Paginator extends React.Component {
  moveNextPage(i){
    var that = this;
    return function(){
      that.props.clickHandler(i);
    };
  }

  render(){
    var pages = [];
    var styles = {
      padding: "0.5em",
      border: "1px solid ghoswhite",
      cursor: "pointer"
    };

    for(let i = 0; i < this.props.pages; i++){
      pages.push(<span key={i} style={styles} onClick={this.moveNextPage(i)}>{i + 1}</span>);
    }

    return <div>{pages}</div>;
  }
}

export default Paginator;
