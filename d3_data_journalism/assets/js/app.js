var svgWidth = 900;
var svgHeight = 600;

var margin = {
    top: 20,
    right: 10,
    bottom: 60,
    left: 80
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//create an svg wrapper
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//import data
d3.csv("assets/data/data.csv").then(function(healthData) {
    //parse
    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare
console.log(healthData)
    });

    //scale functions
    var xLinearScale = d3.scaleLinear().range([0, width]);
    var yLinearScale = d3.scaleLinear().range([height, 0]);

    //axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale)
    var xMin;
    var xMax;
    var yMin;
    var yMax;
    xMin = d3.min(healthData, function(data) {
        return data.healthcare;    
    });
    
    xMax = d3.max(healthData, function(data) {
        return data.healthcare;
    });

    yMin = d3.min(healthData, function(data) {
        return data.poverty;
    });

    yMax = d3.max(healthData, function(data) {
        return data.poverty;
    });

    xLinearScale.domain([xMin, xMax]);
    yLinearScale.domain([yMin, yMax]);
    console.log(xMin);
    console.log(yMin);

    //append axes
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    chartGroup.append("g")
        .call(leftAxis);
    
    //create circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", "12")
    .attr("fill", "green")
    .attr("opacity", .5)
    
    // axis lables
    chartGroup.append("text")
    .style("font-size", "12px")
    .selectAll("tspan")
    .data(healthData)
    .enter()
    .append("tenspan")
        .attr("x", function(data) {
            return xLinearScale(data.healthcare);
        })
        .attr("y", function(data) {
            return yLinearScale(data.poverty);
        })
        .text(function(data) {
            return data.abbr
        });
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare(%)");
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
    chartGroup.append("g")
    .selectAll("text")
    .data(healthData)
    .enter()
    .append("text")
        .text(d=>d.abbr)
        .attr("x",d=>xLinearScale(d.poverty))
        .attr("y",d=>yLinearScale(d.healthcare))
        .classed(".stateText", true)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("alignment-baseline", "central");
});