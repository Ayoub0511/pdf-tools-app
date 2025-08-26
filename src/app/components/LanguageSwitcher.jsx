'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e) => {
    const newLocale = e.target.value;
    const newPath = `/${newLocale}${pathname.substring(3)}`;
    router.push(newPath);
  };

  const currentLang = pathname.startsWith('/en') ? 'en' : 'ar';

  return (
    <select onChange={handleChange} value={currentLang}>
      <option value="ar">العربية</option>
      <option value="en">English</option>
    </select>
  );
}