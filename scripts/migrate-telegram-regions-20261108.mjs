import { Client } from "pg";

const apply = process.argv.includes("--apply");
if (process.argv.some((arg) => arg.startsWith("--") && arg !== "--apply")) {
  throw new Error("Unknown option");
}
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL missing");

const client = new Client({ connectionString: process.env.DATABASE_URL });
const targets = ["BY", "BY-MUC", "NI", "NI-HA"];
const links = {
  BY: "https://t.me/Bayern_uzbeklar",
  NI: "https://t.me/niedersachen_uz",
  "NI-HA": "https://t.me/hannover_uzbeklar",
};
const getRows = async () => (await client.query(
  `SELECT id, bundesland, short_name, custom_name_uz, custom_name_de, href,
          button_type, group_status, status, community_type, sort_order
   FROM telegram_groups WHERE short_name = ANY($1::text[]) ORDER BY short_name`,
  [targets],
)).rows;

try {
  await client.connect();
  await client.query("BEGIN");
  if (!apply) await client.query("SET TRANSACTION READ ONLY");
  else await client.query("LOCK TABLE telegram_groups IN SHARE ROW EXCLUSIVE MODE");

  const before = await getRows();
  const byCode = new Map(before.map((row) => [row.short_name, row]));
  const by = byCode.get("BY");
  const ni = byCode.get("NI");
  if (!by || !ni) throw new Error("BY and NI records must already exist");
  if (by.bundesland !== "Bayern" || ni.bundesland !== "Niedersachsen") {
    throw new Error("Unexpected Bundesland for BY or NI");
  }
  if ([by, ni].some((row) => row.community_type !== "regional" || row.status !== "published")) {
    throw new Error("BY and NI must be published regional records");
  }
  const muc = byCode.get("BY-MUC");
  const ha = byCode.get("NI-HA");
  if (!muc && (!by.href || by.group_status !== "active" ||
      by.custom_name_uz !== "München Vatandoshlar" ||
      by.custom_name_de !== "München Vatandoshlar")) {
    throw new Error("Original BY is not the expected München record; refusing to move its link");
  }
  if (muc && (muc.bundesland !== "Bayern" || muc.community_type !== "regional" ||
      muc.status !== "published" || !muc.href)) {
    throw new Error("Existing BY-MUC conflicts with expected München record");
  }
  if (ha && (ha.bundesland !== "Niedersachsen" || ha.community_type !== "regional" ||
      ha.status !== "published" || ha.href !== links["NI-HA"])) {
    throw new Error("Existing NI-HA conflicts with expected Hannover record");
  }
  if (muc && by.href !== links.BY) {
    throw new Error("BY-MUC exists but BY does not have the expected statewide link");
  }
  console.table(before.map(({ short_name, bundesland, custom_name_uz, group_status, status }) =>
    ({ short_name, bundesland, custom_name_uz, group_status, status })));
  console.log(apply ? "APPLY requested" : "DRY RUN ONLY — no database changes");

  if (apply) {
    if (!muc) {
      await client.query(`INSERT INTO telegram_groups
        (bundesland, short_name, custom_name_uz, custom_name_de, href,
         button_type, group_status, status, sort_order, community_type)
        VALUES ('Bayern', 'BY-MUC', 'München Vatandoshlar', 'München Vatandoshlar',
          $1, $2, 'active', 'published', $3, 'regional')`,
      [by.href, by.button_type, by.sort_order + 1]);
    }
    await client.query(`UPDATE telegram_groups SET
      custom_name_uz = NULL, custom_name_de = NULL,
      custom_description_uz = NULL, custom_description_de = NULL,
      href = $1, button_type = 'group', group_status = 'active', updated_at = now()
      WHERE short_name = 'BY'`, [links.BY]);
    await client.query(`UPDATE telegram_groups SET
      custom_name_uz = NULL, custom_name_de = NULL,
      custom_description_uz = NULL, custom_description_de = NULL,
      href = $1, button_type = 'group', group_status = 'active', updated_at = now()
      WHERE short_name = 'NI'`, [links.NI]);
    if (!ha) {
      await client.query(`INSERT INTO telegram_groups
        (bundesland, short_name, custom_name_uz, custom_name_de, href,
         button_type, group_status, status, sort_order, community_type)
        VALUES ('Niedersachsen', 'NI-HA', 'Hannover Vatandoshlar', 'Hannover Vatandoshlar',
          $1, 'group', 'active', 'published', $2, 'regional')`,
      [links["NI-HA"], ni.sort_order + 1]);
    }
    const after = await getRows();
    if (after.length !== 4 || after.some((row) => row.group_status !== "active" ||
        row.status !== "published" || !row.href) ||
        after.find((row) => row.short_name === "BY")?.href !== links.BY ||
        after.find((row) => row.short_name === "NI")?.href !== links.NI ||
        after.find((row) => row.short_name === "NI-HA")?.href !== links["NI-HA"]) {
      throw new Error("Post-migration verification failed");
    }
    await client.query("COMMIT");
    console.log("Migration committed; four regional records verified.");
  } else {
    await client.query("ROLLBACK");
    console.log("Read-only validation complete.");
  }
} catch (error) {
  try { await client.query("ROLLBACK"); } catch {}
  console.error(error);
  process.exitCode = 1;
} finally {
  await client.end();
}
