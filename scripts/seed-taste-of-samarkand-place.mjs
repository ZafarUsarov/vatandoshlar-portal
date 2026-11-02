import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL missing");
const hostname = new URL(connectionString).hostname;
if (!["localhost", "127.0.0.1", "::1", "[::1]"].includes(hostname)) {
  throw new Error("STOP: local database only");
}

const client = new pg.Client({ connectionString });
try {
  await client.connect();
  await client.query("BEGIN");

  const location = await client.query(`
    SELECT id, city_name, state_name FROM locations
    WHERE country_code = 'DE'
      AND city_name = 'Berlin'
      AND status = 'active'
    ORDER BY id
  `);
  if (location.rowCount !== 1) {
    throw new Error(`STOP: expected one active Berlin location, found ${location.rowCount}`);
  }

  const slug = "taste-of-samarkand";
  const existing = await client.query("SELECT id, status FROM places WHERE slug=$1 FOR UPDATE", [slug]);
  if (existing.rowCount) {
    await client.query("ROLLBACK");
    console.log("EXISTS: no changes made", existing.rows[0]);
  } else {
    const result = await client.query(`
      INSERT INTO places
        (slug, name, category, description_uz, description_de, location_id,
         street_address, website, status, category_label_uz, category_label_de)
      VALUES ($1,$2,'restaurant',$3,$4,$5,$6,$7,'published',$8,$9)
      RETURNING id, slug, status
    `, [
      slug, "Taste of Samarkand",
      "Taste of Samarkand — Berlindagi o‘zbek milliy taomlari restorani. Osh, manti, somsa va boshqa milliy taomlar taklif etiladi. Restoranning Kreuzberg va Westend hududlarida filiallari mavjud.",
      "Taste of Samarkand ist ein usbekisches Restaurant in Berlin. Angeboten werden unter anderem Plov, Manty, Samsa und weitere Spezialitäten. Standorte befinden sich in Kreuzberg und Westend.",
      location.rows[0].id, "Oranienstraße 187",
      "https://tasteofsamarkand.online-karte.com/",
      "O‘zbek restorani", "Usbekisches Restaurant",
    ]);
    await client.query("COMMIT");
    console.log("CREATED:", result.rows[0]);
  }
} catch (error) {
  await client.query("ROLLBACK").catch(() => {});
  console.error("FAILED:", error.message);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
