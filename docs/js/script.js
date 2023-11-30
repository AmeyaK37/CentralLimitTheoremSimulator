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
    let data = [];
    switch (distribution) {
      case "normal":
        // Generate data for a normal distribution
        data = generateNormalDistribution(1000);
        break;
      case "uniform":
        // Generate data for a uniform distribution
        data = generateUniformDistribution(1000);
        break;
      case "bimodal":
        // Generate data for a bimodal distribution
        data = generateBimodalDistribution(1000);
        break;
      default:
        // Default to a normal distribution
        data = generateNormalDistribution(1000);
        break;
    }
    return data;
  }

  function generateNormalDistribution(size) {
    // Generate data for a normal distribution
    const mean = 50;
    const stdDev = 10;
    let data = [];
    for (let i = 0; i < size; i++) {
      data.push(randomNormalDistribution(mean, stdDev));
    }
    return data;
  }

  function generateUniformDistribution(size) {
    // Generate data for a uniform distribution
    let data = [];
    for (let i = 0; i < size; i++) {
      data.push(Math.random() * 100);
    }
    return data;
  }

  function generateBimodalDistribution(size) {
    // Generate data for a bimodal distribution
    const data = [];
    for (let i = 0; i < size; i++) {
      data.push(Math.random() < 0.5 ? Math.random() * 30 : Math.random() * 70);
    }
    return data;
  }

  function randomNormalDistribution(mean, stdDev) {
    // Generate a random value from a normal distribution
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const value = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return mean + stdDev * value;
  }

  function generateSamplingDistribution(populationData, sampleSize) {
    // Generate sampling distribution using the given sample size
    let samplingDistribution = [];
    for (let i = 0; i < 1000; i++) {
      let sample = [];
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
    // Placeholder for plotting a bar chart using the provided data on the canvas
    // Replace this with your actual charting code (e.g., Chart.js or other libraries)
    console.log("Plotting bar chart with data:", data);
  }

  function plotLineChart(canvas, data, title) {
    // Placeholder for plotting a line chart using the provided data on the canvas
    // Replace this with your actual charting code (e.g., Chart.js or other libraries)
    console.log("Plotting line chart with data:", data);
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
