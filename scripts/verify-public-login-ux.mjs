import {
  readFile,
} from "node:fs/promises";

const files = {
  loginAction:
    "app/[locale]/id/login/actions.ts",
  loginPage:
    "app/[locale]/id/login/page.tsx",
  registerPage:
    "app/[locale]/id/register/page.tsx",
  registerForm:
    "components/auth/PublicRegisterForm.tsx",
  registerAction:
    "app/[locale]/id/register/actions.ts",
  profileAction:
    "app/[locale]/account/profile/actions.ts",
  header:
    "components/Header.tsx",
  adminLogin:
    "app/[locale]/login/actions.ts",
};

const contents =
  Object.fromEntries(
    await Promise.all(
      Object.entries(files).map(
        async ([key, path]) => [
          key,
          await readFile(
            path,
            "utf8",
          ),
        ],
      ),
    ),
  );

const assertions = [
  [
    contents.loginPage.includes(
      "Vatandoshlar.de hisobingizga kiring",
    ),
    "Uzbek login title",
  ],
  [
    contents.loginPage.includes(
      "Hali hisobingiz yo‘qmi?",
    ),
    "Uzbek login account prompt",
  ],
  [
    contents.loginPage.includes(
      '"Hisob yaratish"',
    ),
    "Uzbek login registration CTA",
  ],
  [
    contents.loginAction.includes(
      "E-mail manzilini kiriting.",
    ),
    "Empty email message",
  ],
  [
    contents.loginAction.includes(
      "Parolni kiriting.",
    ),
    "Empty password message",
  ],
  [
    contents.loginAction.includes(
      "E-mail yoki parol noto‘g‘ri. Iltimos, ma’lumotlarni tekshirib qayta urinib ko‘ring.",
    ),
    "Generic invalid credentials message",
  ],
  [
    contents.loginAction.includes(
      "Hozircha kirish amalga oshmadi. Birozdan so‘ng qayta urinib ko‘ring.",
    ),
    "Generic auth service message",
  ],
  [
    contents.loginAction.includes(
      '"public-credentials"',
    ),
    "Public credentials provider",
  ],
  [
    contents.registerPage.includes(
      '"VATANDOSHLAR.DE"',
    ),
    "Registration brand label",
  ],
  [
    contents.registerPage.includes(
      "Vatandoshlar.de hisobini yarating",
    ),
    "Uzbek registration title",
  ],
  [
    contents.registerPage.includes(
      "Bepul hisob yarating. Shahar va qiziqishlaringizni keyingi bosqichda tanlashingiz mumkin.",
    ),
    "Uzbek registration description",
  ],
  [
    contents.registerForm.includes(
      '"Hisob yaratish"',
    ),
    "Uzbek registration submit",
  ],
  [
    contents.registerPage.includes(
      "Hisobingiz bormi? Kirish",
    ),
    "Uzbek existing account copy",
  ],
  [
    contents.registerAction.includes(
      "/account/profile",
    ),
    "Registration to profile redirect",
  ],
  [
    contents.profileAction.includes(
      '"/my-city"',
    ),
    "Profile to My City redirect",
  ],
  [
    contents.header.includes(
      '"/id/login"',
    ),
    "Public Header login route",
  ],
  [
    contents.adminLogin.includes(
      '"credentials"',
    ),
    "Admin credentials flow remains present",
  ],
];

const failed =
  assertions.filter(
    ([passed]) =>
      !passed,
  );

console.log("");
console.log(
  "Public login UX verification",
);
console.log(
  "----------------------------",
);

for (
  const [
    passed,
    label,
  ]
  of assertions
) {
  console.log(
    `${label}: ${passed ? "PASS" : "FAIL"}`,
  );
}

if (
  failed.length > 0
) {
  throw new Error(
    `Verification failed: ${failed
      .map(([, label]) => label)
      .join(", ")}`,
  );
}

console.log("");
console.log(
  "Verification PASSED.",
);
