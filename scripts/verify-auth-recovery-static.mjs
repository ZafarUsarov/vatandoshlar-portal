import fs from "node:fs";
const checks = [
  ["db/migrations/035_add_auth_recovery_tokens.sql", /token_hash[\s\S]*expires_at[\s\S]*used_at/],
  ["lib/auth/public-auth-token-repository.ts", /createHash\("sha256"\)[\s\S]*randomBytes\(32\)/],
  ["lib/auth/public-auth-token-repository.ts", /expires_at > NOW\(\)[\s\S]*used_at IS NULL/],
  ["lib/auth/public-user-repository.ts", /!row\.email_verified_at/],
  ["app/[locale]/id/forgot-password/actions.ts", /Agar bu e-mail bilan hisob mavjud/],
];
let failed = false;
for (const [file, pattern] of checks) {
  const text = fs.readFileSync(file, "utf8");
  const ok = pattern.test(text); console.log(`${ok ? "PASS" : "FAIL"} ${file}`); failed ||= !ok;
}
if (failed) process.exit(1);
