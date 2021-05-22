var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//create an svg wrapper
var svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

//import data
d3.csv("data.csv", function(err, healthData) {
    if (err) throw err;
console.log(healthData)
    //parse
    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare
    });

    //scale functions
    var xLinearScale = d3.scaleLinear().range([0, width]);
    var yLinearScale = d3.scaleLinear().range([height, 0]);

    
})