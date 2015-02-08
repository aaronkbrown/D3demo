
var main = d3.select("main");
var dataset = [];
var dScatter = [];

$.getJSON("data.json", function(d){
  // dataset[] for bar chart
  var nDataSize = d.dataPoints.length;
  for(i = 0; i < nDataSize; i++){
    dataset[i] = d.dataPoints[i];
  }
  // dScatter[] for scatter plot
  for(i = 0; i < d.dataScatter.length; i++){
    dScatter[i] = d.dataScatter[i];
  }
}).done(function(){

  // dimensions of SVG
  var nHeight = 300;
  var nWidth = 600;
  var barPadding = 2;

  //create svg canvas in section#barchart
  var svg = d3.select("#barchart").append("svg").attr("width", nWidth).attr("height", nHeight);

  //create rectangles as bars, one for each data point in the array
  var rects = svg.selectAll("rect").data(dataset).enter().append("rect").attr("x", function(d, i){
    //x-axis offset for each bar, scales between canvas width and total number of data points
    return i * (nWidth / dataset.length);
  }).attr("y", function(d){
    //y-axis 0 starts at top, so we subtract height of bar from height of canvas
    return nHeight - (4 * d);
  }).attr("width", ((nWidth / dataset.length) - barPadding)).attr("height", function(d){
    return d * 4;
  });

  //color!
  rects.attr("fill", function(d){
    return "rgb(0, 0, " + (d * 10) + ")";
  });

  // Append labels
  var texts = svg.selectAll("text").data(dataset).enter().append("text").text(function(d){
    return d;
  });

  //offset and style of text labels
  texts.attr("x", function(d, i){
    return (i * (nWidth / dataset.length) + ((nWidth / dataset.length) - barPadding) / 2);
  }).attr("y", function(d){
    return (nHeight - (d * 4) + 14);
  }).attr("font-family", "sans-serif").attr("font-size", "11px").attr("fill", "white").attr("text-anchor", "middle");



  //Scatter plot needs new SVG canvas to play on
  var svgScatter = d3.select("main").append("svg").attr("width", nWidth).attr("height", nHeight);

  //create a set of circles for data points
  var circles = svgScatter.selectAll("circle").data(dScatter).enter().append("circle");



  var padding = 50;

  //Set scaling of our dimensions so all data points fit on canvas
  //Note the yScale range reverses the order so that 0 starts at the bottom rather than the top
  var xScale = d3.scale.linear().domain([0, d3.max(dScatter, function(d){
    return d[0] + 50;
  })]).range([padding, nWidth - padding]);
  //... and the y-axis
  var yScale = d3.scale.linear().domain([0, d3.max(dScatter, function(d){
    return d[1] + 50;
  })]).range([nHeight - padding, padding]);

  //data points are given their X and Y coordinates on plot
  circles.attr("cx", function(d){
    return xScale(d[0]);
  }).attr("cy", function(d){
    return (yScale(d[1]));
  }).attr("r", 3);

  // Text nodes for data points
  var scatterText = svgScatter.selectAll("text").data(dScatter).enter().append("text");

  // fill out the text, style
  scatterText.text(function(d){
    return d[0] + ", " + d[1];
  }).attr("x", function(d){
    return xScale(d[0]);
  }).attr("y", function(d){
    return (yScale(d[1]));
  }).attr("font-family", "sans-serif").attr("font-size", "11px").attr("fill", "red");

  // x-axis with ticks
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  svgScatter.append("g").attr("class", "axis").attr("transform", "translate(0, " + (nHeight - padding) + ")").call(xAxis);

  // y-axis with ticks
  var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);
  svgScatter.append("g").attr("class", "axis").attr("transform", "translate(" + padding + ", 0)").call(yAxis);

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
