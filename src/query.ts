import { createDbWorker } from "sql.js-httpvfs";

const workerUrl = new URL(
    "sql.js-httpvfs/dist/sqlite.worker.js",
    import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);

const dbDir = "https://trickster.github.io/world-sqlite3/split-db";

export default async function load(query: string) {
    const worker = await createDbWorker(
        [
            {
                from: "jsonconfig",
                virtualFilename: "wdi.sqlite3",
                configUrl: dbDir + "/config.json",
            },
            {
                from: "inline",
                virtualFilename: "dbstat.sqlite3",
                config: {
                    serverMode: "full",
                    requestChunkSize: 4096,
                    url: dbDir + "/dbstat.sqlite3",
                },
            },
        ],
        workerUrl.toString(),
        wasmUrl.toString(),
    );

    // const result = await worker.db.query(`select * from names`);
    const result = await worker.db.query(query);

    let resultDom = document.querySelector("#result");
    if (resultDom) {
        resultDom.textContent = JSON.stringify(result, null, 4);
    }
}
