// get data from the server
$.getJSON(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json",
  function(x) {
    var margin = { top: 40, right: 20, bottom: 30, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 530 - margin.top - margin.bottom;

    var svg = d3
    .select("#graph")
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

    // label for x axis
    svg.append("text")    
     .attr("class", "labels")
      .attr("transform",
            "translate(400," + 490 + ")")
      .style("text-anchor", "middle")
      .text("Minutes Behind Fastest Time");
    
    
    // draw yaxis
    svg
      .append("g")
      .attr("class", "y axis")
      .call(yaxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em");

//     label for y axis
    
   svg.append("text")
    .attr("class", "labels")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Ranking");      
// tooltip
    
    var tooltip = d3.select("body").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

              // tooltip mouseover event handler
              var tipMouseover = function(data) {
                  //var color = colorScale(d.manufacturer);
                var color="black";
                  var html  = "<span><b>"+data.Name + "</b></span><br/>" +
                              "<span>" + data.Time+ "</span><br/>" +
                              "<span>" + data.Doping + "</span> ";

                  tooltip.html(html)
                      .style("left", (d3.event.pageX + 15) + "px")
                      .style("top", (d3.event.pageY - 28) + "px")
                    .transition()
                      .duration(200) // ms
                      .style("opacity", .9) // started as 0!

              };
              // tooltip mouseout event handler
              var tipMouseout = function(data) {
                  tooltip.transition()
                      .duration(300) // ms
                      .style("opacity", 0); // don't care about position!
              };
//  dont add on events after transition   
    
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
    })
    .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout);
    
    
    
    
    
    

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

    
    svg
.append("circle")
      .attr("class", "dot")
      .attr("r", 4)
    .attr('cx',100)
    .attr('cy')
    
    svg
    .append('text')
    
    .text('No Doping allegations')
   .attr('x',110)
    .attr('y',5)
    
     svg
.append("circle")
      .attr("class", "dot")
      .attr("r", 4)
    .attr('fill','red')
    .attr('cx',260)
    .attr('cy')
    
    svg
    .append('text')
    
    .text('Riders with Doping allegations')
   .attr('x',270)
    .attr('y',5)
  
  }

  
  



);