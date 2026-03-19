'use client';

import { Github, Mail, Sparkles } from "lucide-react";

import Link from "next/link";
import { useLanguage } from '@/i18n/LanguageProvider';

// Category ID to translation key mapping
const categoryKeyMap: Record<string, string> = {
  chat: 'chat',
  image: 'image',
  writing: 'writing',
  video: 'video',
  audio: 'audio',
  code: 'code',
  productivity: 'productivity',
  design: 'design',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const quickLinks = [
    { id: 'chat', href: '/category/chat' },
    { id: 'image', href: '/category/image' },
    { id: 'code', href: '/category/code' },
  ];

  const moreCategories = [
    { id: 'writing', href: '/category/writing' },
    { id: 'video', href: '/category/video' },
    { id: 'audio', href: '/category/audio' },
    { id: 'productivity', href: '/category/productivity' },
  ];

  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='md:col-span-1'>
            <Link href='/' className='flex items-center gap-2 mb-4'>
              <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                <Sparkles className='w-5 h-5 text-white' />
              </div>
              <span className='text-xl font-bold text-white'>{t('footer.slogan')}</span>
            </Link>
            <p className='text-sm text-gray-400 mb-4'>
              {t('footer.description')}
            </p>
            <div className='flex items-center gap-4'>
              <a
                href='https://github.com/liufansizhe/AI-Tool/issues'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <Github className='w-5 h-5' />
              </a>
              <a
                href='mailto:651828515@qq.com'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <Mail className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-white font-semibold mb-4'>{t('footer.links.title')}</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/' className='hover:text-white transition-colors'>
                  {t('footer.links.home')}
                </Link>
              </li>
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className='hover:text-white transition-colors'
                  >
                    {t(`categories.${categoryKeyMap[link.id]}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className='text-white font-semibold mb-4'>{t('footer.moreCategories')}</h3>
            <ul className='space-y-2 text-sm'>
              {moreCategories.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className='hover:text-white transition-colors'
                  >
                    {t(`categories.${categoryKeyMap[link.id]}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className='text-white font-semibold mb-4'>{t('nav.about')}</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/about'
                  className='hover:text-white transition-colors'
                >
                  {t('footer.links.about')}
                </Link>
              </li>
              <li>
                <Link
                  href='/about#contact'
                  className='hover:text-white transition-colors'
                >
                  {t('footer.links.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className='border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-gray-500'>
            © {currentYear} {t('footer.slogan')}. {t('footer.copyright')}.
          </p>
          <p className='text-sm text-gray-500'>
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
