import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import america from "../assets/images/america.png";
import india from "../assets/images/india.png";
import china from "../assets/images/china.png";


export default function ContactUs() {
  const { t } = useTranslation();
  const [activeRegion, setActiveRegion] = useState("AMERICA");

  const regions = ["AMERICA", "INDIA", "CHINA"];

  const regionData = {
    AMERICA: {
      label: "REGION_ALPHA_US",
      city: t("contact.locations.america.city"),
      address: [t("contact.locations.america.address_1"), t("contact.locations.america.address_2"), t("contact.locations.america.address_3")].filter(Boolean),
      mapLink: "https://www.google.com/maps?q=2535+Amaryl+Dr+San+Jose",
      image: america,
      dot: { cx: 150, cy: 90 },
    },
    INDIA: {
      label: "REGION_ALPHA_IN",
      city: t("contact.locations.india.city"),
      address: [t("contact.locations.india.address_1"), t("contact.locations.india.address_2"), t("contact.locations.india.address_3")].filter(Boolean),
      mapLink: "https://www.google.com/maps?q=Novel+MSR+Building+Marathahalli+Bangalore",
      image: india,
      dot: { cx: 430, cy: 95 },
    },
    CHINA: {
      label: "REGION_ALPHA_CN",
      city: t("contact.locations.china.city"),
      address: [t("contact.locations.china.address_1"), t("contact.locations.china.address_2"), t("contact.locations.china.address_3")].filter(Boolean),
      mapLink: "https://www.google.com/maps?q=Zhangjiang+Road+665+Shanghai",
      image: china,
      dot: { cx: 490, cy: 78 },
    },
  };

  const active = regionData[activeRegion];

  return (
    <section className="relative w-full bg-bg text-neutral-900 px-4 sm:px-6 md:px-[5%] pt-12 pb-12 sm:pt-16 sm:pb-16 2xl:pt-14 2xl:pb-14 2xl:min-h-screen 2xl:min-h-[100dvh] 2xl:flex 2xl:flex-col 2xl:justify-between">
      <SectionHeading
        titlePart1={t("contact.heading_1")}
        titlePart2={t("contact.heading_2")}
        className="w-full mx-auto !mb-6 md:!mb-8 2xl:!mb-8 2xl:flex-shrink-0"
      />


      <div className="w-full mx-auto 2xl:flex-1 2xl:h-full grid lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 2xl:gap-8 2xl:items-stretch overflow-hidden">
        {/* LEFT MAP PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl sm:rounded-2xl 2xl:rounded-[2rem] border border-gray-200 bg-bg overflow-hidden flex flex-col 2xl:h-full 2xl:min-h-[72vh] justify-between shadow-lg"
        >
          {/* REGION SWITCH */}
          <div className="flex justify-end px-4 sm:px-5 2xl:px-8 py-3 sm:py-4 2xl:py-5 border-b border-gray-100 w-full bg-gray-50/50">
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className={`px-3 sm:px-4 2xl:px-5 py-1.5 2xl:py-2 rounded-full text-[10px] sm:text-[11px] 2xl:text-xs font-semibold cursor-pointer tracking-wide border transition-all duration-300 whitespace-nowrap ${activeRegion === r
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/25"
                    : "border-gray-200 text-neutral-600 hover:border-primary hover:text-primary hover:bg-primary/10"
                    }`}
                >
                  {t(`contact.locations.${r.toLowerCase()}.name`)}
                </button>
              ))}
            </div>
          </div>

          {/* MAP IMAGE (CLICKABLE) */}
          <div
            onClick={() => window.open(active.mapLink, "_blank")}
            className="relative w-full flex-1 min-h-[250px] md:min-h-[300px] 2xl:min-h-[420px] cursor-pointer group bg-gray-100"
          >
            <img
              src={active.image}
              alt="map"
              className="w-full h-full object-cover brightness-[0.9] contrast-[1] group-hover:brightness-[1.02] transition-all duration-500 ease-out"
            />
          </div>

          {/* INFO */}
          <div className="px-4 sm:px-5 2xl:px-8 py-3 sm:py-4 2xl:py-6 border-t border-gray-100 bg-gray-50/60">

            <p className="text-black font-bold mt-1 text-sm sm:text-base 2xl:text-lg">
              {active.city}
            </p>

            <div className="mt-1 2xl:mt-2 space-y-0.5 2xl:space-y-1">
              {active.address.map((line, i) => (
                <p key={i} className="text-neutral-500 text-xs sm:text-sm 2xl:text-base">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative rounded-xl sm:rounded-2xl 2xl:rounded-[2rem] border border-gray-200 bg-bg p-5 sm:p-7 md:p-8 2xl:p-12 overflow-hidden flex flex-col justify-between 2xl:h-full 2xl:min-h-[72vh] shadow-lg"
        >
          {/* subtle glow */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500
            bg-[radial-gradient(circle_at_80%_20%,rgba(244,123,32,0.06),transparent_60%)] pointer-events-none"
          />

          <h2 className="text-black text-center font-bold text-lg sm:text-xl 2xl:text-2xl mb-4 sm:mb-6 2xl:mb-8 tracking-tight">
            {t("contact.form_title")}
          </h2>

          <div className="space-y-3 sm:space-y-4 2xl:space-y-6 flex-1 flex flex-col justify-center">
            {/* NAME */}
            <div>
              <label className="text-xs sm:text-sm 2xl:text-base text-neutral-500 tracking-wider mb-1.5 sm:mb-2 block uppercase font-medium">
                {t("contact.name")}
              </label>
              <input
                type="text"
                placeholder={t("contact.name_placeholder")}
                className="w-full px-3 sm:px-4 2xl:px-5 py-2.5 sm:py-3 2xl:py-4 bg-gray-50 border border-gray-200 rounded-lg
                text-black placeholder-gray-400 text-xs sm:text-sm 2xl:text-base
                focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                transition-all duration-300"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-xs sm:text-sm 2xl:text-base text-neutral-500 tracking-wider mb-1.5 sm:mb-2 block uppercase font-medium">
                {t("contact.email")}
              </label>
              <input
                type="email"
                placeholder={t("contact.email_placeholder")}
                className="w-full px-3 sm:px-4 2xl:px-5 py-2.5 sm:py-3 2xl:py-4 bg-gray-50 border border-gray-200 rounded-lg
                text-black placeholder-gray-400 text-xs sm:text-sm 2xl:text-base
                focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                transition-all duration-300"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-xs sm:text-sm 2xl:text-base text-neutral-500 tracking-wider mb-1.5 sm:mb-2 block uppercase font-medium">
                {t("contact.message")}
              </label>
              <textarea
                rows={4}
                placeholder={t("contact.message_placeholder")}
                className="w-full px-3 sm:px-4 2xl:px-5 py-2.5 sm:py-3 2xl:py-4 bg-gray-50 border border-gray-200 rounded-lg
                text-black placeholder-gray-400 text-xs sm:text-sm 2xl:text-base
                focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                transition-all duration-300 resize-none"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            className="
            mt-6 sm:mt-7 md:mt-8 2xl:mt-10 w-full py-3 sm:py-3.5 md:py-4 2xl:py-4.5 rounded-full font-semibold tracking-wide text-sm sm:text-base 2xl:text-lg
            bg-primary hover:bg-primary/85
            text-white
            transition-all duration-300
            hover:-translate-y-[2px]
            active:translate-y-0
            "
          >
            {t("contact.send_button")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}