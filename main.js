
var main = d3.select("main");
//var dataset = [5, 10, 15, 20, 25];
var graphDiv = main.append("div");
var dataset = [];

$.getJSON("data.json", function(d){
  var nDataSize = d.dataPoints.length;
  for(i = 0; i < nDataSize; i++){
    dataset[i] = d.dataPoints[i];
  }
}).done(function(){

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

  var nHeight = 400;
  var nWidth = 800;
  var svg = d3.select("main").append("svg");
  svg.attr("width", nWidth).attr("height", nHeight);

  var circles = svg.selectAll("circle").data(dataset).enter().append("circle");

  circles.attr("cx", function(d, i){
    return (i * 50) + 25;
  })
  .attr("cy", nHeight / 2)
  .attr("r", function(d){
    return d;
  })
  .attr("fill", function(d){
    if(d > 15){
      return "#ff40c0";
    } else {
      return "#a01080";
    }
  })
  .attr("stroke", "#800000")
  .attr("stroke-width", function(d){
    return d/2;
  });

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
