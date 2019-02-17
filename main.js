var app = new Vue({
  el: "#app",
  data: {
    message: "Snake1 Snake2 Snake3 Snake4 Snake5"
  },
  methods: {
    slowReplace: async function(word) {
      return new Promise(resolve => {
        setTimeout(() => {
          let result = word.replace("S", "🐍");
          resolve(result);
        }, 1000);
      });
    },
    reset: function() {
      this.message = "Snake1 Snake2 Snake3 Snake4 Snake5";
    },
    run: async function() {
      this.message = "(running)";
      let result = "";
      // Wait on each promise to be resolved in serial.
      result += await this.slowReplace("Snake1 ");
      result += await this.slowReplace("Snake2 ");
      result += await this.slowReplace("Snake3 ");
      result += await this.slowReplace("Snake4 ");
      result += await this.slowReplace("Snake5");
      this.message = result;
      console.log(result);
    },
    runParallel: async function() {
      this.message = "(running)";
      let result = "";
      // Put all the promises in an array.
      let promises = [];
      promises.push(this.slowReplace("Snake1 ")); //appebd into lst
      promises.push(this.slowReplace("Snake2 "));
      promises.push(this.slowReplace("Snake3 "));
      promises.push(this.slowReplace("Snake4 "));
      promises.push(this.slowReplace("Snake5"));
      // Wait until all promises in the array have been fulfilled.
      let allResults = await Promise.all(promises);
      // In for loops, 'in' gives you each array index and 'of' gives you each array item.
      for (let eachResponse of allResults) {
        result = result + eachResponse;
      }
      this.message = result;
    }
  }
});
