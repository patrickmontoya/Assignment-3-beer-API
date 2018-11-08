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
      $('.grid-box').append('<div class="content-box"><img src="'+element.image_url+'" alt=""><h1>'+element.name+'</h1><p>'+element.description+'</p><div class="characteristics"><a href=""><h2>ABV</h2><h3>'+element.abv+'</h3></a><a href=""><h2>IBU</h2><h3>'+element.ibu+'</h3></a><a href=""><h2>pH</h2><h3>'+element.ph+'</h3></a></div>');
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
      $('.quick').append('<div class="quick"><div class="quick-box"><div class="quick-beer"><img src="'+element.image_url+'" alt="bottle" class="bottle-size"></div><aside><div class="quickP"><h1>'+element.name+'</h1><h4>'+element.tagline+'</h4><p>'+element.description+'</p></div><div class="characteristics"><a href=""><h2>ABV</h2><h3>'+element.abv+'</h3></a><a href=""><h2>IBU</h2><h3>'+element.ibu+'</h3></a><a href=""><h2>pH</h2><h3>'+element.ph+'</h3></a></div><div class=quick-button><button class="methodbtn">METHOD</button><button class="ingredientsBtnclass">INGREDIENTS</button></div></aside></div></div></section>');
});

console.log(randomBeer);
console.log(spices);
})

$('.random').on('click', function() {
  loadRandomBeer();
});

$('.click-find').on('click', function() {
  $('#quick-find').css('visibility', 'visible').css('display', 'grid');
  $('#beers').css('display', 'none');
  $('footer').css('display', 'none');
  loadBeer();
});

$("body").on("click", ".click-beer", function(){
  $('#beers').css('display', 'grid');
  $('footer').css('display', 'grid');
  loadBeer();
});

function loadBeer(){
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(data) {
      let beer = []
      $('.grid-box').empty();
      data.forEach(element => {
        beer.push(new boxData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph));
        $('.grid-box').append('<div class="content-box"><img src="'+element.image_url+'" alt=""><h1>'+element.name+'</h1><p>'+element.description+'</p><div class="characteristics"><a href=""><h2>ABV</h2><h3>'+element.abv+'</h3></a><a href=""><h2>IBU</h2><h3>'+element.ibu+'</h3></a><a href=""><h2>pH</h2><h3>'+element.ph+'</h3></a></div>');
  });
})
}

function loadRandomBeer() {
  $('.quick').empty();
  $.ajax({
    url: "https://api.punkapi.com/v2/beers/random",
    method: 'GET',
  }).done(function(data) {
      let randomBeer = []
      let spices = []
      data.forEach(element => {
        randomBeer.push(new boxData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
        spices.push(new ingredients(element.ingredients.malt, element.ingredients.hops, element.ingredients.yeast));
        $('.quick').append('<div class="quick"><div class="quick-box"><div class="quick-beer"><img src="'+element.image_url+'" alt="bottle" class="bottle-size"></div><aside><div class="quickP"><h1>'+element.name+'</h1><h4>'+element.tagline+'</h4><p>'+element.description+'</p></div><div class="characteristics"><a href=""><h2>ABV</h2><h3>'+element.abv+'</h3></a><a href=""><h2>IBU</h2><h3>'+element.ibu+'</h3></a><a href=""><h2>pH</h2><h3>'+element.ph+'</h3></a></div><div class=quick-button><button class="methodbtn">METHOD</button><button class="ingredientsBtnclass">INGREDIENTS</button></div></aside></div></div></section>');
  });
  
  console.log(randomBeer);
  console.log(spices);
  })
}

$("body").on('click','.ingredientsBtnclass', function() {
  $('.modal').css('display', 'flex');
});

$('.close').on('click', function() {
  $('.modal').css('display', 'none');
});

$('.click-beer').on('click', function() {
  $('#quick-find').css('display', 'none');
});

function modalIngredients() {
  // $('.quick').empty();
  $.ajax({
    url: "https://api.punkapi.com/v2/beers/random",
    method: 'GET',
  }).done(function(data) {
      let randomBeer = []
      let spices = []
      data.forEach(element => {
        randomBeer.push(new boxData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
        spices.push(new ingredients(element.ingredients.malt, element.ingredients.hops, element.ingredients.yeast));
        $('.modal-body').append('<ul><li>Malt:<p>'+element.ingredients.malt+'</p></li><li>Hops:<p>'+element.ingredients.hops+'</p></li><li>Yeast:<p>'+element.ingredients.yeast+'</p></li></ul>');
});

console.log(randomBeer);
console.log(spices);
})
}

$('body').on('click', '.page-number', function(){
  $('.page-number').removeClass("active");
  $(this).addClass("active");
  $('main').empty();
  getBeer();
  })

$('body').on('click', '.next', function(){
  if($('.active').next().hasClass('page-number')){
      $('.active').removeClass('active').next().addClass('active');}
      $('main').empty();
      getBeer();
  })


$('body').on('click', '.previous', function(){
  if($('.active').prev().hasClass('page-number')){
      $('.active').removeClass('active').prev().addClass('active');}
      $('main').empty();
      getBeer();
  })

  function getBeer() {
    var url = "https://api.punkapi.com/v2/beers"
    url += '?' + $.param({
    'page': $('.active').text(),
    'per_page': 6
    });
  
  $.ajax({
         method: 'GET',
         url: url,
      }) .done(function(data) {
          let beer = []
          $('.grid-box').empty();
          data.forEach(element => {
              beer.push(new boxData(element.name, element.description,element.image_url, element.abv, element.ibu, element.ph))
  
              $('.grid-box').append('<div class="content-box"><img src="'+element.image_url+'" alt=""><h1>'+element.name+'</h1><p>'+element.description+'</p><div class="characteristics"><a href=""><h2>ABV</h2><h3>'+element.abv+'</h3></a><a href=""><h2>IBU</h2><h3>'+element.ibu+'</h3></a><a href=""><h2>pH</h2><h3>'+element.ph+'</h3></a></div>');
             });
             
          console.log(beer);
  
         })
  
     }

     $('.page-number').on('click', function() {
      $(this).toggleClass("active");
 });