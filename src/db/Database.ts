import pkg from "pg";
const { Pool } = pkg;

const createDatabasePool = (dbConfig: {
  user?: string;
  password?: string;
  host?: string;
  database?: string;
}) => {
  const dbPool = new Pool(dbConfig);
  return dbPool;
};

export { createDatabasePool };
