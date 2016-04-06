import React from 'react';
import Griddle from 'griddle-react';
import getInterruptionsByExtent from '../services/getInterruptionsByExtent';
import mymap from '../services/map-service';

var fakeData =  [
  {
    "id": 0,
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  },
  {
    "id": 1,
    "name": "Koch Becker",
    "city": "Johnsonburg",
    "state": "New Jersey",
    "country": "Madagascar",
    "company": "Eventage",
    "favoriteNumber": 2
  },
  {
    "id": 2,
    "name": "Lowery Hopkins",
    "city": "Blanco",
    "state": "Arizona",
    "country": "Ukraine",
    "company": "Comtext",
    "favoriteNumber": 3
  },
  {
    "id": 3,
    "name": "Walters Mays",
    "city": "Glendale",
    "state": "Illinois",
    "country": "New Zealand",
    "company": "Corporana",
    "favoriteNumber": 6
  },
  {
    "id": 4,
    "name": "Shaw Lowe",
    "city": "Coultervillle",
    "state": "Wyoming",
    "country": "Ecuador",
    "company": "Isologica",
    "favoriteNumber": 2
  },
  {
    "id": 5,
    "name": "Ola Fernandez",
    "city": "Deltaville",
    "state": "Delaware",
    "country": "Virgin Islands (US)",
    "company": "Pawnagra",
    "favoriteNumber": 7
  },
  {
    "id": 6,
    "name": "Park Carr",
    "city": "Welda",
    "state": "Kentucky",
    "country": "Sri Lanka",
    "company": "Cosmetex",
    "favoriteNumber": 7
  },
  {
    "id": 7,
    "name": "Laverne Johnson",
    "city": "Rosburg",
    "state": "New Mexico",
    "country": "Croatia",
    "company": "Housedown",
    "favoriteNumber": 9
  },
  {
    "id": 8,
    "name": "Lizzie Nelson",
    "city": "Chumuckla",
    "state": "Montana",
    "country": "Turks &amp; Caicos",
    "company": "Everest",
    "favoriteNumber": 2
  },
  {
    "id": 9,
    "name": "Clarke Clemons",
    "city": "Inkerman",
    "state": "Rhode Island",
    "country": "Cambodia",
    "company": "Apexia",
    "favoriteNumber": 3
  },
  {
    "id": 10,
    "name": "Cindy Phelps",
    "city": "Hachita",
    "state": "North Carolina",
    "country": "Namibia",
    "company": "Pholio",
    "favoriteNumber": 6
  },
  {
    "id": 11,
    "name": "Danielle Keller",
    "city": "Stockdale",
    "state": "Maryland",
    "country": "Cape Verde",
    "company": "Netility",
    "favoriteNumber": 10
  },
  {
    "id": 12,
    "name": "Duke Hutchinson",
    "city": "Needmore",
    "state": "Indiana",
    "country": "Brunei",
    "company": "Electonic",
    "favoriteNumber": 1
  },
  {
    "id": 13,
    "name": "Aimee Duffy",
    "city": "Brownlee",
    "state": "Vermont",
    "country": "Lebanon",
    "company": "Repetwire",
    "favoriteNumber": 2
  },
  {
    "id": 14,
    "name": "Meadows Jimenez",
    "city": "Winesburg",
    "state": "Kansas",
    "country": "Timor L'Este",
    "company": "Quonk",
    "favoriteNumber": 0
  },
  {
    "id": 15,
    "name": "Karla Potts",
    "city": "Juarez",
    "state": "Alaska",
    "country": "Samoa",
    "company": "Zentime",
    "favoriteNumber": 3
  },
  {
    "id": 16,
    "name": "Rita Jensen",
    "city": "Elwood",
    "state": "North Dakota",
    "country": "Greece",
    "company": "Valpreal",
    "favoriteNumber": 9
  },
  {
    "id": 17,
    "name": "Jackie Burke",
    "city": "Delwood",
    "state": "Arkansas",
    "country": "Greenland",
    "company": "Magmina",
    "favoriteNumber": 4
  },
  {
    "id": 18,
    "name": "Corinne Moreno",
    "city": "Wollochet",
    "state": "New Hampshire",
    "country": "Sierra Leone",
    "company": "Marketoid",
    "favoriteNumber": 1
  },
  {
    "id": 19,
    "name": "Giles Cohen",
    "city": "Carbonville",
    "state": "Massachusetts",
    "country": "Tonga",
    "company": "Ginkogene",
    "favoriteNumber": 10
  },
  {
    "id": 20,
    "name": "Maynard Barnes",
    "city": "Boling",
    "state": "Utah",
    "country": "Nepal",
    "company": "Kyaguru",
    "favoriteNumber": 8
  },
  {
    "id": 21,
    "name": "Singleton Lindsay",
    "city": "Weogufka",
    "state": "Tennessee",
    "country": "Falkland Islands",
    "company": "Egypto",
    "favoriteNumber": 5
  },
  {
    "id": 22,
    "name": "Etta Kemp",
    "city": "Como",
    "state": "Pennsylvania",
    "country": "Syria",
    "company": "Marqet",
    "favoriteNumber": 3
  },
  {
    "id": 23,
    "name": "Whitney Pennington",
    "city": "Farmington",
    "state": "Louisiana",
    "country": "Suriname",
    "company": "Prosure",
    "favoriteNumber": 10
  },
  {
    "id": 24,
    "name": "Sophie Ellison",
    "city": "Whitewater",
    "state": "Idaho",
    "country": "Malta",
    "company": "Evidends",
    "favoriteNumber": 1
  },
  {
    "id": 25,
    "name": "Logan Forbes",
    "city": "Idledale",
    "state": "Michigan",
    "country": "Dominican Republic",
    "company": "Pigzart",
    "favoriteNumber": 3
  },
  {
    "id": 26,
    "name": "Haley Mcclure",
    "city": "Eggertsville",
    "state": "Colorado",
    "country": "Honduras",
    "company": "Ginkle",
    "favoriteNumber": 8
  },
  {
    "id": 27,
    "name": "Williamson Hurley",
    "city": "Edgar",
    "state": "Texas",
    "country": "Yemen",
    "company": "Tetratrex",
    "favoriteNumber": 3
  },
  {
    "id": 28,
    "name": "Heidi Hurst",
    "city": "Curtice",
    "state": "Nebraska",
    "country": "Aruba",
    "company": "Vendblend",
    "favoriteNumber": 10
  },
  {
    "id": 29,
    "name": "Barker Long",
    "city": "Orovada",
    "state": "West Virginia",
    "country": "Egypt",
    "company": "Uniworld",
    "favoriteNumber": 8
  },
  {
    "id": 30,
    "name": "Richard Patrick",
    "city": "Gordon",
    "state": "Oregon",
    "country": "Malawi",
    "company": "Quarx",
    "favoriteNumber": 8
  },
  {
    "id": 31,
    "name": "Cameron Graham",
    "city": "Noblestown",
    "state": "Oklahoma",
    "country": "Slovenia",
    "company": "Zilidium",
    "favoriteNumber": 5
  },
  {
    "id": 32,
    "name": "Lucy Quinn",
    "city": "Greenock",
    "state": "Ohio",
    "country": "Australia",
    "company": "Geoform",
    "favoriteNumber": 10
  },
  {
    "id": 33,
    "name": "Dickson Greene",
    "city": "Jeff",
    "state": "Virginia",
    "country": "Iraq",
    "company": "Niquent",
    "favoriteNumber": 6
  },
  {
    "id": 34,
    "name": "Jasmine Brock",
    "city": "Tolu",
    "state": "Mississippi",
    "country": "Hungary",
    "company": "Cytrek",
    "favoriteNumber": 8
  },
  {
    "id": 35,
    "name": "Byers Donaldson",
    "city": "Jugtown",
    "state": "South Dakota",
    "country": "Mongolia",
    "company": "Slambda",
    "favoriteNumber": 4
  },
  {
    "id": 36,
    "name": "Burns Blake",
    "city": "Shawmut",
    "state": "Iowa",
    "country": "Ethiopia",
    "company": "Comstar",
    "favoriteNumber": 9
  },
  {
    "id": 37,
    "name": "Norman Wynn",
    "city": "Hasty",
    "state": "Washington",
    "country": "Bangladesh",
    "company": "Netplode",
    "favoriteNumber": 7
  },
  {
    "id": 38,
    "name": "Anthony Weeks",
    "city": "Chautauqua",
    "state": "Florida",
    "country": "Sudan",
    "company": "Rubadub",
    "favoriteNumber": 9
  },
  {
    "id": 39,
    "name": "Courtney Marshall",
    "city": "Grazierville",
    "state": "California",
    "country": "Zambia",
    "company": "Medicroix",
    "favoriteNumber": 0
  },
  {
    "id": 40,
    "name": "Wilda Foster",
    "city": "Ebro",
    "state": "New York",
    "country": "Cameroon",
    "company": "Xixan",
    "favoriteNumber": 0
  },
  {
    "id": 41,
    "name": "Buckner Hyde",
    "city": "Century",
    "state": "Minnesota",
    "country": "Mexico",
    "company": "Plasmos",
    "favoriteNumber": 6
  },
  {
    "id": 42,
    "name": "Montgomery Woodard",
    "city": "Nadine",
    "state": "Georgia",
    "country": "Zimbabwe",
    "company": "Neptide",
    "favoriteNumber": 1
  },
  {
    "id": 43,
    "name": "Shirley Boyle",
    "city": "Groveville",
    "state": "Connecticut",
    "country": "Tunisia",
    "company": "Interodeo",
    "favoriteNumber": 1
  },
  {
    "id": 44,
    "name": "Mavis Welch",
    "city": "Springhill",
    "state": "South Carolina",
    "country": "Italy",
    "company": "Asimiline",
    "favoriteNumber": 9
  },
  {
    "id": 45,
    "name": "Barr Flowers",
    "city": "Bowden",
    "state": "Missouri",
    "country": "South Korea",
    "company": "Terragen",
    "favoriteNumber": 7
  },
  {
    "id": 46,
    "name": "Cabrera Koch",
    "city": "Wanship",
    "state": "Maine",
    "country": "Mauritius",
    "company": "Norsul",
    "favoriteNumber": 9
  },
  {
    "id": 47,
    "name": "Williams Gamble",
    "city": "Homestead",
    "state": "Wisconsin",
    "country": "Romania",
    "company": "Gynk",
    "favoriteNumber": 4
  },
  {
    "id": 48,
    "name": "Angelica Washington",
    "city": "Roulette",
    "state": "Alabama",
    "country": "South Africa",
    "company": "Exoswitch",
    "favoriteNumber": 3
  },
  {
    "id": 49,
    "name": "Morse Navarro",
    "city": "Balm",
    "state": "Hawaii",
    "country": "Malaysia",
    "company": "Comtours",
    "favoriteNumber": 7
  },
  {
    "id": 50,
    "name": "Harding Chambers",
    "city": "Lupton",
    "state": "New Jersey",
    "country": "Oman",
    "company": "Gadtron",
    "favoriteNumber": 6
  },
  {
    "id": 51,
    "name": "Frederick Mcdowell",
    "city": "Kimmell",
    "state": "Arizona",
    "country": "Ireland",
    "company": "Delphide",
    "favoriteNumber": 2
  },
  {
    "id": 52,
    "name": "Valentine Turner",
    "city": "Hobucken",
    "state": "Illinois",
    "country": "France",
    "company": "Sloganaut",
    "favoriteNumber": 0
  },
  {
    "id": 53,
    "name": "Ruby Cooper",
    "city": "Connerton",
    "state": "Wyoming",
    "country": "Iceland",
    "company": "Exospace",
    "favoriteNumber": 5
  },
  {
    "id": 54,
    "name": "Natalia Nielsen",
    "city": "Holtville",
    "state": "Delaware",
    "country": "Equatorial Guinea",
    "company": "Isoswitch",
    "favoriteNumber": 6
  },
  {
    "id": 55,
    "name": "Bobbie Silva",
    "city": "Fivepointville",
    "state": "Kentucky",
    "country": "Luxembourg",
    "company": "Futuris",
    "favoriteNumber": 0
  },
  {
    "id": 56,
    "name": "Clarice Hays",
    "city": "Floriston",
    "state": "New Mexico",
    "country": "Cruise Ship",
    "company": "Skyplex",
    "favoriteNumber": 5
  },
  {
    "id": 57,
    "name": "Leblanc Bartlett",
    "city": "Catherine",
    "state": "Montana",
    "country": "Belarus",
    "company": "Ezentia",
    "favoriteNumber": 10
  },
  {
    "id": 58,
    "name": "Jodie Martinez",
    "city": "Edneyville",
    "state": "Rhode Island",
    "country": "Antigua &amp; Barbuda",
    "company": "Satiance",
    "favoriteNumber": 7
  },
  {
    "id": 59,
    "name": "Pennington Townsend",
    "city": "Ahwahnee",
    "state": "North Carolina",
    "country": "Chad",
    "company": "Orbiflex",
    "favoriteNumber": 8
  },
  {
    "id": 60,
    "name": "Garrison Buchanan",
    "city": "Coinjock",
    "state": "Maryland",
    "country": "Reunion",
    "company": "Zanity",
    "favoriteNumber": 3
  },
  {
    "id": 61,
    "name": "Cardenas Reeves",
    "city": "Greensburg",
    "state": "Indiana",
    "country": "Gabon",
    "company": "Cogentry",
    "favoriteNumber": 1
  },
  {
    "id": 62,
    "name": "Angeline Jacobson",
    "city": "Freeburn",
    "state": "Vermont",
    "country": "Fiji",
    "company": "Pearlessa",
    "favoriteNumber": 4
  },
  {
    "id": 63,
    "name": "Turner Franks",
    "city": "Fairforest",
    "state": "Kansas",
    "country": "New Caledonia",
    "company": "Maximind",
    "favoriteNumber": 1
  },
  {
    "id": 64,
    "name": "Murphy Santos",
    "city": "Waiohinu",
    "state": "Alaska",
    "country": "Haiti",
    "company": "Isodrive",
    "favoriteNumber": 0
  },
  {
    "id": 65,
    "name": "Walls Cherry",
    "city": "Avalon",
    "state": "North Dakota",
    "country": "Mozambique",
    "company": "Bolax",
    "favoriteNumber": 10
  }
];
class GriddleGrid extends React.Component{
  constructor(props){
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
    //var map = mymap.getMap();
    //getInterruptionsByExtent(map.extent)
  }
  componentDidMount(){

  }
  onRowClick(gridRow, event){
    console.log(gridRow.props.data);
  }
  render(){
    return (
      <Griddle results={fakeData}
               resultsPerPage={5}
               tableClassName="table"
               showFilter={true}
               showSettings={true}
               onRowClick={this.onRowClick}
               columns={["name", "city", "state", "country"]}/>

      );
  }
}
export default GriddleGrid;
