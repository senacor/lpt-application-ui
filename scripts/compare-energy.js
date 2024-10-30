import fs from "fs";

function compareEnergy() {
  try {
    // Read the energy values
    const currentData = JSON.parse(fs.readFileSync('/tmp/eco-ci/total-data.json', 'utf8'));
    const baselineData = JSON.parse(fs.readFileSync(`${process.env.GITHUB_WORKSPACE}/baseline-data/total-data.json`, 'utf8'));

    const currentEnergy = currentData.energy_joules;
    const baselineEnergy = baselineData.energy_joules;

    // Calculate percentage difference
    let percentDiff = ((currentEnergy - baselineEnergy) / baselineEnergy) * 100;
    const threshold = 10;

    percentDiff = Number.parseFloat(percentDiff).toFixed(2)
    // Log results
    console.log('Energy Consumption Analysis:');
    console.log(`Current: ${Number.parseFloat(currentEnergy).toFixed(2)} joules`);
    console.log(`Baseline: ${Number.parseFloat(baselineEnergy).toFixed(2)} joules`);
    console.log(`Difference: ${percentDiff}%`);

    let message
    // Evaluate results
    if (percentDiff > threshold) {
      message = `Energy consumption increased by ${percentDiff}% (above ${threshold}% threshold)`;
    } else if (percentDiff < 0) {
      message = `Energy consumption decreased by ${percentDiff}%`;
    } else {
      message = `Energy consumption increased by ${percentDiff}% (within ${threshold}% threshold)`;
    }
    console.log(message)

  } catch (error) {
    console.log(`Error occurred: ${error.message}`);
  }
}

compareEnergy();
