import { useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";

const translations = {
  "The Story Behind Customer Respect & Regional Precision": "القصة وراء احترام العملاء والدقة الإقليمية", "Zero Spam Routes": "مسارات خالية من الرسائل المزعجة", "Verified Delivery": "توصيل موثوق",
  "Multi-Channel": "متعدد القنوات", "Infrastructure": "البنية التحتية", "Pure Trust": "ثقة كاملة",
  "AI Growth": "النمو بالذكاء الاصطناعي", "WhatsApp, SMS & Email unified": "واتساب والرسائل النصية والبريد الإلكتروني في منصة واحدة", "Direct PK & KSA Telecom Engine": "محرك اتصالات مباشر لباكستان والسعودية",
  "Saudi PDPL & PTA Compliant": "متوافق مع نظام حماية البيانات السعودي وهيئة الاتصالات الباكستانية", "Smart segments & journeys": "شرائح ورحلات ذكية", "Our story": "قصتنا",
  "Our Mission": "مهمتنا", "Make marketing simple, measurable and customer-friendly.": "نجعل التسويق بسيطاً وقابلاً للقياس ومتمحوراً حول العميل.", "THE PEOPLE BEHIND nExMeg": "الفريق وراء nExMeg", "Meet our team": "تعرف على فريقنا",
  "Experienced minds. Structured solutions. Sustainable results.": "خبرات متميزة، وحلول منظمة، ونتائج مستدامة.", "Institutional Compliance & Direct Trust": "الامتثال المؤسسي والثقة المباشرة", "Privacy by Design": "الخصوصية في صميم التصميم",
  "Saudi PDPL Compliant": "متوافق مع نظام حماية البيانات الشخصية السعودي", "Pakistan Data Rules": "قواعد حماية البيانات الباكستانية", "Everything You Need to": "كل ما تحتاج إليه",
  "Reach, Convert": "للوصول والتحويل", "Explore Channels": "استكشف القنوات", "Book Architecture Demo": "احجز عرضاً توضيحياً للبنية التقنية",
  "Our Services": "خدماتنا", "Engineered for High-Conversion Scale": "مصممة لتحقيق تحويلات عالية وعلى نطاق واسع", "Campaign Builder": "منشئ الحملات",
  "Visual Node Engine": "محرك مرئي لسير العمل", "Automatic Fallback": "التحويل الاحتياطي التلقائي", "Audience Segments": "شرائح الجمهور",
  "Intelligent Scheduling": "جدولة ذكية", "Live Real-Time Analytics": "تحليلات مباشرة وفورية", "Unified Shared Inbox": "صندوق وارد موحد ومشترك",
  "Infrastructure Channels": "قنوات البنية التحتية", "Direct Multi-Channel Distribution": "توزيع مباشر متعدد القنوات", "Official Cloud API": "واجهة برمجة التطبيقات السحابية الرسمية",
  "WhatsApp Business": "واتساب للأعمال", "Automated Email": "بريد إلكتروني آلي", "Social Messaging": "مراسلة اجتماعية",
  "Conversion Ads": "إعلانات التحويل", "Vertical Specialization": "تخصص حسب القطاع", "Tuned for Regional Commerce": "مهيأة للتجارة الإقليمية",
  "Restaurants & Food": "المطاعم والأغذية", "Retail & Fashion": "التجزئة والأزياء", "E-Commerce & D2C": "التجارة الإلكترونية والبيع المباشر",
  "AI Command Center & Audience Engine": "مركز أوامر الذكاء الاصطناعي ومحرك الجمهور", "Consent-First Audience Hub": "مركز جمهور قائم على الموافقة أولاً", "Mail Us 24/7": "راسلنا على مدار الساعة",
  "Our Locations": "مواقعنا", "Call Us 24/7": "اتصل بنا على مدار الساعة", "Working Hours": "ساعات العمل",
  "About Us": "من نحن", "Happy to Answer All Your Questions": "يسعدنا الإجابة عن جميع أسئلتك", "Infrastructure Hub": "مركز البنية التحتية",
  "Feedback Form": "نموذج الملاحظات", "Do you have questions?": "هل لديك أي أسئلة؟", "Submit Query": "إرسال الاستفسار",
  "Query Received!": "تم استلام استفسارك!", "Send Another Message": "إرسال رسالة أخرى", "Frequently Asked Questions": "الأسئلة الشائعة",
  "Everything You Need to Know": "كل ما تحتاج إلى معرفته", "Creating": "نبتكر عوالم", "Digital": "رقمية",
  "Connect every customer everywhere": "تواصل مع كل عميل في كل مكان", "Book a demo": "احجز عرضاً توضيحياً", "How It Works": "كيف نعمل",
  "Connect your channels": "اربط قنواتك", "Build your campaign": "أنشئ حملتك", "Track and grow": "تابع الأداء ونمّ أعمالك",
  "Instant sync": "مزامنة فورية", "Smart templates included": "قوالب ذكية مدمجة", "Real-time reporting": "تقارير فورية",
  "Features": "المميزات", "Everything to grow,": "كل ما تحتاجه للنمو،", "nothing": "دون تعقيد",
  "Multi-channel campaigns": "حملات متعددة القنوات", "Smart audiences": "جماهير ذكية", "AI automation": "أتمتة بالذكاء الاصطناعي",
  "Live analytics": "تحليلات مباشرة", "Pricing": "الأسعار", "Simple plans that": "خطط بسيطة",
  "scale": "تتوسع معك", "No hidden fees. Upgrade or cancel anytime.": "لا توجد رسوم خفية. يمكنك الترقية أو الإلغاء في أي وقت.", "Most Popular": "الأكثر شيوعاً",
  "Starter": "المبتدئة", "Growth": "النمو", "Enterprise": "المؤسسات",
  "Contact Sales": "تواصل مع المبيعات", "Latest": "أحدث", "articles": "المقالات",
  "View all posts": "عرض جميع المقالات", "Read more": "اقرأ المزيد", "Your information matters": "معلوماتك تهمنا",
  "Information you provide": "المعلومات التي تقدمها", "Website and usage information": "معلومات الموقع والاستخدام", "How information may be used": "كيفية استخدام المعلومات",
  "Sharing and retention": "مشاركة البيانات والاحتفاظ بها", "Your choices and contact": "خياراتك وطرق التواصل", "The multi-channel marketing infrastructure designed specifically for fast-growing businesses across Pakistan and Saudi Arabia.": "بنية تسويقية متعددة القنوات مصممة خصيصاً للشركات سريعة النمو في باكستان والمملكة العربية السعودية.",
  "Ocean Tower, Clifton, Karachi (PK)": "أوشن تاور، كليفتون، كراتشي (باكستان)", "King Fahd Rd, Al Olaya, Riyadh (KSA)": "طريق الملك فهد، العليا، الرياض (السعودية)", "Dual Sovereign Gateways": "بوابتان رقميتان سياديتان",
  "Avg response < 15 mins": "متوسط وقت الاستجابة أقل من 15 دقيقة", "Built for Pakistan & Saudi Arabia": "مصمم لباكستان والمملكة العربية السعودية", "All regional systems operational": "جميع الأنظمة الإقليمية تعمل",
  "Main Menu": "القائمة الرئيسية", "Legal & Rules": "الشؤون القانونية", "Direct Email": "البريد الإلكتروني المباشر",
  "Saudi Arabia Office": "مكتب المملكة العربية السعودية", "Pakistan Office": "مكتب باكستان", "Terms of Service": "شروط الخدمة",
  "Saudi PDPL Compliance": "الامتثال لنظام حماية البيانات الشخصية السعودي", "Pakistan Telecom (PTA) Rules": "لوائح هيئة الاتصالات الباكستانية", "Data Processing Addendum": "ملحق معالجة البيانات",
  "Security": "الأمان", "WhatsApp": "واتساب", "Telegram": "تيليجرام",
  "Contact Us": "اتصل بنا", "Home": "الرئيسية", "About": "من نحن",
  "Services": "الخدمات", "Privacy": "الخصوصية", "Privacy Policy": "سياسة الخصوصية",
  "Start free trial": "ابدأ التجربة المجانية", "Start Free Trial": "ابدأ التجربة المجانية", "Ocean Tower, Karachi": "أوشن تاور، كراتشي",
  "King Fahd Rd, Riyadh, KSA": "طريق الملك فهد، الرياض، المملكة العربية السعودية", "Gulberg III, Lahore, Pakistan": "گلبرگ 3، لاهور، باكستان", "Connect directly with telecom route engineers and enterprise omnichannel specialists across Pakistan and Saudi Arabia for zero-drop campaign delivery.": "تواصل مباشرةً مع مهندسي مسارات الاتصالات ومتخصصي الحلول متعددة القنوات في باكستان والسعودية لضمان تسليم الحملات دون انقطاع.",
  "What we do": "ما نقدمه", "Why choose us": "لماذا تختارنا", "Our Vision": "رؤيتنا",
  "Learn More": "اعرف المزيد", "Read More": "اقرأ المزيد", "Get Started": "ابدأ الآن",
  "Send Message": "إرسال الرسالة", "Name": "الاسم", "Email": "البريد الإلكتروني",
  "Message": "الرسالة", "Submit": "إرسال", "Call us": "اتصل بنا",
  "Get in touch": "تواصل معنا", "Blog": "المدونة", "Multi-Channel Marketing Built for PK & KSA": "تسويق متعدد القنوات مصمم لباكستان والمملكة العربية السعودية",
  "Specialized platform that helps businesses in Karachi, Lahore, Riyadh, & Jeddah establish verified customer direct messaging.": "منصة متخصصة تساعد الشركات في كراتشي ولاهور والرياض وجدة على إنشاء تواصل مباشر وموثوق مع العملاء.", "Live Campaign Hub": "مركز الحملات المباشرة", "Active Broadcast": "بث نشط",
  "DEMO VIDEO • TOUR": "فيديو توضيحي • جولة", "Explore Platform": "استكشف المنصة", "Zero friction": "تجربة سلسة بلا تعقيد",
  "Live in three": "ابدأ بثلاث", "simple": "بسيطة", "steps": "خطوات",
  "From first connection to first sale, in minutes. No complex technical setups or lengthy configurations.": "من أول اتصال إلى أول عملية بيع خلال دقائق، دون إعدادات تقنية معقدة أو تهيئة طويلة.", "Specialized platform": "منصة متخصصة", "ABOUT US • BUILT FOR PK & KSA": "من نحن • لباكستان والسعودية",
  "nExMeg is built for businesses in Pakistan and Saudi Arabia that want to talk to their customers directly and with respect. We saw that small and mid-sized businesses get lost between many separate tools, so we brought everything into one clear platform.": "صُممت nExMeg للشركات في باكستان والمملكة العربية السعودية التي ترغب في التواصل المباشر والمحترم مع عملائها. لاحظنا أن الشركات الصغيرة والمتوسطة تتشتت بين أدوات كثيرة، فجمعنا كل ما تحتاجه في منصة واحدة واضحة.", "and Keep Customers": "والاحتفاظ بالعملاء", "Everything you need to reach, convert and keep customers, in one place. One unified telecom and digital engine built specifically for Pakistan and Saudi Arabia.": "كل ما تحتاج إليه للوصول إلى العملاء وتحويلهم والاحتفاظ بهم في مكان واحد؛ محرك اتصالات ورقمي موحد صُمم خصيصاً لباكستان والمملكة العربية السعودية.",
  "100% PTA & PDPL Compliant": "متوافق تماماً مع لوائح PTA ونظام PDPL", "Direct Carrier Transit": "اتصال مباشر مع شركات الاتصالات", "PK & KSA OMNICHANNEL INFRASTRUCTURE": "بنية متعددة القنوات لباكستان والسعودية",
  "Thank you! Your query has been routed to our regional telecom consultants in Karachi and Riyadh. We usually reply within 1 business day.": "شكراً لك! تمت إحالة استفسارك إلى مستشاري الاتصالات الإقليميين في كراتشي والرياض. نرد عادةً خلال يوم عمل واحد.", "All rights reserved.": "جميع الحقوق محفوظة.",
  // Additional page copy: About, Services, Contact and Privacy Policy.
  "If you contact us, request a demo, or submit an enquiry, you may provide details such as your name, business contact information, company name, and the contents of your message.": "إذا تواصلت معنا أو طلبت عرضاً توضيحياً أو أرسلت استفساراً، فقد تقدم معلومات مثل اسمك وبيانات التواصل التجارية واسم الشركة ومحتوى رسالتك.",
  "This page explains, at a high level, how nExMeg may handle information when visitors browse the website or contact the team. The final policy should be reviewed and updated to reflect the services actually provided, the data collected, and the legal requirements that apply in each operating region.": "توضح هذه الصفحة بصورة عامة كيفية تعامل nExMeg مع المعلومات عند تصفح الموقع أو التواصل مع الفريق. ينبغي مراجعة سياسة الخصوصية النهائية وتحديثها لتعكس الخدمات المقدمة فعلياً والبيانات التي يتم جمعها والمتطلبات القانونية المعمول بها في كل منطقة تشغيل.",
  "Depending on applicable law, you may have rights to request access, correction, deletion, or restriction of certain personal information. To ask a privacy-related question, contact": "وفقاً للقوانين المعمول بها، قد يحق لك طلب الوصول إلى بعض معلوماتك الشخصية أو تصحيحها أو حذفها أو تقييد معالجتها. للاستفسارات المتعلقة بالخصوصية، يرجى التواصل مع",
  "Information may be used to respond to enquiries, provide requested information, operate and secure the website, improve our services, and meet applicable legal obligations. We do not describe any specific processing activity here unless it has been confirmed as part of the actual business operation.": "قد تُستخدم المعلومات للرد على الاستفسارات وتقديم المعلومات المطلوبة وتشغيل الموقع وتأمينه وتحسين خدماتنا والوفاء بالالتزامات القانونية المعمول بها. ولا نصف هنا أي نشاط معالجة محدد ما لم يتم تأكيده ضمن العمليات الفعلية للأعمال.",
  "Information should only be shared with service providers or other parties where there is a valid business or legal reason and appropriate safeguards. Retention periods should be defined according to the purpose for which the information was collected and applicable law.": "لا ينبغي مشاركة المعلومات مع مزودي الخدمات أو الأطراف الأخرى إلا لسبب تجاري أو قانوني مشروع ومع تطبيق الضمانات المناسبة. ويجب تحديد فترات الاحتفاظ وفقاً للغرض من جمع المعلومات والقوانين المعمول بها.",
  "Our website hosting or analytics tools may process technical information such as browser type, device information, pages visited, and approximate usage data. Configure this section to accurately identify the cookies, analytics, and logging technologies used by the live website.": "قد تعالج أدوات استضافة الموقع أو التحليلات معلومات تقنية مثل نوع المتصفح ومعلومات الجهاز والصفحات التي تمت زيارتها وبيانات الاستخدام التقريبية. يرجى ضبط هذا القسم لتحديد ملفات تعريف الارتباط وتقنيات التحليلات والتسجيل المستخدمة فعلياً في الموقع.",
  "Important: This is starter website copy, not legal advice. Before publishing, confirm the actual data practices, cookie usage, processors, retention periods, and applicable privacy requirements with a qualified legal reviewer.": "مهم: هذا نص أولي للموقع وليس استشارة قانونية. قبل النشر، يرجى التحقق من ممارسات البيانات الفعلية واستخدام ملفات تعريف الارتباط والجهات المعالجة وفترات الاحتفاظ ومتطلبات الخصوصية المعمول بها، وذلك بمراجعة مختص قانوني.",
  "Last updated: November 1, 2026": "آخر تحديث: 1 نوفمبر 2026",
  "Address / Business Name*": "العنوان / اسم النشاط التجاري*",
  "Email ID*": "البريد الإلكتروني*",
  "Enter Your Email": "أدخل بريدك الإلكتروني",
  "Message...": "رسالتك...",
  "Select language": "اختر اللغة",
  "Close navigation": "إغلاق القائمة",
  "Open navigation": "فتح القائمة",
  "Learn more": "اعرف المزيد",
  "Fahad Al-Otaibi - Senior Business & Telecom Consultant": "فهد العتيبي - مستشار أول للأعمال والاتصالات",
  "James Walker - Financial & Compliance Advisor": "جيمس ووكر - مستشار مالي ومستشار امتثال",
  "Tariq Al-Ansari - Founder & CEO": "طارق الأنصاري - المؤسس والرئيس التنفيذي",
  "Zainab Malik - Head of Product / Tech Advisor": "زينب مالك - رئيسة المنتجات ومستشارة تقنية",
  "Salam! Your cart is waiting with 10% off": "مرحباً! سلتك بانتظارك مع خصم 10٪",
  "Bookmark vertical": "احفظ القطاع",
  "Next integration cards": "بطاقات التكامل التالية",
  "Previous integration cards": "بطاقات التكامل السابقة",
  "Go to slide 1": "انتقل إلى الشريحة 1",
  "Go to slide 2": "انتقل إلى الشريحة 2",
  "Go to slide 3": "انتقل إلى الشريحة 3",
  "Next Slide": "الشريحة التالية",
  "Previous Slide": "الشريحة السابقة",
  "Toggle details": "إظهار التفاصيل",
  "Language": "اللغة",
  "ABOUT": "من نحن",
  "Name*": "الاسم*",
  "Switch to dark theme": "التبديل إلى الوضع الداكن",
  "Switch to light theme": "التبديل إلى الوضع الفاتح",
  "Main navigation": "التنقل الرئيسي",
  "Mobile navigation": "قائمة التنقل للجوال",
  "Saudi Arabia": "المملكة العربية السعودية"
};

const originalText = new WeakMap();
const originalAttrs = new WeakMap();

export default function LanguageTranslator() {
  const { language } = useLanguage();
  useEffect(() => {
    const translate = (root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        const original = originalText.get(node) ?? node.nodeValue;
        if (language !== "ar") { if (originalText.has(node)) node.nodeValue = original; return; }
        const key = original.trim();
        if (translations[key] && node.parentElement?.dataset.noTranslate !== "true") {
          originalText.set(node, original);
          const leading = original.match(/^\s*/)?.[0] || "";
          const trailing = original.match(/\s*$/)?.[0] || "";
          node.nodeValue = leading + translations[key] + trailing;
        }
      });
      root.querySelectorAll?.("input[placeholder], textarea[placeholder], [aria-label], [title]").forEach(el => {
        ["placeholder", "aria-label", "title"].forEach(attr => {
          const current = el.getAttribute(attr); if (!current) return;
          let saved = originalAttrs.get(el); if (!saved) { saved = {}; originalAttrs.set(el, saved); }
          if (language !== "ar") { if (saved[attr]) el.setAttribute(attr, saved[attr]); return; }
          if (translations[current]) { saved[attr] ??= current; el.setAttribute(attr, translations[current]); }
        });
      });
    };
    translate(document.body);
    const observer = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) translate(node);
      else if (node.nodeType === Node.TEXT_NODE) {
        const original = originalText.get(node) ?? node.nodeValue;
        const key = original.trim();
        if (language === "ar" && translations[key]) {
          originalText.set(node, original);
          node.nodeValue = original.replace(key, translations[key]);
        }
      }
    })));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);
  return null;
}
