import Image from "next/image";
import { ArrowUpRight, Wallet } from "lucide-react";
import styles from "./Support.module.css";
import BrandedText from "@/components/ui/BrandedText";

type SupportOption = Readonly<{
  name: string;
  description: string;
  action: string;
  href: string;
  variant: "paypal" | "taps";
}>;

type SupportOptionsProps = Readonly<{
  locale: "uz" | "de";
  title: string;
  description: string;
  secondaryText: string;
  options: ReadonlyArray<SupportOption>;
  privacy: string;
}>;

export default function SupportOptions({
  locale,
  title,
  secondaryText,
  options,
  privacy,
}: SupportOptionsProps) {
  return (
    <section id="support-options" className={styles.section} aria-labelledby="support-options-title">
      <h2 id="support-options-title"><span className={styles.desktopCopy}>{title}</span><span className={styles.mobileCopy}>{locale === "de" ? "Beitragsmöglichkeiten" : "Hissa qoşiş usullari"}</span></h2>

      <p className={styles.note}><span className={styles.desktopCopy}><BrandedText text={secondaryText} /></span><span className={styles.mobileCopy}><BrandedText text={locale === "de" ? "Als Verwendungszweck können Sie „UzDe“ angeben." : "Tölov izohiga “UzDe” deb yozişingiz mumkin."} /></span></p>
      <div className={styles.paymentGrid}>
        {options.map(option => (
          <a key={option.variant} className={styles.payment} data-provider={option.variant} href={option.href} target="_blank" rel="noopener noreferrer">
            <div className={styles.paymentMarks}>
              {option.variant === "paypal" ? <Image src="/images/brand/paypal-mark-color.svg" alt="" width={36} height={36} className={styles.paypalMark} unoptimized /> : <Wallet aria-hidden="true" size={36} strokeWidth={1.4} />}
              <h3>{option.name}</h3>

            </div>

            <p><span className={styles.desktopCopy}>{option.description}</span><span className={styles.mobileCopy}>{option.variant === "paypal" ? (locale === "de" ? "Aus Deutschland und anderen Ländern." : "Germaniya va boşqa davlatlardan.") : (locale === "de" ? "Zahlungen aus Usbekistan." : "Özbekistondan tölovlar.")}</span></p>
            <span className={styles.action}>{option.action.startsWith("Über ") ? "Beitrag leisten" : "Hissa qoşiş"}<ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.5} /></span>
          </a>
        ))}
      </div>
      <p className={styles.note}><span className={styles.desktopCopy}><BrandedText text={privacy} /></span><span className={styles.mobileCopy}><BrandedText text={locale === "de" ? "Zahlungen erfolgen über PayPal oder Taps. UzDe. erhält und speichert keine Karten- oder Bankdaten." : "Tölovlar PayPal yoki Taps orqali amalga oşiriladi. UzDe. karta yoki bank ma’lumotlaringizni qabul qilmaydi va saqlamaydi."} /></span></p>
    </section>
  );
}
