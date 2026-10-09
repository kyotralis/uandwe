import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';
import { NEWS_ARTICLES } from '../../data/newsData';
import { ExpandableCard } from '../../components/ui/ExpandableCard';

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = NEWS_ARTICLES.find(a => a.id === id);

  const handleBack = () => {
    sessionStorage.setItem("returnToSection", "news-insights");
    navigate(-1);
  };

  if (!article) {
    return (
      <div className="bg-white min-h-screen text-neutral-900 flex items-center justify-center px-[4%]">
        <div className="text-center">
          <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-normal text-neutral-900 mb-4">Article not found</h1>
          <button
            onClick={handleBack}
            className="text-[#ff6b1a] text-lg underline underline-offset-4 hover:text-orange-300 transition-colors cursor-pointer"
          >
            ← Back to News & Insights
          </button>
        </div>
      </div>
    );
  }

  const cards = article.cards || [
    {
      id: "default-1",
      title: article.title,
      description: article.category,
      image: article.image,
      sections: [
        {
          heading: "Overview",
          body: article.desc
        },
        ...article.content.split('\n\n').map((paragraph, idx) => ({
          heading: idx === 0 ? "Key Highlights" : `Development Phase ${idx}`,
          body: paragraph
        }))
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen text-neutral-900 pt-28 sm:pt-32 pb-24 relative overflow-x-hidden">
      
      {/* Background ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#ff6b1a]/10 blur-[160px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-blue-500/5 blur-[160px] rounded-full mix-blend-screen" />
      </div>

      {/* Back button (Only Arrow Icon, matching px-[4%]) */}
      <div className="relative z-20 w-full px-[4%] mb-8">
        <button
          onClick={handleBack}
          className="w-11 h-11 flex items-center justify-center text-neutral-600 hover:text-[#ff6b1a] transition-all duration-300 bg-neutral-50 hover:bg-[#ff6b1a]/10 rounded-full backdrop-blur-md border border-neutral-200 hover:border-[#ff6b1a]/50 group cursor-pointer"
          aria-label="Back to News & Insights"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Content Container (Matching About.jsx px-[4%]) */}
      <div className="relative z-10 w-full px-[4%]">
        
        {/* HERO SECTION */}
        <section className="mb-14 sm:mb-18">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 tracking-tight mb-6 leading-[1.15]"
          >
            {article.category.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-[#ff6b1a]">{article.category.split(' ').slice(-1)}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl font-light text-neutral-900/75 leading-relaxed max-w-4xl"
          >
            {article.desc}
          </motion.p>
        </section>

        {/* INTERACTIVE EXPANDABLE CARDS SECTION */}
        <section className="mt-12 sm:mt-16 pt-10 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
                Latest {article.category.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-[#ff6b1a]">{article.category.split(' ').slice(-1)}</span>
              </h2>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 sm:gap-8 w-full">
            {cards.map((card, idx) => (
              <ExpandableCard
                key={card.id || idx}
                title={card.title}
                src={card.image}
                description={card.description}
                classNameExpanded="[&_h4]:text-[#ff6b1a] [&_h4]:font-semibold [&_h4]:text-lg sm:[&_h4]:text-xl [&_h4]:mt-6 [&_h4]:mb-2 [&_p]:text-neutral-700 [&_p]:text-sm sm:[&_p]:text-base [&_p]:leading-relaxed"
              >
                {card.sections ? (
                  card.sections.map((section, sIdx) => (
                    <div key={sIdx} className="w-full">
                      <h4 className="text-lg sm:text-xl font-semibold text-[#ff6b1a] mt-4 mb-2">
                        {section.heading}
                      </h4>
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-light">
                        {section.body}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-light">
                    {article.content}
                  </p>
                )}
              </ExpandableCard>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
