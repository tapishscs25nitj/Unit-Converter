

var weightFactors = {
  kg: 1000,
  g: 1,
  lb: 453.59237,
  oz: 28.349523125
};
function convertWeight(value, fromUnit, toUnit) {
  if (isNaN(value)) {
    return null;
  }
  var grams = value * weightFactors[fromUnit];
  var result = grams / weightFactors[toUnit];
  return result;
}


function convertTemp(value, fromUnit, toUnit) {
  if (isNaN(value)) {
    return null;
  }


  var celsius;
  if (fromUnit === 'C') {
    celsius = value;
  } else if (fromUnit === 'F') {
    celsius = (value - 32) * 5 / 9;
  } else if (fromUnit === 'K') {
    celsius = value - 273.15;
  } else {
    return null;
  }

  if (toUnit === 'C') {
    return celsius;
  }
  if (toUnit === 'F') {
    return (celsius * 9 / 5) + 32;
  }
  if (toUnit === 'K') {
    return celsius + 273.15;
  }
  return null;
}


function getById(id) {
  return document.getElementById(id);
}

function updateWeightResult() {
  var inputText = getById('weight_input').value;
  var value = parseFloat(inputText);
  var from = getById('from_weight').value;
  var to = getById('to_weight').value;

  var result = convertWeight(value, from, to);
  var resultEl = getById('weight_result');
  var outputEl = getById('output_weight');

  if (result === null) {
    resultEl.textContent = 'Enter a valid number';
    outputEl.textContent = '—';
    return;
  }

  var rounded = Number(result.toFixed(6));
  resultEl.textContent = rounded + ' ' + to;
  outputEl.textContent = value + ' ' + from + ' = ' + rounded + ' ' + to;
}

function updateTempResult() {
  var inputText = getById('temp_input').value;
  var value = parseFloat(inputText);
  var from = getById('from_temp').value;
  var to = getById('to_temp').value;

  var result = convertTemp(value, from, to);
  var resultEl = getById('temp_result');
  var outputEl = getById('output_temp');

  if (result === null) {
    resultEl.textContent = 'Enter a valid number';
    outputEl.textContent = '—';
    return;
  }

  var rounded = Number(result.toFixed(2));
  resultEl.textContent = rounded + ' ' + to;
  outputEl.textContent = value + ' ' + from + ' = ' + rounded + ' ' + to;
}

getById('convert_weight').addEventListener('click', updateWeightResult);
getById('convert_temp').addEventListener('click', updateTempResult);

function enterKeyHandlerForWeight(event) {
  if (event.key === 'Enter') {
    updateWeightResult();
  }
}

function enterKeyHandlerForTemp(event) {
  if (event.key === 'Enter') {
    updateTempResult();
  }
}

getById('weight_input').addEventListener('keydown', enterKeyHandlerForWeight);
getById('temp_input').addEventListener('keydown', enterKeyHandlerForTemp);
