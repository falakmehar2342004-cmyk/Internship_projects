import { createContext, useContext, useLayoutEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);
const ar = {
  "Home":"الرئيسية", "About":"من نحن", "About Us":"من نحن", "Services":"الخدمات", "Contact Us":"اتصل بنا", "Privacy":"الخصوصية", "Privacy Policy":"سياسة الخصوصية",
  "Start free trial":"ابدأ التجربة المجانية", "Start Free Trial":"ابدأ التجربة المجانية", "English":"الإنجليزية", "Saudi Arabia":"السعودية", "Saudi":"السعودية", "Call us":"اتصل بنا", "Main Menu":"القائمة الرئيسية", "Legal & Rules":"الشؤون القانونية", "Direct Email":"البريد الإلكتروني", "Pakistan Office":"مكتب باكستان", "Saudi Arabia Office":"مكتب المملكة العربية السعودية", "All regional systems operational":"جميع الأنظمة الإقليمية تعمل", "Built for Pakistan & Saudi Arabia":"مصمم لباكستان والمملكة العربية السعودية", "How It Works":"كيف نعمل", "Pricing":"الأسعار", "Blog":"المدونة", "Contact":"التواصل", "Get in touch":"تواصل معنا", "Send Message":"إرسال الرسالة", "Name":"الاسم", "Email":"البريد الإلكتروني", "Message":"الرسالة", "Submit":"إرسال", "Learn More":"اعرف المزيد", "Read More":"اقرأ المزيد", "Get Started":"ابدأ الآن", "All rights reserved.":"جميع الحقوق محفوظة.", "Switch to dark theme":"التبديل إلى الوضع الداكن", "Switch to light theme":"التبديل إلى الوضع الفاتح"
};
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => { try { return localStorage.getItem("nexmeg-language") || "en"; } catch { return "en"; } });
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = language === "ar" ? "ar-SA" : "en";
    root.dir = language === "ar" ? "rtl" : "ltr";
    root.dataset.language = language;
    try { localStorage.setItem("nexmeg-language", language); } catch { /* storage unavailable */ }
  }, [language]);
  const value = useMemo(() => ({ language, setLanguage, isArabic: language === "ar", t: (value) => language === "ar" ? (ar[value] || value) : value }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { const value = useContext(LanguageContext); if (!value) throw new Error("useLanguage must be used inside LanguageProvider"); return value; }
