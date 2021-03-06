import Chart from 'chart.js';

export const createTagChart = (tagsCtx) => {
  return new Chart(tagsCtx, {
    type: `pie`,
    data: {
      labels: [`#watchstreams`, `#relaxation`, `#coding`, `#sleep`, `#watermelonpies`],
      datasets: [{
        data: [20, 15, 10, 5, 2],
        backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000`, `#31b55c`],
      }],
    },
    options: {
      plugins: {
        datalabels: {
          display: false,
        },
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, item) => acc + parseFloat(item));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          },
        },
        displayColors: false,
        backgroundColor: `#fff`,
        bodyFontColor: `#000`,
        borderColor: `#000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15,
      },
      title: {
        display: true,
        text: `DONE BY: TAGS`,
        fontSize: 16,
        fontColor: `#000`,
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000`,
          fontSize: 13,
        },
      }
    }
  });
};

export const createColorChart = (colorsCtx) => {
  return new Chart(colorsCtx, {
    type: `pie`,
    data: {
      labels: [`#pink`, `#yellow`, `#blue`, `#black`, `#green`],
      datasets: [{
        data: [5, 25, 15, 10, 30],
        backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000`, `#31b55c`],
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false,
        },
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, item) => acc + parseFloat(item));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#fff`,
        bodyFontColor: `#000`,
        borderColor: `#000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15,
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000`,
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000`,
          fontSize: 13,
        },
      }
    }
  });
};
