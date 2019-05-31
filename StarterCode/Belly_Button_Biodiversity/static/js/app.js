function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  url = `/samples/${sample}`;

  d3.json(url).then(function(data) {
    console.log(data);
    // var sorted_data = [data];

    //sort our information first
    // sorted_data.sort(function(a,b){
    //   return parseFloat(b.sample_values) - parseFloat(a.sample_values)
    // });

    // console.log(sorted_data)

    // Grab values from the response json object to build the plots
    //pull only first 10 values
    var otu_ids = data.otu_ids.slice(0,10);
    //test variable pull
    console.log(otu_ids);
    var otu_labels = data.otu_labels.slice(0,10);
    console.log(otu_labels);
    var sample_values = data.sample_values.slice(0,10);
    console.log(sample_values);

    //create variable for length of otu_labels
    otu_labels_lengths = otu_labels


    //Build a Pie Chart
    var trace1 = {
      values: sample_values,
      labels: otu_ids,
      hoverinfo: otu_labels,
      type: "pie"
    };

    var pieData = [trace1];

    //layout
    var pieLayout = {
      // title: `Sample: ${sample}, Top 10 `
      title: `${sample}`
    }

    Plotly.plot("pie",pieData, pieLayout);

    // @TODO: Build a Bubble Chart using the sample data
    var trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids
      }
    };

    var bubbleData = [trace2]

    var bubbleLayout = {
      title: ` Sample: ${sample} Biodiversity Bubble Chart`,
      xaxis: {
        title: "OTU ID"
      }
    }

    Plotly.plot('bubble',bubbleData, bubbleLayout);

  })
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();


