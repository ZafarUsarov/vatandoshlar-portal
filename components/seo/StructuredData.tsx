const baseUrl =
  "https://vatandoshlar.de";

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UzDe",
  url: baseUrl,
  logo: `${baseUrl}/images/brand/uzde/uzde-icon-512.png`,
  sameAs: [
    "https://t.me/UzDe_de",
    "https://www.instagram.com/uzde_de",
    "https://www.facebook.com/uzde.dee",
  ],
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "UzDe",
  url: baseUrl,
};

function serializeStructuredData(
  data: object,
): string {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c",
  );
}

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeStructuredData(
              organizationStructuredData,
            ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeStructuredData(
              websiteStructuredData,
            ),
        }}
      />
    </>
  );
}
