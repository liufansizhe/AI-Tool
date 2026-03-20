"use client";

import { Github, Mail, Sparkles, Target, Users } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className='flex-1'>
        {/* Hero */}
        <section className='bg-gradient-to-b from-blue-50 to-white py-16 md:py-24'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6'>
              <Sparkles className='w-8 h-8 text-blue-600' />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              {t("about.title")}
            </h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              {t("about.subtitle")}
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className='py-16'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center p-8 bg-white rounded-2xl border border-gray-100'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4'>
                  <Target className='w-6 h-6 text-blue-600' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {t("about.mission")}
                </h3>
                <p className='text-gray-600'>{t("about.missionDesc")}</p>
              </div>

              <div className='text-center p-8 bg-white rounded-2xl border border-gray-100'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4'>
                  <Users className='w-6 h-6 text-green-600' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {t("about.audience")}
                </h3>
                <p className='text-gray-600'>{t("about.audienceDesc")}</p>
              </div>

              <div className='text-center p-8 bg-white rounded-2xl border border-gray-100'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4'>
                  <Sparkles className='w-6 h-6 text-purple-600' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {t("about.values")}
                </h3>
                <p className='text-gray-600'>{t("about.valuesDesc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className='py-16 bg-gray-50'>
          <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                {t("about.whyUs")}
              </h2>
              <div className='space-y-6 text-gray-600'>
                <p>{t("about.whyUsP1")}</p>
                <p>{t("about.whyUsP2")}</p>
                <p>{t("about.whyUsP3")}</p>
              </div>

              <h2 className='text-2xl font-bold text-gray-900 mb-6 mt-12'>
                {t("about.criteria")}
              </h2>
              <ul className='space-y-3 text-gray-600'>
                {(["1", "2", "3", "4"] as const).map((n) => (
                  <li key={n} className='flex items-start gap-3'>
                    <span className='w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0'>
                      {n}
                    </span>
                    <span>{t(`about.criteria${n}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id='contact' className='py-16'>
          <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>
              {t("about.contact")}
            </h2>
            <p className='text-gray-600 mb-8'>{t("about.contactDesc")}</p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <a
                href='mailto:651828515@qq.com'
                className='inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-colors'
              >
                <Mail className='w-5 h-5' />
                contact@aitools.com
              </a>
              <a
                href='https://github.com/liufansizhe/AI-Tool/issues'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-colors'
              >
                <Github className='w-5 h-5' />
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
