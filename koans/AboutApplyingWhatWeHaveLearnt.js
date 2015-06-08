var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _.filter(products, function(p) {
        if (!p.containsNuts && !_.some(p.ingredients, function(i) {return (i === "mushrooms")})) 
          return p;
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = 0;    /* try chaining range() and reduce() */
    
    sum = _.range(1,1000).reduce(function(sum, number){
      if (number % 3 == 0 || number % 5 == 0) {return sum + number;}
      return sum;
    }, 0);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 },
        name;

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            name = products[i].ingredients[j];
            ingredientCount[name] = (ingredientCount[name] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    ingredientCount = _(products).chain()
                                    .map(function(product) {return product.ingredients})
                                    .flatten()
                                    .reduce(function(acc, item){
                                      acc[item] = (acc[item] || 0) + 1;
                                      return acc;
                                    }, {}).value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {

    var primes = [];

    function genSievePrime(max) {
      var n = _.range(2, max+1), t = [], pos = 0;
      do {
        t = _.filter(n, function(x){
          if (x<=n[pos]) {return x;}
          if (x>n[pos] && x%n[pos]!=0) { return x;}
        });
        pos++;
        if (n.length == t.length) {
          n = t;
          break;
        }
        n = t;
      } while(pos <= n.length);
      return n;
    }

    function isPrime(n) {

    }

    function largePrimeFactor(n) {
      var factors = [],
          i       = 0;

      primes = genSievePrime(n);
      if (primes.indexOf(n) > -1) {return false;}
      while (n > 0) {
        if (n % primes[i] == 0) {
          n = n / primes[i];
          factors.push(primes[i]);
          i = 0;
        } else {
          i++;
          if (i > primes.length-1) {break;}
        }
      }
      return Math.max.apply(null, factors);
    }

    expect(largePrimeFactor(273684)).toBe(22807);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    function isPalindrome(n) {
      var reverse = n.toString().split('').reverse().join('');
      n = n.toString();
      return (n === reverse);
    }
    function checkLargePalindrome() {
      var pal = [];
      for (var i=999; i>316; i--) {   //looping until 316 because 316 * 316 < 6 digits
        for (var j=999; j>316; j--) {
          var prod = i * j;
          if (prod % 11 == 0 && isPalindrome(prod)) { //palindrome with even number of digits is divisible by 11
            pal.push(prod);
          }
        }
      }
      return Math.max.apply(null, pal);
    }

    expect(checkLargePalindrome()).toBe(906609);

  });

/*
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

    var numbers = _.range(1,21);
    var smallnum = _(numbers).reduce(function(sum, n){
      if (_(numbers).all(function(num){return (num % sum == 0);})){
        return sum * n;
      }
      return sum;
    });
    console.log(numbers);
    console.log(smallnum);

    expect(smallnum).toBe();
  });
*/
  it("should find the difference between the sum of the squares and the square of the sums", function () {

    function getDigits(number) {
      var result = [];
      while(number) {
        result.push(number%10);
        number = Math.floor(number / 10);
      }
      return result;
    }
    function sumOfSquares(digits) {
      return _(digits).chain()
                      .map(function(digit){return digit*digit;})
                      .reduce(function(a,b){return a+b;})
                      .value();
    }
    function squareOfSum(digits) {
      return Math.pow(_(digits).reduce(function(a,b){return a+b;}),2);
    }
    function diff(number) {
      var digits = getDigits(number);
      return sumOfSquares(digits) - squareOfSum(digits);
    }
    
    expect(diff(55)).toBe(-50);
    expect(diff(5)).toBe(0);

  });

  it("should find the 10001st prime", function () {

    function genSievePrime(max) {
      var n = _.range(2, max+1), t = [], pos = 0;
      do {
        t = _.filter(n, function(x){
          if (x<=n[pos]) {return x;}
          if (x>n[pos] && x%n[pos]!=0) { return x;}
        });
        pos++;
        if (n.length == t.length) {
          n = t;
          break;
        }
        n = t;
      } while(pos <= n.length);
      return n;
    }

    function nthPrime(n) {
      var max = Math.pow(Math.floor(Math.sqrt(n)), 3);
      var primes = genSievePrime(max);
      return primes[n];
    }

    expect(nthPrime(10001)).toBe(104759);
  });
  
});
