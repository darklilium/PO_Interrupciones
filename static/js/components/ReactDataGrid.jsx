
import ReactDataGrid from 'react-data-grid';
var Toolbar = ReactDataGrid.Toolbar;

//helper to generate a random date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

//helper to create a fixed number of rows
function createRows(numberOfRows){
  var _rows = [];
  for (var i = 1; i < numberOfRows; i++) {
    _rows.push({
      id: i,
      task: 'Task ' + i,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority : ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType : ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      startDate: randomDate(new Date(2015, 3, 1), new Date()),
      completeDate: randomDate(new Date(), new Date(2016, 0, 1))
    });
  }
  return _rows;
}

//function to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};

//Columns definition
var columns = [
{
  key: 'id',
  name: 'ID',
  width: 80,
  filterable: true
},
{
  key: 'task',
  name: 'Title',
  filterable: true
},
{
  key: 'priority',
  name: 'Priority',
  filterable: true
},
{
  key: 'issueType',
  name: 'Issue Type',
  filterable: true
},
{
  key: 'complete',
  name: '% Complete',
  filterable: true
},
{
  key: 'startDate',
  name: 'Start Date',
  filterable: true
},
{
  key: 'completeDate',
  name: 'Expected Complete',
  filterable: true
}
]


var Example = React.createClass({

  getInitialState : function(){
    var originalRows = createRows(1000);
    var rows = originalRows.slice(0);
    //store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting
    return {originalRows : originalRows, rows : rows, filters : {}};
  },

  rowGetter : function(rowIdx){
    return this.state.rows[rowIdx];
  },

  filterRows : function(originalRows, filters) {
    var rows = originalRows.filter(function(r){
      var include = true;
      for (var columnKey in filters) {
        if(filters.hasOwnProperty(columnKey)) {
          var rowValue = r[columnKey].toString().toLowerCase();
          if(rowValue.indexOf(filters[columnKey].toLowerCase()) === -1) {
            include = false;
          }
        }
      }
      return include;
    });
    return rows;
  },

  handleFilterChange : function(filter){
    this.setState(function(currentState) {
      if (filter.filterTerm) {
        currentState.filters[filter.columnKey] = filter.filterTerm;
      } else {
        delete currentState.filters[filter.columnKey];
      }
      currentState.rows = this.filterRows(currentState.originalRows, currentState.filters);
      return currentState;
    });
  },

  render:function(){
    return(
      <ReactDataGrid
        columns={columns}
        rowGetter={this.rowGetter}
        enableCellSelect={true}
        rowsCount={this.state.rows.length}
        minHeight={500}
        toolbar={<Toolbar enableFilter={true}/>}
        onAddFilter={this.handleFilterChange}/>
    )
  }

});

module.exports = Example;
