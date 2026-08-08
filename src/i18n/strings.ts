import type { Loc } from './types'

/**
 * Every string the UI chrome needs, in both languages.
 * Course content lives in `src/content` — this file is only for the shell.
 */
export const UI = {
  // --- brand / meta -------------------------------------------------
  siteName: { en: 'React Academy', ar: 'أكاديمية رياكت' },
  siteTagline: {
    en: 'From JavaScript to professional React',
    ar: 'من جافاسكربت إلى رياكت الاحترافية',
  },

  // --- navigation ---------------------------------------------------
  navHome: { en: 'Home', ar: 'الرئيسية' },
  navRoadmap: { en: 'Roadmap', ar: 'خارطة الطريق' },
  navPlayground: { en: 'Playground', ar: 'المختبر' },
  navVisuals: { en: 'Visuals', ar: 'الرسوم التفاعلية' },
  navDashboard: { en: 'Progress', ar: 'تقدّمي' },
  navGlossary: { en: 'Glossary', ar: 'المصطلحات' },
  navSearch: { en: 'Search', ar: 'بحث' },
  navMenu: { en: 'Menu', ar: 'القائمة' },
  navClose: { en: 'Close', ar: 'إغلاق' },
  navCurriculum: { en: 'Curriculum', ar: 'المنهج' },

  // --- controls -----------------------------------------------------
  toggleTheme: { en: 'Toggle theme', ar: 'تبديل المظهر' },
  toggleLang: { en: 'Switch language', ar: 'تغيير اللغة' },
  themeDark: { en: 'Dark', ar: 'داكن' },
  themeLight: { en: 'Light', ar: 'فاتح' },

  // --- hero ---------------------------------------------------------
  heroKicker: { en: 'Interactive React course · 2026 edition', ar: 'دورة رياكت تفاعلية · إصدار 2026' },
  heroTitleA: { en: 'Learn', ar: 'تعلّم' },
  heroTitleAccent: { en: 'modern React', ar: 'رياكت الحديثة' },
  heroTitleB: {
    en: 'the way it is actually built today.',
    ar: 'بالطريقة التي تُبنى بها التطبيقات فعليًا اليوم.',
  },
  heroBody: {
    en: 'Sixteen guided phases that take you from your first component to Server Components, the React Compiler and a production-grade stack — with live code you can edit, animated explanations and a checklist that remembers where you stopped.',
    ar: 'ستة عشر مرحلة مُوجّهة تنقلك من أول مكوّن تكتبه إلى مكوّنات الخادم ومُصرِّف رياكت ومنظومة عمل احترافية — مع أكواد حيّة يمكنك تعديلها، وشروحات متحركة، وقائمة تقدّم تتذكّر أين توقفت.',
  },
  ctaStart: { en: 'Start learning', ar: 'ابدأ التعلّم' },
  ctaContinue: { en: 'Continue where you left off', ar: 'أكمل من حيث توقفت' },
  ctaRoadmap: { en: 'Browse the roadmap', ar: 'تصفّح خارطة الطريق' },

  // --- stats --------------------------------------------------------
  statPhases: { en: 'phases', ar: 'مرحلة' },
  statTopics: { en: 'topics', ar: 'موضوعًا' },
  statProjects: { en: 'projects', ar: 'مشروعًا' },
  statDuration: { en: 'months part-time', ar: 'أشهر بدوام جزئي' },

  // --- sections -----------------------------------------------------
  stackTitle: { en: 'The stack you will be fluent in', ar: 'المنظومة التي ستُتقنها' },
  stackSub: {
    en: 'These are the tools real teams ship with in 2026 — every one of them appears in the course.',
    ar: 'هذه هي الأدوات التي تعمل بها الفرق الحقيقية في 2026 — وكلٌّ منها يظهر داخل الدورة.',
  },
  whyTitle: { en: 'Built to be practised, not just read', ar: 'مصمّمة للتطبيق لا للقراءة فقط' },
  whySub: {
    en: 'Every phase mixes explanation, a runnable example and something you have to build yourself.',
    ar: 'كل مرحلة تجمع بين الشرح، ومثال قابل للتشغيل، وشيء عليك بناؤه بنفسك.',
  },
  pathTitle: { en: 'Your path, phase by phase', ar: 'مسارك، مرحلة بمرحلة' },
  pathSub: {
    en: 'Work top to bottom. Each phase assumes the one before it.',
    ar: 'اعمل من الأعلى إلى الأسفل. كل مرحلة تبني على التي قبلها.',
  },

  // --- roadmap / phases ---------------------------------------------
  roadmapTitle: { en: 'The roadmap', ar: 'خارطة الطريق' },
  roadmapSub: {
    en: '16 phases · pick one to open its lessons. Your progress is saved in this browser.',
    ar: '١٦ مرحلة · اختر واحدة لفتح دروسها. يُحفظ تقدّمك في هذا المتصفح.',
  },
  phase: { en: 'Phase', ar: 'المرحلة' },
  lessons: { en: 'lessons', ar: 'دروس' },
  lesson: { en: 'Lesson', ar: 'درس' },
  minutes: { en: 'min', ar: 'دقيقة' },
  youLearn: { en: 'What you will learn', ar: 'ما ستتعلّمه' },
  projectLabel: { en: 'Build it', ar: 'ابنِ بنفسك' },
  resourcesLabel: { en: 'Official docs', ar: 'المراجع الرسمية' },
  prerequisites: { en: 'Assumes', ar: 'يفترض معرفة' },
  openPhase: { en: 'Open phase', ar: 'افتح المرحلة' },
  startPhase: { en: 'Start this phase', ar: 'ابدأ هذه المرحلة' },
  resumePhase: { en: 'Resume', ar: 'استئناف' },
  reviewPhase: { en: 'Review', ar: 'مراجعة' },
  complete: { en: 'complete', ar: 'مكتمل' },
  completed: { en: 'Completed', ar: 'مكتمل' },
  markDone: { en: 'Mark as done', ar: 'وضع علامة إتمام' },
  markUndone: { en: 'Mark as not done', ar: 'إلغاء علامة الإتمام' },

  // --- levels -------------------------------------------------------
  levelBeginner: { en: 'Beginner', ar: 'مبتدئ' },
  levelIntermediate: { en: 'Intermediate', ar: 'متوسط' },
  levelAdvanced: { en: 'Advanced', ar: 'متقدّم' },
  levelPro: { en: 'Professional', ar: 'احترافي' },

  // --- progress -----------------------------------------------------
  progressTitle: { en: 'Your progress', ar: 'تقدّمك' },
  progressEmpty: {
    en: 'Nothing checked off yet — open phase 1 and take the first step.',
    ar: 'لم تُنجز شيئًا بعد — افتح المرحلة الأولى وابدأ الخطوة الأولى.',
  },
  resetProgress: { en: 'Reset progress', ar: 'إعادة ضبط التقدّم' },
  resetConfirm: {
    en: 'Clear every checkmark? This cannot be undone.',
    ar: 'هل تريد مسح كل العلامات؟ لا يمكن التراجع عن هذا.',
  },

  // --- lesson page --------------------------------------------------
  inThisPhase: { en: 'In this phase', ar: 'في هذه المرحلة' },
  onThisPage: { en: 'On this page', ar: 'في هذه الصفحة' },
  completeAndNext: { en: 'Complete & continue', ar: 'إتمام ومتابعة' },
  completeLesson: { en: 'Mark lesson complete', ar: 'وضع علامة إتمام الدرس' },
  lessonDone: { en: 'Lesson completed', ar: 'اكتمل الدرس' },
  nextLesson: { en: 'Next lesson', ar: 'الدرس التالي' },
  prevLesson: { en: 'Previous lesson', ar: 'الدرس السابق' },
  backToPhase: { en: 'Back to phase', ar: 'العودة للمرحلة' },
  outlineOnly: {
    en: 'The full write-up for this lesson is still being authored. Here is what it covers, plus the official documentation to read in the meantime.',
    ar: 'الشرح الكامل لهذا الدرس ما زال قيد الكتابة. إليك ما يغطّيه، مع المراجع الرسمية للقراءة في هذه الأثناء.',
  },
  outlineLabel: { en: 'Outline', ar: 'المخطّط' },
  outlineChip: { en: 'outline only', ar: 'مخطّط فقط' },
  fullLesson: { en: 'full lesson', ar: 'درس كامل' },
  phaseFinished: { en: 'Phase finished — well done.', ar: 'انتهت المرحلة — أحسنت.' },
  courseFinished: { en: 'That was the last lesson. Congratulations.', ar: 'كان ذلك آخر درس. تهانينا.' },

  // --- exams ---------------------------------------------------------
  navExam: { en: 'Exams', ar: 'الاختبارات' },
  examTitle: { en: 'Level exams', ar: 'اختبارات المستويات' },
  examIntro: {
    en: 'Ten questions drawn at random from a bank, marked as soon as you finish. Sit a level again and you get a different paper.',
    ar: 'عشرة أسئلة تُسحب عشوائيًا من بنك أسئلة، وتُصحَّح فور انتهائك. أعِد الاختبار لتحصل على ورقة مختلفة.',
  },
  examStart: { en: 'Start exam', ar: 'ابدأ الاختبار' },
  examRetake: { en: 'Sit it again', ar: 'أعِد الاختبار' },
  examBackToList: { en: 'All exams', ar: 'كل الاختبارات' },
  examQuestionCounter: { en: 'Question', ar: 'سؤال' },
  examOf: { en: 'of', ar: 'من' },
  examNext: { en: 'Next question', ar: 'السؤال التالي' },
  examPrev: { en: 'Previous', ar: 'السابق' },
  examFinish: { en: 'Finish and mark', ar: 'إنهاء وتصحيح' },
  examAnswered: { en: 'answered', ar: 'مُجاب' },
  examUnansweredWarning: {
    en: 'Unanswered questions are marked wrong.',
    ar: 'الأسئلة غير المُجابة تُحتسب خاطئة.',
  },
  examResultTitle: { en: 'Your result', ar: 'نتيجتك' },
  examPassed: { en: 'Passed', ar: 'ناجح' },
  examFailed: { en: 'Not passed yet', ar: 'لم تنجح بعد' },
  examPassMark: { en: 'Pass mark', ar: 'درجة النجاح' },
  examByPhase: { en: 'How each phase went', ar: 'أداؤك في كل مرحلة' },
  examReview: { en: 'Review every question', ar: 'راجع كل سؤال' },
  examYourAnswer: { en: 'Your answer', ar: 'إجابتك' },
  examCorrectAnswer: { en: 'Correct answer', ar: 'الإجابة الصحيحة' },
  examSkipped: { en: 'Left blank', ar: 'تُرك فارغًا' },
  examBest: { en: 'Best', ar: 'الأفضل' },
  examAttempts: { en: 'Attempts', ar: 'المحاولات' },
  examBankSize: { en: 'questions in the bank', ar: 'سؤالًا في بنك الأسئلة' },
  examNotReady: { en: 'Bank in preparation', ar: 'بنك الأسئلة قيد الإعداد' },
  examNotReadyBody: {
    en: 'This level\'s questions are still being written. The other exams are ready now.',
    ar: 'ما زالت أسئلة هذا المستوى قيد الكتابة. أما الاختبارات الأخرى فجاهزة الآن.',
  },
  examCovers: { en: 'Covers', ar: 'يغطّي' },
  examLoading: { en: 'Drawing your questions…', ar: 'يجري سحب أسئلتك…' },

  // --- accessibility ------------------------------------------------
  skipToContent: { en: 'Skip to content', ar: 'تخطَّ إلى المحتوى' },
  visualPrevStep: { en: 'Previous step', ar: 'الخطوة السابقة' },
  visualNextStep: { en: 'Next step', ar: 'الخطوة التالية' },
  quizCorrect: { en: 'Correct.', ar: 'إجابة صحيحة.' },
  quizWrong: { en: 'Not quite.', ar: 'ليست صحيحة تمامًا.' },

  // --- misc ---------------------------------------------------------
  next: { en: 'Next', ar: 'التالي' },
  previous: { en: 'Previous', ar: 'السابق' },
  backToRoadmap: { en: 'Back to roadmap', ar: 'العودة لخارطة الطريق' },
  notFoundTitle: { en: 'This page does not exist', ar: 'هذه الصفحة غير موجودة' },
  notFoundBody: {
    en: 'The link may be outdated. Head back to the roadmap and pick a phase.',
    ar: 'قد يكون الرابط قديمًا. عُد إلى خارطة الطريق واختر مرحلة.',
  },
  footerNote: {
    en: 'Built as a study companion · verified against React 19.2 and React Compiler 1.0',
    ar: 'رفيق دراسي · مُراجَع وفق React 19.2 و React Compiler 1.0',
  },
  soon: { en: 'Coming in a later stage', ar: 'قادم في مرحلة لاحقة' },
} satisfies Record<string, Loc>

export type UIKey = keyof typeof UI
