/**
 * Created by nikos on 10/11/2015.
 */


var autocompleteService;

function setUpTextInputs() {
  var input = /** @type {!HTMLInputElement} */(
    document.getElementById('svc-input'));
  var inputPP = /** @type {!HTMLInputElement} */(
    document.getElementById('svc-input-getPredictions'));

  input.addEventListener("keyup", function (e) {

    var output = "";

    var regionsOption = document.querySelector('input[name="useRegions"]:checked').value;

    switch (regionsOption) {

      case 'noRegions':
        getAutocompleteService_GetPlacePredictions(input.value, false);
        break;

      case 'regions':
        getAutocompleteService_GetPlacePredictions(input.value, true);
        break;

      case 'merged':
        var noRegions = getAutocompleteService_GetPlacePredictions(inputMerged.value, false);
        //bad code cause I want people to run without npm
        setTimeout(function () {
          var withRegions = getAutocompleteService_GetPlacePredictions(inputMerged.value, true);
        }, 500)
        break;

      default:
        break
    }

  });
  inputPP.addEventListener("keyup", function (e) {

    var output = "";

    getAutocompleteService_GetPredictions(inputPP.value);

  });
}
function setUpMagicInputs() {
  var input = /** @type {!HTMLInputElement} */(
    document.getElementById('pac-input'));
  var input2 = /** @type {!HTMLInputElement} */(
    document.getElementById('pac-input2'));

  var options = {
    language: 'en-GB',
    types: ['geocode'],
    componentRestrictions: {country: "uk"}
  }
  var options2 = {
    language: 'en-GB',
    types: ['(regions)'],
    componentRestrictions: {country: "uk"}
  }

  var autocomplete = new google.maps.places.Autocomplete(input, options);

  autocomplete.addListener('place_changed', function (d) {
    //code when input changed
    var d = 2;
  });


  var input = /** @type {!HTMLInputElement} */(
    document.getElementById('pac-input'));

  var options = {
    language: 'en-GB',
    types: ['(regions)', 'geocode'],
    componentRestrictions: {country: "uk"}
  }

  var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

}
function init() {

  autocompleteService = new google.maps.places.AutocompleteService();
  setUpMagicInputs();

  setUpTextInputs();


  document.getElementById('hide').style.display = "none"
}
/**
 * Gets results array
 * @param searchTerm
 * @param useRegions
 */
//todo wire out babel promise
function getAutocompleteService_GetPlacePredictions(searchTerm, useRegions) {
  /*    var Promise = new Promise(function (resolve, reject) {

   })*/
  var types = useRegions ? '(regions)' : null;
  autocompleteService.getPlacePredictions({
      input: searchTerm,
      componentRestrictions: {country: 'uk'},
      types: types ? [types] : null,
    }, function (newData) {
      if (newData === null) {
        console.log('No results for suggestions');
      }

      var output = newData.map(function (item) {
        return item.description;
      }).join("<br>");


      //set the page for viewing the data from google
      document.getElementById("output").innerHTML = '<pre>' + output + '</pre>';

    }
  );
  //return Promise;
}


/**
 * Gets results array
 * @param searchTerm
 */
//todo wire out babel promise
function getAutocompleteService_GetPredictions(searchTerm) {
  /*    var Promise = new Promise(function (resolve, reject) {

   })*/
  autocompleteService.getPredictions({
      input: searchTerm,
      componentRestrictions: {country: 'uk'},
    }, function (newData) {
      if (newData === null) {
        console.log('No results for suggestions');
      }

      var output = newData.map(function (item) {
        return item.description;
      }).join("<br>");


      //set the page for viewing the data from google
      document.getElementById("output2").innerHTML = '<pre>' + output + '</pre>';

    }
  );
  //return Promise;
}
