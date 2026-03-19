import { Github, Mail, Sparkles, Target, Users } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AboutPage() {
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
              关于 AI工具箱
            </h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              我们致力于帮助用户发现最实用的 AI 工具，让每个人都能享受 AI
              带来的便利
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
                  我们的使命
                </h3>
                <p className='text-gray-600'>
                  帮助用户快速找到合适的 AI 工具，提升工作和创作效率
                </p>
              </div>

              <div className='text-center p-8 bg-white rounded-2xl border border-gray-100'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4'>
                  <Users className='w-6 h-6 text-green-600' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  服务对象
                </h3>
                <p className='text-gray-600'>
                  面向所有希望使用 AI 工具提升效率的个人用户和企业团队
                </p>
              </div>

              <div className='text-center p-8 bg-white rounded-2xl border border-gray-100'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4'>
                  <Sparkles className='w-6 h-6 text-purple-600' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  核心价值
                </h3>
                <p className='text-gray-600'>
                  精选优质工具、提供准确信息、保持及时更新
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className='py-16 bg-gray-50'>
          <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                为什么选择我们？
              </h2>
              <div className='space-y-6 text-gray-600'>
                <p>
                  在 AI 工具爆发的时代，每天都会有新的 AI
                  产品出现。面对琳琅满目的选择，
                  很多用户会感到困惑：哪个工具适合我？哪个更好用？是否免费？
                </p>
                <p>
                  AI工具箱就是为了解决这些问题而诞生的。我们精心筛选全球优质的
                  AI 工具，
                  按照分类整理，标注清晰的价格信息，让你能够快速找到最适合自己的工具。
                </p>
                <p>
                  我们的目标是成为最值得信赖的 AI 工具导航站，帮助每一位用户在
                  AI 时代 提升效率、释放创造力。
                </p>
              </div>

              <h2 className='text-2xl font-bold text-gray-900 mb-6 mt-12'>
                收录标准
              </h2>
              <ul className='space-y-3 text-gray-600'>
                <li className='flex items-start gap-3'>
                  <span className='w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0'>
                    1
                  </span>
                  <span>工具必须实际可用，不接受仅处于概念阶段的产品</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0'>
                    2
                  </span>
                  <span>优先收录有实际用户价值和良好口碑的工具</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0'>
                    3
                  </span>
                  <span>保持信息更新，定期核实工具状态</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0'>
                    4
                  </span>
                  <span>提供客观准确的价格和功能信息</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id='contact' className='py-16'>
          <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>联系我们</h2>
            <p className='text-gray-600 mb-8'>
              有任何建议或合作意向？欢迎通过以下方式联系我们
            </p>
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
