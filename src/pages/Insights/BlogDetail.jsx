import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const rawPost = BLOG_POSTS.find(p => p.id === id);

  if (!rawPost) {
    return (
      <div className="bg-white min-h-screen text-black flex items-center justify-center px-[4%]">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase tracking-tight mb-4">Entry not found</h1>
          <button
            onClick={() => navigate('/resources/blogs')}
            className="text-black font-medium uppercase tracking-widest text-sm hover:underline underline-offset-4"
          >
            ← Back to Journal
          </button>
        </div>
      </div>
    );
  }

  const post = {
    ...rawPost,
    title: t(`insights_content.blogData.${rawPost.id}.title`, rawPost.title),
    overview: t(`insights_content.blogData.${rawPost.id}.overview`, rawPost.overview),
    author: t(`insights_content.blogData.${rawPost.id}.author`, rawPost.author),
    role: t(`insights_content.blogData.${rawPost.id}.role`, rawPost.role),
    content: t(`insights_content.blogData.${rawPost.id}.content`, rawPost.content),
    date: t(`insights_content.blogData.${rawPost.id}.date`, rawPost.date),
    category: t(`insights_content.blogData.${rawPost.id}.category`, rawPost.category)
  };

  // Find 3 related posts (prefer same category, exclude current)
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id)
    .sort((a, b) => (a.category === post.category ? -1 : 1))
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen text-black pb-16">
      
      {/* HERO SECTION */}
      <div className="w-full px-[4%] max-w-[1200px] mx-auto pt-32 md:pt-48 pb-12 border-b border-black/10">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/resources/blogs')}
          className="flex items-center gap-2 text-black text-sm font-bold tracking-widest uppercase mb-12 hover:underline underline-offset-4 transition-all"
        >
          <ArrowLeft size={16} />
          {t("insights_content.details.backToBlogs", "Back to Journal")}
        </motion.button>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-black mb-6">
            <span>{post.category}</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full" />
            <span className="text-neutral-500">{post.date}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight text-black mb-8">
            {post.title}
          </h1>
        </motion.div>
      </div>

      {/* CONTENT LAYOUT */}
      <div className="w-full px-[4%] max-w-[1200px] mx-auto py-16 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* MAIN ARTICLE */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-2/3"
        >
          {/* Main Image */}
          <div className="w-full aspect-[16/9] bg-neutral-100 mb-16 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
            />
          </div>

          {/* Article Body */}
          <div className="text-lg text-neutral-600 leading-relaxed font-light space-y-8">
            <p className="text-2xl md:text-3xl font-normal text-black leading-snug mb-12">
              {post.overview}
            </p>
            
            <p className="text-lg md:text-xl text-black">
              {post.content}
            </p>

            {/* Generated Mock Content to simulate a long blog post */}
            <h2 className="text-2xl md:text-3xl font-normal text-black mt-16 mb-8 uppercase tracking-tight">
              The Structural Deep Dive
            </h2>
            
            <p>
              In modern engineering, the convergence of scalable architectures and localized optimization is paramount. When addressing the core challenges of {post.category.toLowerCase()}, the development lifecycle requires continuous integration of robust, fail-safe paradigms.
            </p>
            <p>
              By leveraging advanced methodologies, we can bypass traditional bottlenecks. {post.content.split('. ')[0]}. This naturally leads to an ecosystem where performance limitations are mitigated through proactive architectural forecasting and rigorous testing protocols.
            </p>

            <blockquote className="border-l-4 border-black pl-8 py-4 my-16 text-2xl md:text-4xl font-normal text-black leading-tight">
              "The complexity of {post.category.toLowerCase()} systems is not just in the design, but in the seamless execution of scalable models across global infrastructures."
            </blockquote>

            <h2 className="text-2xl md:text-3xl font-normal text-black mt-16 mb-8 uppercase tracking-tight">
              Key Architectural Considerations
            </h2>
            
            <p>
              Successfully navigating these technological shifts requires an unyielding focus on foundational principles. As systems grow in complexity, our teams at UANDWE prioritize three critical dimensions:
            </p>

            <ul className="list-disc pl-6 space-y-4 my-8">
              <li>
                <strong className="text-black font-medium">Deterministic Execution:</strong> The reliance on highly distributed infrastructure introduces unpredictable latency spikes. Localized execution and strict bounding ensure real-time reliability.
              </li>
              <li>
                <strong className="text-black font-medium">Thermal & Power Envelopes:</strong> In intensive {post.category.toLowerCase()} environments, managing physical and thermal constraints is just as critical as raw compute power. Efficiency dictates scalability.
              </li>
              <li>
                <strong className="text-black font-medium">Protocol Synergy:</strong> Legacy frameworks must be elegantly bridged with next-generation interconnects to maintain backwards compatibility while massively scaling throughput.
              </li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-normal text-black mt-16 mb-8 uppercase tracking-tight">
              Future Implications
            </h2>
            
            <p>
              As we push the boundaries of what is technically feasible, our methodologies must continually adapt. The integration of next-generation hardware and software pipelines will force a rapid recalibration of industry standards. By focusing strictly on fundamental physical and software limits, engineering teams can unlock unprecedented efficiencies that were previously deemed impossible.
            </p>
            
            <p>
              Ultimately, the work spearheaded by domain experts like {post.author} demonstrates that the path forward requires both rigorous analytical frameworks and bold, visionary structural choices. The evolution of this space will undoubtedly dictate the pace of technological advancement for the next decade.
            </p>
          </div>
        </motion.article>

        {/* SIDEBAR */}
        <motion.aside 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-1/3"
        >
          <div className="sticky top-32 border border-black/10 p-10 flex flex-col items-center text-center bg-neutral-50">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-8 w-full text-left border-b border-black/10 pb-4">
              Written By
            </div>
            
            <div className="w-32 h-32 rounded-full bg-white border border-black/10 flex items-center justify-center text-4xl font-normal text-black mb-6">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            
            <h3 className="text-2xl font-normal text-black mb-2">{post.author}</h3>
            <p className="text-neutral-500 font-light text-sm uppercase tracking-wider">{post.role}</p>
            
            <div className="w-full h-px bg-black/10 my-8" />
            
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              {post.author} is a leading expert at UANDWE specializing in high-performance {post.category.toLowerCase()} architectures and scalable engineering solutions.
            </p>
          </div>
        </motion.aside>

      </div>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <div className="w-full px-[4%] max-w-[1200px] mx-auto pt-24 pb-16 border-t border-black/10">
          <h2 className="text-3xl font-normal text-black uppercase tracking-tight mb-12">
            Related Journal Entries
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {relatedPosts.map((relatedPost) => (
              <motion.div
                key={relatedPost.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onClick={() => navigate(`/resources/blogs/${relatedPost.id}`)}
                className="group cursor-pointer flex flex-col h-full"
              >
                {/* Image Container with Grayscale-to-Color hover effect */}
                <div className="relative overflow-hidden w-full bg-neutral-100 aspect-[4/3] mb-6">
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-black mb-4">
                    <span>{t(`insights_content.blogData.${relatedPost.id}.category`, relatedPost.category)}</span>
                    <span className="w-1 h-1 bg-black rounded-full" />
                    <span className="text-neutral-500">{t(`insights_content.blogData.${relatedPost.id}.date`, relatedPost.date)}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-normal leading-tight text-black mb-4 group-hover:underline decoration-1 underline-offset-4 decoration-black/0 group-hover:decoration-black transition-all duration-300">
                    {t(`insights_content.blogData.${relatedPost.id}.title`, relatedPost.title)}
                  </h3>

                  <p className="text-sm mb-6 text-neutral-500 font-light leading-relaxed line-clamp-3">
                    {t(`insights_content.blogData.${relatedPost.id}.overview`, relatedPost.overview)}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-4">
                    <div className="text-sm font-medium text-black uppercase tracking-wider">
                      By {t(`insights_content.blogData.${relatedPost.id}.author`, relatedPost.author)}
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-black/20 group-hover:bg-black group-hover:text-white transition-all duration-300 shrink-0">
                      <ArrowUpRight size={18} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
