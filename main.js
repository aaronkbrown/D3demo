
var main = d3.select("main");
var dataset = [];
var dScatter = [];

$.getJSON("data.json", function(d){
  var nDataSize = d.dataPoints.length;
  for(i = 0; i < nDataSize; i++){
    dataset[i] = d.dataPoints[i];
  }
  for(i = 0; i < d.dataScatter.length; i++){
    dScatter[i] = d.dataScatter[i];
  }
}).done(function(){

  // dimensions of SVG
  var nHeight = 300;
  var nWidth = 600;
  var barPadding = 2;

  var svg = d3.select("#barchart").append("svg").attr("width", nWidth).attr("height", nHeight);

  var rects = svg.selectAll("rect").data(dataset).enter().append("rect").attr("x", function(d, i){
    return i * (nWidth / dataset.length);
  }).attr("y", function(d){
    return nHeight - (4 * d);
  }).attr("width", ((nWidth / dataset.length) - barPadding)).attr("height", function(d){
    return d * 4;
  });

  rects.attr("fill", function(d){
    return "rgb(0, 0, " + (d * 10) + ")";
  });

  var texts = svg.selectAll("text").data(dataset).enter().append("text").text(function(d){
    return d;
  });

  texts.attr("x", function(d, i){
    return (i * (nWidth / dataset.length) + ((nWidth / dataset.length) - barPadding) / 2);
  }).attr("y", function(d){
    return (nHeight - (d * 4) + 14);
  }).attr("font-family", "sans-serif").attr("font-size", "11px").attr("fill", "white").attr("text-anchor", "middle");




  var svgScatter = d3.select("main").append("svg").attr("width", nWidth).attr("height", nHeight);

  var circles = svgScatter.selectAll("circle").data(dScatter).enter().append("circle");

  circles.attr("cx", function(d){
    return d[0];
  }).attr("cy", function(d){
    return (nHeight - d[1]);
  }).attr("r", 5);

  var scatterText = svgScatter.selectAll("text").data(dScatter).enter().append("text");

  scatterText.text(function(d){
    return d[0] + ", " + d[1];
  }).attr("x", function(d){
    return d[0];
  }).attr("y", function(d){
    return (nHeight - d[1]);
  }).attr("font-family", "sans-serif").attr("font-size", "11px").attr("fill", "red");

  /**
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
  */


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
