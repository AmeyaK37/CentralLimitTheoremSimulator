document.addEventListener("DOMContentLoaded", () => {
  const populationCanvas = document.getElementById("populationCanvas");
  const samplingCanvas = document.getElementById("samplingCanvas");
  const samplingMeanEl = document.getElementById("samplingMean");
  const samplingStdDevEl = document.getElementById("samplingStdDev");
  const simulateBtn = document.getElementById("simulateBtn");

  simulateBtn.addEventListener("click", () => {
    const sampleSize = parseInt(document.getElementById("sampleSize").value);
    const distribution = document.getElementById("distribution").value;

    const populationData = generatePopulationData(distribution);
    plotBarChart(populationCanvas, populationData, "Population Distribution");

    const samplingDistribution = generateSamplingDistribution(populationData, sampleSize);
    plotLineChart(samplingCanvas, samplingDistribution, "Sampling Distribution");

    const samplingMean = calculateMean(samplingDistribution);
    const samplingStdDev = calculateStdDev(samplingDistribution);

    samplingMeanEl.textContent = samplingMean.toFixed(2);
    samplingStdDevEl.textContent = samplingStdDev.toFixed(2);
  });

  function generatePopulationData(distribution) {
    // Generate population data based on the chosen distribution
    // Example for normal distribution with random values:
    const data = [];
    for (let i = 0; i < 1000; i++) {
      data.push(Math.random() * 100);
    }
    return data;
  }

  function generateSamplingDistribution(populationData, sampleSize) {
    // Generate sampling distribution of sample means using the given sample size
    const samplingDistribution = [];
    for (let i = 0; i < 1000; i++) {
      const sample = [];
      for (let j = 0; j < sampleSize; j++) {
        const randomIndex = Math.floor(Math.random() * populationData.length);
        sample.push(populationData[randomIndex]);
      }
      const sampleMean = calculateMean(sample);
      samplingDistribution.push(sampleMean);
    }
    return samplingDistribution;
  }

  function plotBarChart(canvas, data, title) {
    // Implement code to plot a bar chart on the canvas using the provided data
    // Example: Display a simple bar chart using Chart.js library
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: Array.from({ length: data.length }, (_, i) => i + 1),
        datasets: [{
          label: title,
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  function plotLineChart(canvas, data, title) {
    // Implement code to plot a line chart on the canvas using the provided data
    // Example: Display a simple line chart using Chart.js library
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: Array.from({ length: data.length }, (_, i) => i + 1),
        datasets: [{
          label: title,
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  function calculateMean(data) {
    // Calculate mean of an array
    return data.reduce((acc, val) => acc + val, 0) / data.length;
  }

  function calculateStdDev(data) {
    // Calculate standard deviation of an array
    const mean = calculateMean(data);
    const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
  }
});
