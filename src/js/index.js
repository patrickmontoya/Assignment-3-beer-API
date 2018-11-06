class boxData {
  constructor(image, name, description, abv, ibu, ph, tagline){
    this.image = image;
    this.name = name;
    this.descrition = description;
    this.abv = abv;
    this.ibu = ibu;
    this.ph = ph;
    this.tagline = tagline;
  }
};

class ingredients {
  constructor(malt, hops, yeast){
    this.malt = malt;
    this.hops = hops;
    this.yeast = yeast;
  }
};

var url = "https://api.punkapi.com/v2/beers?page=1&per_page=6";

$.ajax({
  url: url,
  method: 'GET',
}).done(function(data) {
    let beer = []
    data.forEach(element => {
      beer.push(new boxData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph));
      $(.grid-box).append('<div class="content-box"><img src="'+element.image_url+'" alt=""><h1>'+element.name+'</h1><p>'+element.description+'</p><div class="characteristics"><a href=""><h2>ABV</h2><h3>4.1</h3></a><a href=""><h2>IBU</h2><h3>41.5</h3></a><a href=""><h2>pH</h2><h3>4.4</h3></a></div>')
});

console.log(beer);
})

$.ajax({
  url: "https://api.punkapi.com/v2/beers/random",
  method: 'GET',
}).done(function(data) {
    let randomBeer = []
    let spices = []
    data.forEach(element => {
      randomBeer.push(new boxData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
      spices.push(new ingredients(element.ingredients.malt, element.ingredients.hops, element.ingredients.yeast));
});

console.log(randomBeer);
console.log(spices);
})