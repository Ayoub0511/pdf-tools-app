import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <nav>
          <LanguageSwitcher />
        </nav>
        {children}
      </body>
    </html>
  );
}