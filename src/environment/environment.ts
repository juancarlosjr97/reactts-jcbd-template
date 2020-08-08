const environment = {
  SITE_NAME: process.env.SITE_NAME,
  PRODUCTION: process.env.NODE_ENV === "production",
  API_URL: process.env.API_URL,
};

export default environment;
