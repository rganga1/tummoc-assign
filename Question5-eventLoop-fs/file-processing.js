// File Processing System

const fs = require('fs');

// Function to read a directory and process each file
function readDirectory(directoryPath, errorCallback) {
  fs.readdir(directoryPath, (error, files) => {
    if (error) {
      errorCallback('Error reading directory:', error);
    } else {
      files.forEach((file) => {
        const filePath = `${directoryPath}/${file}`;
        processFile(filePath, errorCallback);
      });
    }
  });
}

// File Processing Operations
function analyzeFile(filePath, errorCallback) {
  setTimeout(() => {
    console.log('Analyzing file:', filePath);
    // ...
  }, 1000);
}

function transformFile(filePath, errorCallback) {
  setTimeout(() => {
    console.log('Transforming file:', filePath);
    // ...
  }, 2000);
}

function validateFile(filePath) {
  const isValid = filePath.endsWith('.txt');
  return isValid;
}

// Main Execution
const directoryPath = './files';
readDirectory(directoryPath, (errorMessage, error) => {
  if (error) {
    console.error('Error processing files in directory:', directoryPath, error);
  } else {
    console.log('File processing completed successfully.');
  }
});

// Error Handling
function handleError(errorMessage, error) {
  console.error(errorMessage, error);

  if (error.code === 'ENOENT') {
    console.error('File not found:', error.path);
    // ...
  } else if (error.code === 'ECONNREFUSED') {
    console.error('Connection refused. Please check the network connection.');
    // ...
  } else {
    console.error('Unknown error occurred.');
    // ...
  }
}

// File Processing Flow
function processFile(filePath, errorCallback) {
  if (!validateFile(filePath)) {
    console.log('Invalid file:', filePath);
    return;
  }

  console.log('Processing started:', filePath);

  analyzeFile(filePath, errorCallback);
  console.log('Analyzing file:', filePath);

  transformFile(filePath, errorCallback);
  console.log('Transforming file:', filePath);

  setTimeout(() => {
    console.log('Final processing:', filePath);
    // ...
    console.log('Processing completed:', filePath);
  }, 3000);
}