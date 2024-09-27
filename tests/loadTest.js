import artillery from 'artillery';

const runLoadTest = () => {
  console.log("Waiting for the server to start...");

  // Delay to allow the server to initialize properly
  setTimeout(() => {
    // Load the artillery configuration file
    artillery.run('C:/Users/USER/Desktop/Fastamoni/tests/artillery.yml', (err, report) => {
      if (err) {
        console.error('Error during load test:', err);
      } else {
        console.log('Load test completed:', report);
      }
    });
  }, 5000); // Wait for 5 seconds
};

runLoadTest();
