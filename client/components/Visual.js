import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';

export default class Visual extends React.Component{

  createChart(){

    /*
      define dimensions
    */
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
    var y = d3.scale.linear().range([height, 0]);
    
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(Math.max(width/50, 2));

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(Math.max(height/50, 2));

    /*
      create chart
    */
    var chart = d3.select(ReactFauxDOM.createElement('svg'))
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .attr('class', 'chart');

    x.domain(this.props.data.map(function(d) { return d.year; }));
    y.domain([0, d3.max(this.props.data, function(d) { return d.count; })]);

    /*
      xAxis
    */
    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

    /*
      yAxis
    */
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("# of mentions");

    /*
      bars
    */
    chart.selectAll("bar")
        .data(this.props.data)
      .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function(d) { return x(d.year); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count); });

    return chart;
  }

  render() {
    var chart = this.createChart()
    return chart.node().toReact();
  }
}

