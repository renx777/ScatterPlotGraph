// get data from the server
$.getJSON(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json",
  function(x) {
    var margin = { top: 40, right: 20, bottom: 30, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = x;
    var rankings = [];
    var values = [];

    //populate rankings and values variable with data
    for (var i in data) {
      rankings.push(data[i]["Place"]);
      values.push(data[i]["Seconds"] - 2210);
    }

    //function to format label on x-axis
    var formatMinutes = function(d) {
      var hours = Math.floor(d / 3600),
          minutes = Math.floor((d - hours * 3600) / 60),
          seconds = d - minutes * 60;
      var output = seconds + "s";
      if (minutes) {
        output = minutes + "m " + output;
      }
      if (hours) {
        output = hours + "h " + output;
      }
      return output;
    };

    var x = d3
    .scaleLinear()
    .domain([d3.max(values), 0])
    .range([0, width -100]);

    var xAxis = d3
    .axisBottom()
    .scale(x)
    .ticks(6)
    .tickFormat(formatMinutes);

    //define yscale
    var y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([d3.max(rankings), 0]);

    var yaxis = d3.axisLeft().scale(y);

    //define chart div
    var chart = d3
    .select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr(
      "transform",
      "translate(" + margin.left + 500 + "," + margin.top + 100 + ")"
    );

    //     draw x axis
    svg
      .append("g")
      .call(xAxis)
      .attr("transform", "translate(0," + height + ")");

    // draw yaxis
    svg
      .append("g")
      .attr("class", "y axis")
      .call(yaxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em");

    // draw dots on the graph
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", 4)
      .attr("fill", function(d) {
      if (d.Doping.length == 0) {
        return "black";
      } else {
        return "red";
      }
    })
      .attr("cx", function(d) {
      return x(d.Seconds - 2210);
    })
      .attr("cy", function(d) {
      return y(d.Place);
    });

    //add text labels to the dots
    svg
      .selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .style("text-anchor", "left")
      .attr("x", function(d) {
      
      return x(d.Seconds - 2210);
    })
      .attr("y", function(d) {
      return y(d.Place);
    })
      .text(function(d) {
      return d.Name;
    })
       .attr("font-size","12px")
      .attr("transform", "translate(17,+4)");
  }
);