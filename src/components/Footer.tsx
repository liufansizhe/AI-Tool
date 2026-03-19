import { Github, Mail, Sparkles } from "lucide-react";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
              <span className='text-xl font-bold text-white'>AI工具箱</span>
            </Link>
            <p className='text-sm text-gray-400 mb-4'>
              发现最实用的 AI 工具，帮你提升工作效率，释放创造力。
            </p>
            <div className='flex items-center gap-4'>
              <a
                href='https://github.com'
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
            <h3 className='text-white font-semibold mb-4'>快速链接</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/' className='hover:text-white transition-colors'>
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href='/category/chat'
                  className='hover:text-white transition-colors'
                >
                  AI 对话
                </Link>
              </li>
              <li>
                <Link
                  href='/category/image'
                  className='hover:text-white transition-colors'
                >
                  AI 绘画
                </Link>
              </li>
              <li>
                <Link
                  href='/category/code'
                  className='hover:text-white transition-colors'
                >
                  编程助手
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className='text-white font-semibold mb-4'>更多分类</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/category/writing'
                  className='hover:text-white transition-colors'
                >
                  AI 写作
                </Link>
              </li>
              <li>
                <Link
                  href='/category/video'
                  className='hover:text-white transition-colors'
                >
                  AI 视频
                </Link>
              </li>
              <li>
                <Link
                  href='/category/audio'
                  className='hover:text-white transition-colors'
                >
                  AI 音频
                </Link>
              </li>
              <li>
                <Link
                  href='/category/productivity'
                  className='hover:text-white transition-colors'
                >
                  效率工具
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className='text-white font-semibold mb-4'>关于</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/about'
                  className='hover:text-white transition-colors'
                >
                  关于我们
                </Link>
              </li>
              <li>
                <Link
                  href='/submit'
                  className='hover:text-white transition-colors'
                >
                  提交工具
                </Link>
              </li>
              <li>
                <Link
                  href='/about#contact'
                  className='hover:text-white transition-colors'
                >
                  联系我们
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className='border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-gray-500'>
            © {currentYear} AI工具箱. All rights reserved.
          </p>
          <p className='text-sm text-gray-500'>
            本站所有工具链接仅供参考，请以各工具官网信息为准
          </p>
        </div>
      </div>
    </footer>
  );
}
