import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InstallExperience from '@/components/install/InstallExperience';
import InstallVideo from '@/components/install/InstallVideo';
import styles from '@/components/install/Install.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) === 'de' ? 'de' : 'uz';
  return {
    title: locale === 'de' ? 'UzDe installieren' : 'UzDe ilovasini o‘rnatish',
    description: locale === 'de' ? 'UzDe auf dem iPhone oder Android-Startbildschirm hinzufügen.' : 'UzDe’ni iPhone yoki Android bosh ekraniga qo‘shish bo‘yicha qo‘llanma.',
    alternates: { canonical: `/${locale}/install`, languages: { uz: '/uz/install', de: '/de/install' } },
  };
}
export default async function InstallPage() {
  const locale = (await getLocale()) === 'de' ? 'de' : 'uz';
  return <div className={styles.surface}><Header/><main className={styles.page}><InstallExperience locale={locale}/><InstallVideo de={locale === 'de'}/></main><Footer/></div>;
}
