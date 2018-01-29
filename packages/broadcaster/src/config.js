import dotenv from "dotenv";
// relative from package root
dotenv.config({ path: `../../.env` });

const config = {
  id: `steem`,
  retry: 1500
};

export default config;
