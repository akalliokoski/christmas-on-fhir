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

const USE_SECRET_DISPLAY_TEXT = true;
const SECRET_DISPLAY_TEXT = "secret";

async function readTemplate(type) {
  const filepath = path.resolve(TEMPLATES_DIR, `${type}.json`);
  return jsonfile.readFile(filepath).catch(() => {
    console.log(`Template not found for resource ${type}`);
    return null;
  });
}

function getResourceUrl(type, id = null, { jsonFormat = false } = {}) {
  let url = `${FHIR_BASE}/${type}`;

  if (id !== null) {
    url += `/${id}`;
  }

  if (jsonFormat) {
    url += "?_format=json";
  }

  return url;
}

async function fetchResourceFromServer(type, id) {
  return axios.get(getResourceUrl(type, id));
}

async function createResourceOnServer(resource) {
  return await axios
    .post(getResourceUrl(resource.resourceType), resource)
    .then(response => response.data);
}

async function updateResourceOnServer(resource) {
  return await axios
    .put(getResourceUrl(resource.resourceType, resource.id), resource)
    .then(response => response.data);
}

async function getResource(type, id) {
  if (id === null || id === undefined) {
    return null;
  }

  return fetchResourceFromServer(type, id)
    .then(response => response.data)
    .catch(() => null);
}

async function createResource(type) {
  const template = (await readTemplate(type)) || {};
  const created = await createResourceOnServer(template);
  return fetchResourceFromServer(type, created.id).then(
    response => response.data
  );
}

async function getOrCreateResource(type, resourceIds) {
  return (
    (await getResource(type, resourceIds[type])) || (await createResource(type))
  );
}

async function getPreviousResourceIds() {
  return (await jsonfile.readFile(RESOURCE_IDS_FILE).catch(() => {})) || {};
}

async function writeResourceIds(resources) {
  const resourceIds = resources.reduce((acc, { resourceType, id }) => {
    acc[resourceType] = id;
    return acc;
  }, {});
  jsonfile.writeFile(RESOURCE_IDS_FILE, resourceIds);
}

function generateDisplay(data, properties) {
  const parts = properties.map(prop => data[prop]).filter(d => !!d);
  return parts.join(", ");
}

function getDisplayName(name = []) {
  if (USE_SECRET_DISPLAY_TEXT) {
    return SECRET_DISPLAY_TEXT;
  }

  const displayName = name.find(n => n.use === "official") || name[0];
  return (
    displayName.text ||
    generateDisplay(displayName, ["prefix", "family", "given", "suffix"])
  );
}

function getDisplay(resource) {
  switch (resource.resourceType) {
    case RESOURCE_TYPES.Patient:
    case RESOURCE_TYPES.Practitioner:
      return getDisplayName(resource.name);
    case RESOURCE_TYPES.Location:
      return generateDisplay(resource, ["name", "description"]);
    default:
      return "";
  }
}

async function updateAppointmentParticipant(resources) {
  const typeToResource = resources.reduce((acc, resource) => {
    acc[resource.resourceType] = resource;
    return acc;
  }, {});

  const participant = [
    typeToResource[RESOURCE_TYPES.Patient],
    typeToResource[RESOURCE_TYPES.Practitioner],
    typeToResource[RESOURCE_TYPES.Location]
  ];

  const references = participant.map(p => ({
    actor: {
      reference: `${p.resourceType}/${p.id}`,
      display: getDisplay(p)
    },
    required: "required",
    status: "accepted"
  }));

  const appointment = typeToResource[RESOURCE_TYPES.Appointment];
  appointment.participant = references;

  return updateResourceOnServer(appointment);
}

async function main() {
  const resourceIds = await getPreviousResourceIds();
  const resourceTypes = Object.values(RESOURCE_TYPES);
  const resources = await Promise.all(
    resourceTypes.map(resourceType =>
      getOrCreateResource(resourceType, resourceIds)
    )
  );

  await updateAppointmentParticipant(resources);
  writeResourceIds(resources);

  resources.forEach(resource =>
    console.log(
      `${resource.resourceType} ${resource.id}: ${getResourceUrl(
        resource.resourceType,
        resource.id
      )}`
    )
  );
}

main();
