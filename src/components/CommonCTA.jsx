import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CommonCTA = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', description: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ name: '', email: '', description: '' });
        // Handle form submission logic here
    };

    return (
        <section id="cta-section" className="relative bg-[#0a0a0f] pt-24 pb-32 px-[4%] md:px-[5%] overflow-hidden">
            {/* Cinematic Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                {/* The main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                    
                    {/* Left Big Bento Box - Typography */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-6 flex flex-col justify-center p-10 md:p-14 lg:p-16 rounded-[2.5rem] bg-[#13131a] border border-white/5 relative overflow-hidden group min-h-[400px]"
                    >
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="absolute -left-[20%] top-1/2 -translate-y-1/2 w-[50%] h-[80%] bg-primary/10 blur-[100px] group-hover:bg-primary/20 transition-colors duration-700" />
                        
                        <h2 className="relative z-10 text-[clamp(2rem,4.5vw,4rem)] font-semibold text-white mb-8 tracking-tight leading-[1.15]">
                            {t("cta.ready_to", "Ready to")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300 drop-shadow-[0_0_20px_rgba(244,123,32,0.3)]">{t("cta.accelerate", "Accelerate")}</span> {t("cta.your_innovation", "Your Innovation?")}
                        </h2>
        
                        <p className="relative z-10 text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed">
                            {t("cta.description", "Partner with our world-class engineering teams to turn your most complex technical challenges into market-leading solutions.")}
                        </p>
                    </motion.div>

                    {/* Right Side Stack - Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="lg:col-span-6 flex flex-col justify-center p-10 md:p-12 rounded-[2.5rem] bg-[#111116] border border-white/10 relative shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)]"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight relative z-10">
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400">
                                {t("cta.form.title", "Let's Build the Future.")}
                            </span>
                        </h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-6 text-left relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2">{t("cta.form.name", "Name")}</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-5 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white focus:outline-none focus:bg-white/[0.06] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-neutral-600 shadow-inner shadow-black/20"
                                        placeholder={t("cta.form.name_placeholder", "John Doe")}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2">{t("cta.form.email", "Email")}</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-5 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white focus:outline-none focus:bg-white/[0.06] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-neutral-600 shadow-inner shadow-black/20"
                                        placeholder={t("cta.form.email_placeholder", "john@company.com")}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">{t("cta.form.description", "Project Details")}</label>
                                <textarea 
                                    required
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full px-5 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white focus:outline-none focus:bg-white/[0.06] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-neutral-600 resize-none shadow-inner shadow-black/20"
                                    placeholder={t("cta.form.description_placeholder", "Tell us about your goals...")}
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full mt-4 py-4 bg-gradient-to-br from-[#ff9f5a] to-[#ff7a22] hover:scale-[1.02] active:scale-[0.98] text-white rounded-2xl font-medium transition-all flex items-center justify-center gap-2 group"
                            >
                                {t("cta.form.submit", "Initialize Project")}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CommonCTA;
