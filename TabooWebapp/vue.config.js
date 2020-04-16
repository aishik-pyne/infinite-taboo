
const PUBLIC_PATH = process.env.VUE_APP_PUBIC_PATH;
module.exports = {
    publicPath: PUBLIC_PATH ? PUBLIC_PATH : "./",
};
