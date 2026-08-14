const baseUrl =
  "https://vatandoshlar.de";

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vatandoshlar.de",
  url: baseUrl,
  logo: `${baseUrl}/images/brand/vatandoshlar-icon.png`,
  sameAs: [
    "https://t.me/Vatandoshlar_de",
    "https://www.instagram.com/vatandoshlar.de",
    "https://facebook.com/Vatandoshlar.de",
  ],
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Vatandoshlar.de",
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
