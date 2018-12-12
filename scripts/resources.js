const axios = require("axios");
const jsonfile = require("jsonfile");
const path = require("path");

const TYPES = {
  Patient: "Patient"
};

const TEMPLATES_DIR = path.resolve("./src/assets/fhir-templates");
const TYPE_TO_TEMPLATE = {
  [TYPES.Patient]: "patient.json"
};

const FHIR_BASE = "http://hapi.fhir.org/baseDstu3";

const DEFAULT_RESOURCE_IDS = {
  [TYPES.Patient]: "857425"
};

const OUTPUT_FILE = path.resolve("./src/assets/fhir-resources.json");

const readTemplate = async type => {
  const filename = TYPE_TO_TEMPLATE[type];
  const filepath = path.resolve(TEMPLATES_DIR, filename);
  return jsonfile.readFile(filepath);
};

const getResourceUrl = (type, id = null, { jsonFormat = false } = {}) => {
  let url = `${FHIR_BASE}/${type}`;

  if (id !== null) {
    url += `/${id}`;
  }

  if (jsonFormat) {
    url += "?_format=json";
  }

  return url;
};

const fetchResourceFromServer = async (type, id) => {
  return axios.get(getResourceUrl(type, id));
};

const createResourceOnServer = async resource => {
  await axios.post(getResourceUrl(resource.resourceType), resource);
};

const getDefaultResource = async type => {
  const id = DEFAULT_RESOURCE_IDS[type];
  return fetchResourceFromServer(type, id)
    .then(response => response.data)
    .catch(() => null);
};

const createResource = async type => {
  const template = await readTemplate(type);
  const created = await createResourceOnServer(template);
  return fetchResourceFromServer(type, created.id).then(
    response => response.data
  );
};

const getOrCreateResource = async type => {
  return (await getDefaultResource(type)) || (await createResource(type));
};

const getResourceIds = resources => {
  return resources.reduce((acc, { resourceType, id }) => {
    let arr = acc[resourceType];
    if (!arr) {
      arr = [];
      acc[resourceType] = arr;
    }

    arr.push(id);
    return acc;
  }, {});
};

const main = async () => {
  const patient = await getOrCreateResource(TYPES.Patient);
  const output = getResourceIds([patient]);
  console.log(output);
  return jsonfile.writeFile(OUTPUT_FILE, output);
};

main();
