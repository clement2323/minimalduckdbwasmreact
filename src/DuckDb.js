import * as duckdb from "@duckdb/duckdb-wasm";

async function instantiate(duckdb) {
  const CDN_BUNDLES = duckdb.getJsDelivrBundles(),
    bundle = await duckdb.selectBundle(CDN_BUNDLES), // Select a bundle based on browser checks
    worker_url = URL.createObjectURL(
      new Blob([`importScripts("${bundle.mainWorker}");`], {
        type: "text/javascript"
      })
    );

  // Instantiate the asynchronus version of DuckDB-wasm
  const worker = new Worker(worker_url),
    logger = new duckdb.ConsoleLogger("DEBUG"),
    db = new duckdb.AsyncDuckDB(logger, worker);

  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
  URL.revokeObjectURL(worker_url);

  return db;
}

async function insertThenQuery(db) {
  const c = await db.connect();
  
 
  let query = await c.query(`SELECT * FROM 'https://minio.lab.sspcloud.fr/cguillo/donnees_enq_concatennees.parquet'`)
  //let result = query.toArray();

  const schema = query.schema.fields.map(({ name, type }) => ({
    name,
    type: String(type),
    databaseType: String(type)
  }));
  
  console.log("Schema");
  console.log(schema)
  let rows = query.toArray()
  rows = rows.map(row => {
    return Object.fromEntries(
      Object.entries(row).map(([key, value]) => {
        if (typeof value === 'bigint') {
          return [key, value.toString()];
        } else {
          return [key, value];
        }
      })
    );
  });

  rows = rows.map((row, index) => {
    return { id: index, ...row };
  });
  
  console.log('rows')
  console.log(rows)
  

  //result = query.JSON();
 // return result;
  return rows;
   
}

export default {
  test: async function () {
    var db = await instantiate(duckdb),
      result = await insertThenQuery(db);

    return result;
  }
};
