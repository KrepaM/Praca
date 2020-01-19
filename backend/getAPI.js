// PUBLIC API - GET
function geCarInfosArray(vin) {
  let objects = [];
  let files = getFilesFromDirectory();
  for (let file of files) {
    let obj = fileIO.readFromFile(file);
    obj = JSON.parse(obj);
    if (obj.vin == vin) objects.push(obj);
  }
  return objects;
}

// PRIVATE API - GET
function getPersonInfosArray(id) {
  let objects = [];
  let files = getFilesFromDirectory();
  for (let file of files) {
    let obj = fileIO.readFromFile(file);
    obj = JSON.parse(obj);
    if (obj.id == id) objects.push(obj);
  }
  return objects;
}
