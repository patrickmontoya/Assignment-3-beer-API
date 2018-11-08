(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var boxData = function boxData(image, name, description, abv, ibu, ph, tagline) {
  _classCallCheck(this, boxData);

  this.image = image;
  this.name = name;
  this.descrition = description;
  this.abv = abv;
  this.ibu = ibu;
  this.ph = ph;
  this.tagline = tagline;
};

;

var ingredients = function ingredients(malt, hops, yeast) {
  _classCallCheck(this, ingredients);

  this.malt = malt;
  this.hops = hops;
  this.yeast = yeast;
};

;

var url = "https://api.punkapi.com/v2/beers?page=1&per_page=6";

$.ajax({
  url: url,
  method: 'GET'
}).done(function (data) {
  var beer = [];
  data.forEach(function (element) {
    beer.push(new boxData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph));
    $('.grid-box').append('<div class="content-box"><img src="' + element.image_url + '" alt=""><h1>' + element.name + '</h1><p>' + element.description + '</p><div class="characteristics"><a href=""><h2>ABV</h2><h3>' + element.abv + '</h3></a><a href=""><h2>IBU</h2><h3>' + element.ibu + '</h3></a><a href=""><h2>pH</h2><h3>' + element.ph + '</h3></a></div>');
  });

  console.log(beer);
});

$.ajax({
  url: "https://api.punkapi.com/v2/beers/random",
  method: 'GET'
}).done(function (data) {
  var randomBeer = [];
  var spices = [];
  data.forEach(function (element) {
    randomBeer.push(new boxData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
    spices.push(new ingredients(element.ingredients.malt, element.ingredients.hops, element.ingredients.yeast));
    $('.quick').append('<div class="quick"><div class="quick-box"><div class="quick-beer"><img src="' + element.image_url + '" alt="bottle" class="bottle-size"></div><aside><div class="quickP"><h1>' + element.name + '</h1><h4>' + element.tagline + '</h4><p>' + element.description + '</p></div><div class="characteristics"><a href=""><h2>ABV</h2><h3>' + element.abv + '</h3></a><a href=""><h2>IBU</h2><h3>' + element.ibu + '</h3></a><a href=""><h2>pH</h2><h3>' + element.ph + '</h3></a></div><div class=quick-button><button class="methodbtn">METHOD</button><button class="ingredientsBtnclass">INGREDIENTS</button></div></aside></div></div></section>');
  });

  console.log(randomBeer);
  console.log(spices);
});

$('.random').on('click', function () {
  loadRandomBeer();
});

$('.click-find').on('click', function () {
  $('#quick-find').css('visibility', 'visible').css('display', 'grid');
  $('#beers').css('display', 'none');
  loadBeer();
});

$("body").on("click", ".click-beer", function () {
  $('#beers').css('display', 'grid');
  loadBeer();
});

function loadBeer() {
  $.ajax({
    url: url,
    method: 'GET'
  }).done(function (data) {
    var beer = [];
    $('.grid-box').empty();
    data.forEach(function (element) {
      beer.push(new boxData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph));
      $('.grid-box').append('<div class="content-box"><img src="' + element.image_url + '" alt=""><h1>' + element.name + '</h1><p>' + element.description + '</p><div class="characteristics"><a href=""><h2>ABV</h2><h3>' + element.abv + '</h3></a><a href=""><h2>IBU</h2><h3>' + element.ibu + '</h3></a><a href=""><h2>pH</h2><h3>' + element.ph + '</h3></a></div>');
    });
  });
}

function loadRandomBeer() {
  $('.quick').empty();
  $.ajax({
    url: "https://api.punkapi.com/v2/beers/random",
    method: 'GET'
  }).done(function (data) {
    var randomBeer = [];
    var spices = [];
    data.forEach(function (element) {
      randomBeer.push(new boxData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
      spices.push(new ingredients(element.ingredients.malt, element.ingredients.hops, element.ingredients.yeast));
      $('.quick').append('<div class="quick"><div class="quick-box"><div class="quick-beer"><img src="' + element.image_url + '" alt="bottle" class="bottle-size"></div><aside><div class="quickP"><h1>' + element.name + '</h1><h4>' + element.tagline + '</h4><p>' + element.description + '</p></div><div class="characteristics"><a href=""><h2>ABV</h2><h3>' + element.abv + '</h3></a><a href=""><h2>IBU</h2><h3>' + element.ibu + '</h3></a><a href=""><h2>pH</h2><h3>' + element.ph + '</h3></a></div><div class=quick-button><button class="methodbtn">METHOD</button><button class="ingredientsBtnclass">INGREDIENTS</button></div></aside></div></div></section>');
    });

    console.log(randomBeer);
    console.log(spices);
  });
}

$("body").on('click', '.ingredientsBtnclass', function () {
  $('.modal').css('display', 'flex');
});

$('.close').on('click', function () {
  $('.modal').css('display', 'none');
});

$('.click-beer').on('click', function () {
  $('#quick-find').css('display', 'none');
});

function modalIngredients() {
  // $('.quick').empty();
  $.ajax({
    url: "https://api.punkapi.com/v2/beers/random",
    method: 'GET'
  }).done(function (data) {
    var randomBeer = [];
    var spices = [];
    data.forEach(function (element) {
      randomBeer.push(new boxData(element.image_url, element.name, element.description, element.abv, element.ibu, element.ph, element.tagline));
      spices.push(new ingredients(element.ingredients.malt, element.ingredients.hops, element.ingredients.yeast));
      $('.modal-body').append('<ul><li>Malt:<p>' + element.ingredients.malt + '</p></li><li>Hops:<p>' + element.ingredients.hops + '</p></li><li>Yeast:<p>' + element.ingredients.yeast + '</p></li></ul>');
    });

    console.log(randomBeer);
    console.log(spices);
  });
}

},{}]},{},[1]);
