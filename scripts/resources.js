const axios = require("axios");
const jsonfile = require("jsonfile");
const path = require("path");

const RESOURCE_TYPES = {
  Patient: "Patient",
  Practitioner: "Practitioner",
  Location: "Location",
  Appointment: "Appointment"
};

const TEMPLATES_DIR = path.resolve("./src/assets/fhir-templates");
const FHIR_BASE = "http://hapi.fhir.org/baseDstu3";

const RESOURCE_IDS_FILE = path.resolve("./src/assets/fhir-resources.json");

const readTemplate = async type => {
  const filepath = path.resolve(TEMPLATES_DIR, `${type}.json`);
  return jsonfile.readFile(filepath).catch(() => {
    console.log(`Template not found for resource ${type}`);
    return null;
  });
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
  return await axios
    .post(getResourceUrl(resource.resourceType), resource)
    .then(response => response.data);
};

const getResource = async (type, id) => {
  if (id === null || id === undefined) {
    return null;
  }

  return fetchResourceFromServer(type, id)
    .then(response => response.data)
    .catch(() => null);
};

const createResource = async type => {
  const template = (await readTemplate(type)) || {};
  const created = await createResourceOnServer(template);
  return fetchResourceFromServer(type, created.id).then(
    response => response.data
  );
};

const getOrCreateResource = async (type, resourceIds) => {
  return (
    (await getResource(type, resourceIds[type])) || (await createResource(type))
  );
};

const getPreviousResourceIds = async () => {
  return (await jsonfile.readFile(RESOURCE_IDS_FILE).catch(() => {})) || {};
};

const writeResourceIds = async resources => {
  const resourceIds = resources.reduce((acc, { resourceType, id }) => {
    acc[resourceType] = id;
    return acc;
  }, {});
  jsonfile.writeFile(RESOURCE_IDS_FILE, resourceIds);
};

const main = async () => {
  const resourceIds = await getPreviousResourceIds();
  const resourceTypes = Object.values(RESOURCE_TYPES);
  const resources = await Promise.all(
    resourceTypes.map(resourceType =>
      getOrCreateResource(resourceType, resourceIds)
    )
  );

  writeResourceIds(resources);

  resources.forEach(resource =>
    console.log(
      `${resource.resourceType} ${resource.id}: ${getResourceUrl(
        resource.resourceType,
        resource.id
      )}`
    )
  );
};

main();
