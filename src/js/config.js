window.env = {
  apiUrl: "https://pingobras-factorio-server.glitch.me",
  encodedUser: "RkFDVE9SSU9BTExUSEVNT0RTVFJBTlNMQVRFREJS",
  encodedPassword: "c252ZTA3MjUwOeck",
  encodedUserManutencao: "@gladiado5",
  encodedPasswordManutencao: "@Buy Me a Coffee #2877",
  api_key:"UmpOWFIxSlhNaTVHV1RFeE5WRTFMVWhMVGswd1JFY3RVRm8wTTFOUU1pMVFWRkZYVGtaUw==",
  ipInfo: "f1dd48b5ecd676",
  fileTypes: [
    "zip/zip",
    "application/x-zip-compressed",
    "zip",
    "application/json",
    "text/plain",
  ]
};

window.getAuthorizationHeader = function getAuthorizationHeader() {
  const combined = `${window.env.encodedUser}:${window.env.encodedPassword}`; 
  const doubleEncoded = btoa(btoa(combined));
  return `Basic ${doubleEncoded}`;
};