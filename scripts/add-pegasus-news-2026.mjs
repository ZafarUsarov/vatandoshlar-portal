import fs from "node:fs/promises";
import pg from "pg";
const data = JSON.parse(await fs.readFile(new URL("./news-pegasus-2026.json", import.meta.url), "utf8"));
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL missing");
const url = new URL(process.env.DATABASE_URL);
if (!["localhost", "127.0.0.1", "[::1]", "::1"].includes(url.hostname)) throw new Error("STOP: non-local DATABASE_URL");
const client = new pg.Client({connectionString:process.env.DATABASE_URL,connectionTimeoutMillis:5000});
try {
 await client.connect();
 const server = await client.query("SELECT current_database() AS db, inet_server_addr()::text AS addr");
 if (server.rows[0].db !== "vatandoshlar" || !["::1/128","::1","127.0.0.1/32","127.0.0.1"].includes(server.rows[0].addr)) throw new Error("STOP: unexpected database or server address");
 await client.query("BEGIN");
 const check = await client.query("SELECT id::text, status FROM news_articles WHERE lower(slug)=lower($1) FOR UPDATE",[data.slug]);
 if (check.rowCount) { console.log("EXISTS: article id="+check.rows[0].id+" status="+check.rows[0].status+" (not overwritten)"); await client.query("ROLLBACK"); }
 else {
 const fields = ["slug","title_uz","title_de","excerpt_uz","excerpt_de","content_uz","content_de","category_uz","category_de","content_type","reading_time_uz","reading_time_de","source_name_uz","source_name_de","source_url","source_language_uz","source_language_de","verified_at","status","featured","image_url"];
 const values = fields.map(f => f === "status" ? "draft" : f === "featured" ? false : f === "image_url" ? data.image_url : data[f]);
 const sql = `INSERT INTO news_articles (${fields.join(",")}) VALUES (${fields.map((_,i)=>"$"+(i+1)).join(",")}) RETURNING id::text,status`;
 const result=await client.query(sql,values);
 await client.query("COMMIT");
 console.log("CREATED: id="+result.rows[0].id+" status="+result.rows[0].status);
 }
} catch(error) { try { await client.query("ROLLBACK"); } catch {} console.error("FAILED:",error.message); process.exitCode=1; } finally { await client.end(); }
