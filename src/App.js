import Directory from './components/directory/directory.component';




const App = () => {

  const categories = [
    {
    "id": 1,
    "title": "czapki",
    "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
  },
  {
    "id": 2,
    "title": "kurtki",
    "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
  },
  {
    "id": 3,
    "title": "cichobiegi",
    "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
  },
  {
    "id": 4,
    "title": "kobiece",
    "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
  },
  {
    "id": 5,
    "title": "meskie",
    "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
  }
  ];
  return(
    <Directory categories={categories}></Directory>
  )
}

export default App;
