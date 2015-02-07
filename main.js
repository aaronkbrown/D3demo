
var main = d3.select("main");
var dataset = [5, 10, 15, 20, 25];
var graphDiv = main.append("div");

main.selectAll("p").data(dataset).enter().append("p").text(function(someData){
  return someData;
}).style("color", function(d){
  if(d > 15){
    return "#ff0000";
  } else {
    return "#000000";
  }
});
