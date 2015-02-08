
var main = d3.select("main");
var dataset = [5, 10, 15, 20, 25];
var graphDiv = main.append("div");

d3.select("#barchart")
  .selectAll("div")
  .data(dataset)
  .enter()
  .append("div")
  .attr("class", "bar")
  .style("height", function(d){
    var barHeight = d * 5;
    return barHeight + "px";
  })
  .style("background-color", function(d){
    if(d > 15){
      return "#ff0000";
    }
  });

/**
main.selectAll("p").data(dataset).enter().append("p").text(function(someData){
  return someData;
}).style("color", function(d){
  if(d > 15){
    return "#ff0000";
  } else {
    return "#000000";
  }
});
*/
