export interface FaqItem {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export interface FaqCategory {
  id: string;
  categoryName: string;
  categoryNameEn: string;
  items: FaqItem[];
}

export const FAQ_DATA: FaqCategory[] = [
  {
    id: 'cat1',
    categoryName: 'Category 1: General Information (সাধারণ তথ্য)',
    categoryNameEn: 'Category 1: General Information',
    items: [
      {
        id: 'c1q1',
        question: 'Q1. Fleearn কী?',
        questionEn: 'Q1. What is Fleearn?',
        answer: 'Fleearn একটি অনলাইন আয়ের প্ল্যাটফর্ম, যেখানে ব্যবহারকারীরা বিভিন্ন ডিজিটাল কার্যক্রম সম্পন্ন করে আয় বা পুরস্কার অর্জনের সুযোগ পেতে পারেন।',
        answerEn: 'Fleearn is an online earning platform where users can earn rewards and income by completing various digital tasks and activities.'
      },
      {
        id: 'c1q2',
        question: 'Q2. Fleearn-এর মূল উদ্দেশ্য কী?',
        questionEn: 'Q2. What is Fleearn’s core objective?',
        answer: 'Fleearn-এর মূল উদ্দেশ্য হলো অনলাইনে আয়ের সুযোগকে সহজ, আকর্ষণীয় ও আরও বেশি মানুষের কাছে সহজলভ্য করে তোলা।',
        answerEn: 'Fleearn’s mission is to make online earning accessible, intuitive, engaging, and available to people everywhere.'
      },
      {
        id: 'c1q3',
        question: 'Q3. কারা Fleearn ব্যবহার করতে পারবেন?',
        questionEn: 'Q3. Who can use Fleearn?',
        answer: 'Fleearn-এর নির্ধারিত বয়সসীমা, দেশভিত্তিক যোগ্যতা এবং ব্যবহারের শর্ত পূরণকারী ব্যক্তিরা প্ল্যাটফর্মটি ব্যবহার করতে পারবেন।',
        answerEn: 'Anyone meeting the minimum age requirement, jurisdiction criteria, and terms of service can register and use Fleearn.'
      },
      {
        id: 'c1q4',
        question: 'Q4. Fleearn কি আন্তর্জাতিকভাবে ব্যবহার করা যাবে?',
        questionEn: 'Q4. Can Fleearn be used internationally?',
        answer: 'Fleearn আন্তর্জাতিক ব্যবহারকারীদের কথা মাথায় রেখে তৈরি। তবে কাজ, ফিচার ও পেমেন্ট সুবিধা দেশভেদে ভিন্ন হতে পারে।',
        answerEn: 'Yes, Fleearn is built for a global community, though specific tasks, payment channels, and features may vary by country.'
      },
      {
        id: 'c1q5',
        question: 'Q5. Fleearn ব্যবহার করতে কি বিশেষ দক্ষতা প্রয়োজন?',
        questionEn: 'Q5. Does Fleearn require specialized skills?',
        answer: 'অধিকাংশ সাধারণ কাজের জন্য বিশেষ দক্ষতার প্রয়োজন নাও হতে পারে। তবে কিছু কাজের জন্য নির্দিষ্ট দক্ষতা বা নির্দেশনা অনুসরণ করতে হতে পারে।',
        answerEn: 'Most microtasks do not require advanced expertise, although specialized tasks or courses may have specific requirements.'
      },
      {
        id: 'c1q6',
        question: 'Q6. Fleearn কি মোবাইল ফোনে ব্যবহার করা যাবে?',
        questionEn: 'Q6. Can Fleearn be accessed on mobile phones?',
        answer: 'হ্যাঁ, সমর্থিত ওয়েবসাইট বা অ্যাপের মাধ্যমে মোবাইল ফোন থেকে Fleearn ব্যবহার করা যাবে।',
        answerEn: 'Yes, Fleearn can be accessed seamlessly via our official Android mobile app and responsive web portal.'
      },
      {
        id: 'c1q7',
        question: 'Q7. Fleearn ব্যবহার করতে কি কম্পিউটার প্রয়োজন?',
        questionEn: 'Q7. Is a computer required to use Fleearn?',
        answer: 'না, সমর্থিত মোবাইল ফোন দিয়েও Fleearn ব্যবহার করা সম্ভব। তবে কিছু কাজ কম্পিউটারে করা সহজ হতে পারে।',
        answerEn: 'No, a smartphone is sufficient for all core activities, though some freelance tasks may be convenient on a desktop.'
      },
      {
        id: 'c1q8',
        question: 'Q8. Fleearn কি বিনামূল্যে ব্যবহার করা যাবে?',
        questionEn: 'Q8. Is Fleearn free to use?',
        answer: 'বিনামূল্যের সুবিধাগুলো ব্যবহার করতে আলাদা অর্থ দেওয়ার প্রয়োজন নেই। কোনো পেইড সুবিধা থাকলে তার মূল্য ও শর্ত আগে জানিয়ে দেওয়া হবে।',
        answerEn: 'Standard registration and earning are free. Any optional premium plans or educational courses clearly display pricing and perks.'
      },
      {
        id: 'c1q9',
        question: 'Q9. Fleearn-এর নতুন আপডেট কোথায় পাব?',
        questionEn: 'Q9. Where can I find new updates?',
        answer: 'Fleearn-এর ওয়েবসাইট, অ্যাপের নোটিশ এবং অফিসিয়াল সামাজিক যোগাযোগমাধ্যম থেকে নতুন আপডেট জানতে পারবেন।',
        answerEn: 'All updates are posted in real-time on our Notice Board, the Mobile App notification center, and official social channels.'
      },
      {
        id: 'c1q10',
        question: 'Q10. Fleearn-এর সঙ্গে যোগাযোগ করব কীভাবে?',
        questionEn: 'Q10. How do I contact Fleearn?',
        answer: 'Fleearn-এর Contact Us বা Support বিভাগে দেওয়া যোগাযোগের মাধ্যম ব্যবহার করে সহায়তা চাইতে পারবেন।',
        answerEn: 'You can reach us through our 24/7 in-app Support ticket system, Report center, or official email.'
      }
    ]
  },
  {
    id: 'cat2',
    categoryName: 'Category 2: Account Registration & Login (অ্যাকাউন্ট তৈরি ও লগইন)',
    categoryNameEn: 'Category 2: Account Registration & Login',
    items: [
      {
        id: 'c2q1',
        question: 'Q1. Fleearn-এ অ্যাকাউন্ট কীভাবে তৈরি করব?',
        questionEn: 'Q1. How to create an account on Fleearn?',
        answer: 'নিবন্ধন পেজে গিয়ে প্রয়োজনীয় তথ্য পূরণ করুন, শর্তাবলি পড়ে সম্মতি জানান এবং নির্দেশনা অনুসরণ করে অ্যাকাউন্ট তৈরি করুন।',
        answerEn: 'Visit the registration screen, enter your phone or email, agree to the terms, and follow verification instructions.'
      },
      {
        id: 'c2q2',
        question: 'Q2. অ্যাকাউন্ট তৈরি করতে কী কী তথ্য প্রয়োজন?',
        questionEn: 'Q2. What details are required for signup?',
        answer: 'সাধারণত ইমেইল বা ফোন নম্বর এবং পাসওয়ার্ড প্রয়োজন হতে পারে। পরিচয় যাচাই বা পেমেন্টের জন্য অতিরিক্ত তথ্যও প্রয়োজন হতে পারে।',
        answerEn: 'Usually an email/mobile number and a secure password. Identity details may be requested for withdrawal verification.'
      },
      {
        id: 'c2q3',
        question: 'Q3. একটি ইমেইল দিয়ে কি একাধিক অ্যাকাউন্ট খোলা যাবে?',
        questionEn: 'Q3. Can multiple accounts be opened with one email?',
        answer: 'সাধারণত একটি ইমেইল একটি অ্যাকাউন্টের সঙ্গে যুক্ত থাকে। একাধিক অ্যাকাউন্টের অনুমতি Fleearn-এর নীতিমালা অনুযায়ী নির্ধারিত হবে।',
        answerEn: 'Only one account per verified email/identity is permitted under Fleearn’s anti-abuse security policies.'
      },
      {
        id: 'c2q4',
        question: 'Q4. পাসওয়ার্ড ভুলে গেলে কী করব?',
        questionEn: 'Q4. What should I do if I forget my password?',
        answer: 'লগইন পেজের Forgot Password অপশনে গিয়ে নির্দেশনা অনুসরণ করুন। নিবন্ধিত ইমেইল বা ফোন নম্বরের মাধ্যমে পাসওয়ার্ড পুনরুদ্ধার করতে পারবেন।',
        answerEn: 'Click Forgot Password on the login prompt to receive an instant OTP verification link.'
      },
      {
        id: 'c2q5',
        question: 'Q5. অ্যাকাউন্ট ভেরিফিকেশন কেন প্রয়োজন?',
        questionEn: 'Q5. Why is account verification necessary?',
        answer: 'অ্যাকাউন্টের মালিকানা যাচাই, অননুমোদিত ব্যবহার কমানো এবং প্ল্যাটফর্মের নিরাপত্তা বজায় রাখতে ভেরিফিকেশন প্রয়োজন হতে পারে।',
        answerEn: 'Verification protects user earnings, prevents automated bot fraud, and ensures regulatory compliance.'
      },
      {
        id: 'c2q6',
        question: 'Q6. ভেরিফিকেশন কোড না পেলে কী করব?',
        questionEn: 'Q6. What if I do not receive the verification code?',
        answer: 'ইমেইলের Spam বা Junk ফোল্ডার পরীক্ষা করুন, ফোন নম্বর সঠিক আছে কি না দেখুন এবং কিছুক্ষণ পর কোড আবার পাঠানোর চেষ্টা করুন।',
        answerEn: 'Check your spam or junk folder, confirm number accuracy, and request a resend after 60 seconds.'
      },
      {
        id: 'c2q7',
        question: 'Q7. অ্যাকাউন্টের ইমেইল বা ফোন নম্বর পরিবর্তন করা যাবে?',
        questionEn: 'Q7. Can I change my account email or phone number?',
        answer: 'পরিবর্তনের সুবিধা উপলব্ধ থাকলে অ্যাকাউন্ট সেটিংস থেকে অথবা সাপোর্ট টিমের সাহায্যে তথ্য পরিবর্তনের অনুরোধ করতে পারবেন।',
        answerEn: 'Yes, through your Profile Settings with two-factor confirmation or via our support desk.'
      },
      {
        id: 'c2q8',
        question: 'Q8. একই অ্যাকাউন্ট একাধিক ডিভাইসে ব্যবহার করা যাবে?',
        questionEn: 'Q8. Can the same account be used on multiple devices?',
        answer: 'এটি Fleearn-এর নিরাপত্তানীতি ও অনুমোদিত লগইন সীমার ওপর নির্ভর করবে। সন্দেহজনক লগইন শনাক্ত হলে অতিরিক্ত যাচাই প্রয়োজন হতে পারে।',
        answerEn: 'Yes, up to your designated device quota. Simultaneous conflicting IP logins may trigger a security prompt.'
      },
      {
        id: 'c2q9',
        question: 'Q9. আমার অ্যাকাউন্টে লগইন করতে পারছি না কেন?',
        questionEn: 'Q9. Why can I not log in to my account?',
        answer: 'ভুল পাসওয়ার্ড, ভেরিফিকেশন সমস্যা, ইন্টারনেট সংযোগ অথবা সাময়িক নিরাপত্তা সীমাবদ্ধতার কারণে লগইন ব্যর্থ হতে পারে।',
        answerEn: 'Possible reasons include incorrect credentials, unverified status, or temporary security hold.'
      },
      {
        id: 'c2q10',
        question: 'Q10. অ্যাকাউন্ট বন্ধ করতে চাইলে কী করব?',
        questionEn: 'Q10. How do I delete or close my account?',
        answer: 'অ্যাকাউন্ট বন্ধ করার নিয়ম জানতে Settings, Privacy বা Support বিভাগ দেখুন। বন্ধ করার আগে অবশিষ্ট ব্যালেন্স ও পেমেন্টের বিষয়টি যাচাই করে নিন।',
        answerEn: 'Submit an account closure request in Settings > Privacy, ensuring any withdrawable balance is claimed.'
      }
    ]
  },
  {
    id: 'cat3',
    categoryName: 'Category 3: Earning Methods (আয়ের পদ্ধতি)',
    categoryNameEn: 'Category 3: Earning Methods',
    items: [
      {
        id: 'c3q1',
        question: 'Q1. Fleearn থেকে কীভাবে আয় করা যায়?',
        questionEn: 'Q1. How to earn from Fleearn?',
        answer: 'উপলব্ধ কাজ সম্পন্ন করা, রেফারেল কার্যক্রম, দৈনিক চেক-ইন, সার্ভে, গেম বা অন্যান্য অনুমোদিত কার্যক্রমের মাধ্যমে আয় বা পুরস্কার অর্জনের সুযোগ থাকতে পারে।',
        answerEn: 'Through microtasks, surveys, daily check-ins, skill freelance gigs, referral rewards, and partner campaigns.'
      },
      {
        id: 'c3q2',
        question: 'Q2. Microtask কী?',
        questionEn: 'Q2. What is a Microtask?',
        answer: 'Microtask হলো ছোট ছোট অনলাইন কাজ, যেমন নির্দিষ্ট তথ্য যাচাই, সহজ ডিজিটাল কাজ বা নির্দেশনা অনুযায়ী কোনো কাজ সম্পন্ন করা।',
        answerEn: 'Microtasks are short, focused digital assignments such as data verification, image labeling, or brief interactions.'
      },
      {
        id: 'c3q3',
        question: 'Q3. Referral Program কীভাবে কাজ করে?',
        questionEn: 'Q3. How does the Referral Program work?',
        answer: 'আপনার রেফারেল লিংক ব্যবহার করে নতুন ব্যবহারকারী যোগ দিলে এবং নির্ধারিত শর্ত পূরণ হলে আপনি রেফারেল পুরস্কার পেতে পারেন।',
        answerEn: 'Share your personal invitation link; when referees join and complete their initial tasks, bonuses are credited.'
      },
      {
        id: 'c3q4',
        question: 'Q4. Daily Check-in কী?',
        questionEn: 'Q4. What is Daily Check-in?',
        answer: 'Daily Check-in হলো প্রতিদিন প্ল্যাটফর্মে প্রবেশ করে নির্দিষ্ট চেক-ইন কার্যক্রম সম্পন্ন করা। এর মাধ্যমে পুরস্কার পাওয়া যাবে কি না, তা Fleearn-এর নিয়মের ওপর নির্ভর করবে।',
        answerEn: 'A daily engagement reward system where active streaks unlock increasing loyalty rewards.'
      },
      {
        id: 'c3q5',
        question: 'Q5. সার্ভে সম্পন্ন করে কি আয় করা যায়?',
        questionEn: 'Q5. Can I earn by completing surveys?',
        answer: 'যোগ্য সার্ভে উপলব্ধ থাকলে এবং প্রয়োজনীয় শর্ত পূরণ করে সার্ভে সম্পন্ন করলে পুরস্কার পাওয়ার সুযোগ থাকতে পারে।',
        answerEn: 'Yes, vetted demographic surveys award direct FSD/USD upon verified completion.'
      },
      {
        id: 'c3q6',
        question: 'Q6. গেম খেলে কি পুরস্কার পাওয়া যায়?',
        questionEn: 'Q6. Are there rewards for playing games?',
        answer: 'Fleearn-এ পুরস্কারভিত্তিক গেম সুবিধা চালু থাকলে নির্ধারিত নিয়ম অনুযায়ী অংশগ্রহণ করে পুরস্কার অর্জন করা যেতে পারে।',
        answerEn: 'Supported reward-based skill challenges and interactive mini-games offer points convertible to cash.'
      },
      {
        id: 'c3q7',
        question: 'Q7. ভিডিও দেখে কি আয় করা যায়?',
        questionEn: 'Q7. Can I earn by watching videos?',
        answer: 'ভিডিওভিত্তিক পুরস্কার কার্যক্রম উপলব্ধ থাকলে নির্দেশিত ভিডিও বা কার্যক্রম সম্পন্ন করে পুরস্কার পাওয়ার সুযোগ থাকতে পারে।',
        answerEn: 'Promotional and educational partner video streams offer reward tokens upon meeting engagement criteria.'
      },
      {
        id: 'c3q8',
        question: 'Q8. সব কাজ কি সব ব্যবহারকারীর জন্য উপলব্ধ?',
        questionEn: 'Q8. Are all tasks available to everyone?',
        answer: 'না। কাজের ধরন, দেশ, যোগ্যতা, বিজ্ঞাপনদাতা বা অংশীদারের শর্ত অনুযায়ী কাজের প্রাপ্যতা ভিন্ন হতে পারে।',
        answerEn: 'Task volume and criteria vary based on geographic region, advertiser requirements, and account history.'
      },
      {
        id: 'c3q9',
        question: 'Q9. একটি কাজ সম্পন্ন করার পর পুরস্কার না পেলে কী করব?',
        questionEn: 'Q9. What if I do not receive my reward after finishing a task?',
        answer: 'কাজের শর্ত পূরণ হয়েছে কি না যাচাই করুন। এরপরও পুরস্কার না পেলে কাজের বিবরণ ও প্রাসঙ্গিক তথ্যসহ সাপোর্ট টিমে যোগাযোগ করুন।',
        answerEn: 'Review task criteria and submit a ticket with your task ID and screenshot proof for review.'
      },
      {
        id: 'c3q10',
        question: 'Q10. Fleearn থেকে কি নির্দিষ্ট পরিমাণ আয় নিশ্চিত?',
        questionEn: 'Q10. Is a fixed income guaranteed on Fleearn?',
        answer: 'না। আয় নির্ভর করে কাজের প্রাপ্যতা, ব্যবহারকারীর কার্যক্রম, যোগ্যতা এবং প্রযোজ্য নিয়মের ওপর। Fleearn নির্দিষ্ট আয় নিশ্চিত করে না, যদি না কোনো নির্দিষ্ট অফারের শর্তে স্পষ্টভাবে উল্লেখ থাকে।',
        answerEn: 'Earnings correlate directly with user activity, task completion, and demand. No fixed passive return is guaranteed.'
      }
    ]
  },
  {
    id: 'cat4',
    categoryName: 'Category 4: Rewards & Balance (পুরস্কার ও ব্যালেন্স)',
    categoryNameEn: 'Category 4: Rewards & Balance',
    items: [
      {
        id: 'c4q1',
        question: 'Q1. Fleearn-এর ব্যালেন্স কীভাবে কাজ করে?',
        questionEn: 'Q1. How does the Fleearn balance system work?',
        answer: 'যোগ্য কার্যক্রম সম্পন্ন করে অনুমোদিত পুরস্কার পেলে তা আপনার অ্যাকাউন্টের ব্যালেন্সে যোগ হতে পারে।',
        answerEn: 'Approved task earnings are credited in FSD (Fleearn Standard Dollar), pegged 1:1 with USD equivalent value.'
      },
      {
        id: 'c4q2',
        question: 'Q2. Pending Balance বলতে কী বোঝায়?',
        questionEn: 'Q2. What is Pending Balance?',
        answer: 'Pending Balance হলো এমন পুরস্কার বা আয়, যা এখনো যাচাই বা অনুমোদনের অপেক্ষায় রয়েছে।',
        answerEn: 'Pending balance represents earnings undergoing partner verification before clearance.'
      },
      {
        id: 'c4q3',
        question: 'Q3. Available Balance কী?',
        questionEn: 'Q3. What is Available Balance?',
        answer: 'Available Balance হলো যাচাই সম্পন্ন হওয়া সেই ব্যালেন্স, যা প্ল্যাটফর্মের নিয়ম অনুযায়ী ব্যবহার বা উত্তোলনের জন্য উপলব্ধ।',
        answerEn: 'Cleared balance eligible for immediate withdrawal or in-platform marketplace purchases.'
      },
      {
        id: 'c4q4',
        question: 'Q4. কাজ সম্পন্ন করার পর ব্যালেন্স আপডেট হতে কত সময় লাগে?',
        questionEn: 'Q4. How long does balance take to update?',
        answer: 'কাজের ধরন ও যাচাই প্রক্রিয়ার ওপর নির্ভর করে ব্যালেন্স আপডেট হতে কিছু সময় লাগতে পারে।',
        answerEn: 'Microtasks credit instantly; complex reviews or surveys take between 15 minutes to 24 hours.'
      },
      {
        id: 'c4q5',
        question: 'Q5. আমার ব্যালেন্স কমে গেছে কেন?',
        questionEn: 'Q5. Why did my balance decrease?',
        answer: 'পূর্ববর্তী সমন্বয়, বাতিল হওয়া পুরস্কার, ভুল লেনদেন সংশোধন বা নীতিমালা অনুযায়ী সমন্বয়ের কারণে ব্যালেন্স পরিবর্তিত হতে পারে। বিস্তারিত জানতে লেনদেনের ইতিহাস পরীক্ষা করুন।',
        answerEn: 'Adjustments occur due to reversed invalid tasks, fee deductions, or payout processing. Check your ledger.'
      },
      {
        id: 'c4q6',
        question: 'Q6. Fleearn-এ লেনদেনের ইতিহাস দেখা যাবে?',
        questionEn: 'Q6. Can I view my full transaction history?',
        answer: 'Transaction History সুবিধা উপলব্ধ থাকলে অ্যাকাউন্ট থেকে আয়, পুরস্কার, সমন্বয় ও উত্তোলনের তথ্য দেখতে পারবেন।',
        answerEn: 'Yes, your complete audit log of deposits, earnings, and withdrawals is stored with filterable dates.'
      },
      {
        id: 'c4q7',
        question: 'Q7. পুরস্কার বাতিল হতে পারে কি?',
        questionEn: 'Q7. Can rewards be canceled?',
        answer: 'হ্যাঁ। কাজের শর্ত পূরণ না হলে, জালিয়াতি শনাক্ত হলে বা কোনো কার্যক্রম বাতিল হলে সংশ্লিষ্ট পুরস্কার বাতিল হতে পারে।',
        answerEn: 'Yes, in instances of automated bot activity, inaccurate survey data, or violation of task instructions.'
      },
      {
        id: 'c4q8',
        question: 'Q8. Fleearn কি বোনাস দেয়?',
        questionEn: 'Q8. Does Fleearn provide promotional bonuses?',
        answer: 'Fleearn-এ বোনাস অফার চালু থাকলে তার যোগ্যতা, পরিমাণ ও শর্ত সংশ্লিষ্ট অফারের বিবরণে উল্লেখ থাকবে।',
        answerEn: 'We frequently launch weekend booster bonuses, signup perks, and seasonal leaderboard prizes.'
      },
      {
        id: 'c4q9',
        question: 'Q9. বোনাসের টাকা কি সরাসরি উত্তোলন করা যাবে?',
        questionEn: 'Q9. Can bonus funds be withdrawn directly?',
        answer: 'এটি বোনাসের নিয়মের ওপর নির্ভর করবে। কিছু বোনাসে অতিরিক্ত কাজ, যাচাই বা নির্দিষ্ট শর্ত পূরণ করতে হতে পারে।',
        answerEn: 'Bonus funds usually require a modest activity turnover before unlocking for cash withdrawal.'
      },
      {
        id: 'c4q10',
        question: 'Q10. ব্যালেন্সের হিসাব ভুল মনে হলে কী করব?',
        questionEn: 'Q10. What should I do if my balance appears incorrect?',
        answer: 'Transaction History পরীক্ষা করে সংশ্লিষ্ট লেনদেনের তথ্য সংগ্রহ করুন এবং সাপোর্ট টিমের কাছে পর্যালোচনার অনুরোধ জানান।',
        answerEn: 'Take a screenshot of your transaction ledger and open a dispute ticket with our billing team.'
      }
    ]
  },
  {
    id: 'cat5',
    categoryName: 'Category 5: Withdrawals & Payments (টাকা উত্তোলন ও পেমেন্ট)',
    categoryNameEn: 'Category 5: Withdrawals & Payments',
    items: [
      {
        id: 'c5q1',
        question: 'Q1. Fleearn থেকে টাকা উত্তোলন করা যাবে কি?',
        questionEn: 'Q1. Can I withdraw funds from Fleearn?',
        answer: 'উত্তোলনের সুবিধা চালু থাকলে এবং প্রয়োজনীয় শর্ত পূরণ করলে উপলব্ধ পেমেন্ট পদ্ধতির মাধ্যমে অর্থ উত্তোলনের অনুরোধ করতে পারবেন।',
        answerEn: 'Yes, verified members can withdraw funds via numerous domestic and international payment gateways.'
      },
      {
        id: 'c5q2',
        question: 'Q2. কোন কোন মাধ্যমে টাকা উত্তোলন করা যাবে?',
        questionEn: 'Q2. Which payment methods are supported?',
        answer: 'Fleearn-এ সমর্থিত পদ্ধতি হিসেবে bKash, Nagad, Rocket, Upay, CellFin, Sky Banking, Binance (USDT), RedotPay, Payoneer, Wise বা ব্যাংক ট্রান্সফারের মতো বিকল্প বিবেচিত হতে পারে।',
        answerEn: 'Supported gateways include bKash, Nagad, Rocket, Upay, CellFin, Sky Banking, Binance (USDT), RedotPay, Payoneer, PhonePe, and Direct Bank Wire.'
      },
      {
        id: 'c5q3',
        question: 'Q3. সর্বনিম্ন কত টাকা উত্তোলন করা যাবে?',
        questionEn: 'Q3. What is the minimum withdrawal limit?',
        answer: 'প্রতিটি পেমেন্ট পদ্ধতির জন্য নির্ধারিত ন্যূনতম উত্তোলন সীমা Withdrawal পেজে উল্লেখ থাকবে (যেমন মোবাইল ব্যাংকিংয়ে ১০০ টাকা বা $১ FSD থেকে শুরু)।',
        answerEn: 'Minimum thresholds depend on the gateway (e.g., $1-$5 FSD for mobile wallets, $10 for crypto).'
      },
      {
        id: 'c5q4',
        question: 'Q4. টাকা উত্তোলনের অনুরোধ কত সময়ে সম্পন্ন হয়?',
        questionEn: 'Q4. How long do withdrawal requests take?',
        answer: 'উত্তোলনের সময় পেমেন্ট পদ্ধতি, নিরাপত্তা যাচাই এবং সংশ্লিষ্ট পেমেন্ট সেবাদাতার প্রক্রিয়ার ওপর নির্ভর করে (সাধারণত ১৫ মিনিট থেকে ২৪ ঘণ্টা)।',
        answerEn: 'Automated gateway payouts take 15 to 60 minutes; manual bank transfers may require up to 24 hours.'
      },
      {
        id: 'c5q5',
        question: 'Q5. টাকা উত্তোলনের জন্য কি পরিচয় যাচাই প্রয়োজন?',
        questionEn: 'Q5. Is identity verification required for withdrawals?',
        answer: 'কিছু পেমেন্ট পদ্ধতি বা লেনদেনের ক্ষেত্রে পরিচয় যাচাই প্রয়োজন হতে পারে। প্রয়োজন হলে নির্ধারিত নির্দেশনা অনুসরণ করুন।',
        answerEn: 'Basic KYC (phone verification) is standard; higher volume tiers require photo ID verification.'
      },
      {
        id: 'c5q6',
        question: 'Q6. উত্তোলনের জন্য ভুল অ্যাকাউন্ট নম্বর দিলে কী হবে?',
        questionEn: 'Q6. What happens if I provide an incorrect wallet number?',
        answer: 'ভুল তথ্যের কারণে পেমেন্ট ব্যর্থ হতে পারে অথবা অর্থ ভুল গন্তব্যে চলে যেতে পারে। অনুরোধ জমা দেওয়ার আগে সব তথ্য ভালোভাবে যাচাই করুন।',
        answerEn: 'Transactions sent to valid third-party numbers cannot be reversed. Always double-check your account.'
      },
      {
        id: 'c5q7',
        question: 'Q7. টাকা উত্তোলনের ফি আছে কি?',
        questionEn: 'Q7. Are there withdrawal fees?',
        answer: 'পেমেন্ট পদ্ধতি, নেটওয়ার্ক এবং সংশ্লিষ্ট সেবাদাতার নিয়ম অনুযায়ী ফি প্রযোজ্য হতে পারে। অনুরোধ করার আগে প্রদর্শিত ফি দেখে নিন।',
        answerEn: 'Fee schedules match gateway network charges and are transparently displayed prior to submission.'
      },
      {
        id: 'c5q8',
        question: 'Q8. আমার উত্তোলনের অনুরোধ Pending দেখাচ্ছে কেন?',
        questionEn: 'Q8. Why is my withdrawal pending?',
        answer: 'অনুরোধটি যাচাই, অনুমোদন বা পেমেন্ট প্রক্রিয়াকরণের অপেক্ষায় থাকতে পারে।',
        answerEn: 'The transaction is in queue undergoing standard algorithmic compliance verification.'
      },
      {
        id: 'c5q9',
        question: 'Q9. উত্তোলন ব্যর্থ হলে কী করব?',
        questionEn: 'Q9. What should I do if a withdrawal fails?',
        answer: 'ব্যর্থতার কারণ পরীক্ষা করুন, পেমেন্টের তথ্য সঠিক কি না যাচাই করুন এবং প্রয়োজন হলে লেনদেনের রেফারেন্সসহ সাপোর্ট টিমে যোগাযোগ করুন।',
        answerEn: 'Funds automatically return to your available balance. Contact support if the issue persists.'
      },
      {
        id: 'c5q10',
        question: 'Q10. সব দেশে কি একই পেমেন্ট পদ্ধতি পাওয়া যাবে?',
        questionEn: 'Q10. Are all payout methods available worldwide?',
        answer: 'না। পেমেন্ট পদ্ধতির প্রাপ্যতা দেশ, মুদ্রা, স্থানীয় নিয়ম এবং সংশ্লিষ্ট সেবাদাতার সমর্থনের ওপর নির্ভর করবে।',
        answerEn: 'No, region-specific wallets (like bKash/Nagad) apply locally, while Binance/RedotPay/Payoneer serve global users.'
      }
    ]
  },
  {
    id: 'cat6',
    categoryName: 'Category 6: Referral Program (রেফারেল প্রোগ্রাম)',
    categoryNameEn: 'Category 6: Referral Program',
    items: [
      {
        id: 'c6q1',
        question: 'Q1. Fleearn Referral Program কী?',
        questionEn: 'Q1. What is the Fleearn Referral Program?',
        answer: 'এটি এমন একটি ব্যবস্থা, যার মাধ্যমে ব্যবহারকারীরা অন্যদের Fleearn-এ আমন্ত্রণ জানিয়ে নির্ধারিত শর্ত পূরণ হলে পুরস্কার পেতে পারেন।',
        answerEn: 'An affiliate reward system where you earn tiered commissions and bonuses by inviting friends.'
      },
      {
        id: 'c6q2',
        question: 'Q2. আমার রেফারেল লিংক কোথায় পাব?',
        questionEn: 'Q2. Where is my referral link located?',
        answer: 'Referral বা Invite Friends বিভাগে আপনার ব্যক্তিগত রেফারেল লিংক পাওয়া যেতে পারে।',
        answerEn: 'Inside the Mobile App or Web Dashboard under the "Invite & Earn" section.'
      },
      {
        id: 'c6q3',
        question: 'Q3. কীভাবে কাউকে রেফার করব?',
        questionEn: 'Q3. How do I invite new members?',
        answer: 'আপনার রেফারেল লিংক বন্ধু বা পরিচিতদের সঙ্গে শেয়ার করুন। তারা লিংক ব্যবহার করে নিবন্ধন করলে এবং প্রযোজ্য শর্ত পূরণ করলে রেফারেল গণনা হতে পারে।',
        answerEn: 'Share your link via WhatsApp, Telegram, or social media for automatic tracking.'
      },
      {
        id: 'c6q4',
        question: 'Q4. রেফারেল থেকে কত আয় করা যাবে?',
        questionEn: 'Q4. How much can I earn from referrals?',
        answer: 'রেফারেল পুরস্কারের পরিমাণ ও হিসাব Fleearn-এর চলমান রেফারেল নীতিমালা অনুযায়ী নির্ধারিত হবে।',
        answerEn: 'Top referrers earn up to 10%-15% lifetime task matching rewards plus milestone cash bonuses.'
      },
      {
        id: 'c6q5',
        question: 'Q5. রেফারেল পুরস্কার কখন পাওয়া যায়?',
        questionEn: 'Q5. When are referral rewards credited?',
        answer: 'আমন্ত্রিত ব্যবহারকারী প্রয়োজনীয় নিবন্ধন, যাচাই বা অন্যান্য শর্ত পূরণ করার পর পুরস্কার অনুমোদিত হতে পারে।',
        answerEn: 'Immediately upon your invited referee completing their first eligible activity.'
      },
      {
        id: 'c6q6',
        question: 'Q6. নিজের রেফারেল লিংক দিয়ে নিজেই অ্যাকাউন্ট খুলতে পারব?',
        questionEn: 'Q6. Can I refer myself using multiple emails?',
        answer: 'স্ব-রেফারেল কঠোরভাবে নিষিদ্ধ। অননুমোদিতভাবে রেফারেল তৈরি করলে সংশ্লিষ্ট অ্যাকাউন্ট ও অর্জিত পুরস্কার বাতিল করা হবে।',
        answerEn: 'Self-referral is strictly prohibited and results in permanent disqualification.'
      },
      {
        id: 'c6q7',
        question: 'Q7. ভুয়া অ্যাকাউন্ট দিয়ে রেফারেল করলে কী হবে?',
        questionEn: 'Q7. What happens if fake referral accounts are created?',
        answer: 'ভুয়া অ্যাকাউন্ট, কৃত্রিম কার্যক্রম বা রেফারেল ব্যবস্থার অপব্যবহার শনাক্ত হলে পুরস্কার বাতিল এবং অ্যাকাউন্ট সীমিত করা হতে পারে।',
        answerEn: 'Automated fraud detectors flag and ban associated accounts, forfeiting unpaid balances.'
      },
      {
        id: 'c6q8',
        question: 'Q8. আমার রেফারেল গণনা হচ্ছে না কেন?',
        questionEn: 'Q8. Why is my referral not appearing?',
        answer: 'রেফারেল লিংক সঠিকভাবে ব্যবহার না করা, নিবন্ধন অসম্পূর্ণ থাকা বা যোগ্যতার শর্ত পূরণ না হওয়ার কারণে এমন হতে পারে।',
        answerEn: 'The user may have used a different browser without your cookie or has not completed activation.'
      },
      {
        id: 'c6q9',
        question: 'Q9. রেফারেল লিংক কি সামাজিক যোগাযোগমাধ্যমে শেয়ার করা যাবে?',
        questionEn: 'Q9. Can I promote my referral link on social media?',
        answer: 'Fleearn-এর প্রচারনীতি মেনে অনুমোদিত সামাজিক যোগাযোগমাধ্যমে লিংক শেয়ার করতে পারবেন। স্প্যাম বা বিভ্রান্তিকর প্রচার করা যাবে না।',
        answerEn: 'Yes, legitimate promotions on YouTube, Facebook, and blogs are encouraged; spamming is forbidden.'
      },
      {
        id: 'c6q10',
        question: 'Q10. রেফারেল প্রোগ্রামের নিয়ম পরিবর্তন হতে পারে কি?',
        questionEn: 'Q10. Can referral terms change?',
        answer: 'হ্যাঁ। প্রযোজ্য শর্ত ও অফার পরিবর্তিত হতে পারে। সর্বশেষ নিয়ম জানতে Referral বিভাগের তথ্য দেখুন।',
        answerEn: 'Program parameters adapt to market dynamics, with any updates published on our notice board.'
      }
    ]
  },
  {
    id: 'cat7',
    categoryName: 'Category 7: Security & Privacy (নিরাপত্তা ও গোপনীয়তা)',
    categoryNameEn: 'Category 7: Security & Privacy',
    items: [
      {
        id: 'c7q1',
        question: 'Q1. Fleearn-এ আমার তথ্য কীভাবে সুরক্ষিত থাকবে?',
        questionEn: 'Q1. How is my personal data secured?',
        answer: 'Fleearn আধুনিক এনক্রিপশন (SSL 256-bit), নিরাপত্তা ফায়ারওয়াল এবং ডেটা প্রটেকশন নীতিমালার মাধ্যমে ব্যবহারকারীর তথ্য সুরক্ষিত রাখে।',
        answerEn: 'We employ enterprise-grade 256-bit SSL encryption, isolated database vaults, and strict access governance.'
      },
      {
        id: 'c7q2',
        question: 'Q2. Fleearn কি আমার পাসওয়ার্ড দেখতে পারে?',
        questionEn: 'Q2. Can Fleearn staff see my password?',
        answer: 'না। পাসওয়ার্ডগুলি সুরক্ষিত একমুখী ক্রিপ্টোগ্রাফিক হ্যাশ (Bcrypt) আকারে সংরক্ষিত থাকে, যা কেউ পড়তে পারে না।',
        answerEn: 'No. Passwords undergo irreversible salt hashing; no human can read your plain password.'
      },
      {
        id: 'c7q3',
        question: 'Q3. আমার অ্যাকাউন্ট হ্যাক হয়েছে সন্দেহ হলে কী করব?',
        questionEn: 'Q3. What should I do if I suspect an unauthorized intrusion?',
        answer: 'অবিলম্বে পাসওয়ার্ড পরিবর্তন করুন, সক্রিয় সেশন থেকে লগআউট করুন এবং দ্রুত সাপোর্ট টিমকে জানান।',
        answerEn: 'Immediately change your credentials, terminate all sessions in Settings, and notify support.'
      },
      {
        id: 'c7q4',
        question: 'Q4. Fleearn কি কখনো আমার OTP চাইবে?',
        questionEn: 'Q4. Will Fleearn representatives ever ask for my OTP?',
        answer: 'কখনোই না! Fleearn-এর কোনো প্রতিনিধি কখনো আপনার OTP, পিন বা পাসওয়ার্ড চাইবে না। কাউকে গোপন কোড দেবেন না।',
        answerEn: 'Never. Fleearn support agents will never ask for your one-time passwords, PINs, or security secrets.'
      },
      {
        id: 'c7q5',
        question: 'Q5. অ্যাকাউন্টে শক্তিশালী পাসওয়ার্ড কেন ব্যবহার করা উচিত?',
        questionEn: 'Q5. Why is a strong password essential?',
        answer: 'শক্তিশালী পাসওয়ার্ড ব্রুট-ফোর্স ও অননুমোদিত অ্যাক্সেস রোধ করে আপনার উপার্জিত অর্থ সুরক্ষিত রাখতে সহায়তা করে।',
        answerEn: 'Complex alphanumeric passwords protect your monetary balances from credential stuffing.'
      },
      {
        id: 'c7q6',
        question: 'Q6. Fleearn কি আমার ব্যক্তিগত তথ্য তৃতীয় পক্ষকে দিতে পারে?',
        questionEn: 'Q6. Does Fleearn share personal data with third parties?',
        answer: 'না, বাণিজ্যিক উদ্দেশ্যে ব্যক্তিগত তথ্য বিক্রি করা হয় না। শুধুমাত্র আইনগত বাধ্যবাধকতা বা অনুমোদিত পেমেন্ট প্রসেসিংয়ে তথ্য ব্যবহৃত হয়।',
        answerEn: 'We never sell your data to third-party marketers. Data is used exclusively for verified platform operations.'
      },
      {
        id: 'c7q7',
        question: 'Q7. সন্দেহজনক লিংক থেকে কীভাবে নিরাপদ থাকব?',
        questionEn: 'Q7. How to stay safe from phishing links?',
        answer: 'সর্বদা ব্রাউজারে অফিশিয়াল ডোমেইন fleearn.com পরীক্ষা করুন। কোনো সন্দেহজনক লিংকে লগইন তথ্য দেবেন না।',
        answerEn: 'Always verify the address bar shows the verified fleearn.com domain before entering details.'
      },
      {
        id: 'c7q8',
        question: 'Q8. Fleearn কি ১০০% নিরাপত্তার নিশ্চয়তা দেয়?',
        questionEn: 'Q8. Does Fleearn guarantee 100% cybersecurity immunity?',
        answer: 'কোনো সিস্টেমই সব ঝুঁকি সম্পূর্ণ দূর করতে পারে না। তবে Fleearn সর্বোচ্চ আন্তর্জাতিক নিরাপত্তা মান বজায় রাখে।',
        answerEn: 'While no digital system is impervious, we implement robust defense-in-depth security architecture.'
      },
      {
        id: 'c7q9',
        question: 'Q9. আমার অ্যাকাউন্টে অস্বাভাবিক কার্যক্রম দেখলে কী করব?',
        questionEn: 'Q9. What to do upon noticing suspicious account activity?',
        answer: 'পাসওয়ার্ড পরিবর্তন করুন, অ্যাকাউন্টের হিস্ট্রি পরীক্ষা করুন এবং আমাদের সিকিউরিটি ডেস্কে তাৎক্ষণিক রিপোর্ট করুন।',
        answerEn: 'Lock your withdrawal permissions and report the activity to security@fleearn.com.'
      },
      {
        id: 'c7q10',
        question: 'Q10. আমার ব্যক্তিগত তথ্য মুছে ফেলার অনুরোধ করতে পারব?',
        questionEn: 'Q10. Can I request data erasure under GDPR/Privacy rights?',
        answer: 'হ্যাঁ, প্রযোজ্য গোপনীয়তা আইন ও আমাদের প্রাইভেসি পলিসি অনুযায়ী ডেটা রিমুভালের আনুষ্ঠানিক আবেদন করতে পারবেন।',
        answerEn: 'Yes, submit a Data Deletion Request through privacy settings in compliance with privacy regulations.'
      }
    ]
  },
  {
    id: 'cat8',
    categoryName: 'Category 8: Tasks & Verification (কাজ ও যাচাই)',
    categoryNameEn: 'Category 8: Tasks & Verification',
    items: [
      {
        id: 'c8q1',
        question: 'Q1. কোনো কাজ শুরু করার আগে কী করা উচিত?',
        questionEn: 'Q1. What must be done before starting a task?',
        answer: 'কাজের নির্দেশিকা, যোগ্যতার শর্ত, সময়সীমা এবং কী প্রমাণ দিতে হবে তা মনোযোগ দিয়ে পড়ুন।',
        answerEn: 'Read all instructions, qualifying constraints, and mandatory proof requirements thoroughly.'
      },
      {
        id: 'c8q2',
        question: 'Q2. একটি কাজ সম্পন্ন হয়েছে কি না বুঝব কীভাবে?',
        questionEn: 'Q2. How do I know if my task is approved?',
        answer: 'টাস্ক ড্যাশবোর্ডে স্ট্যাটাস Completed, Pending বা Approved হিসেবে স্পষ্ট প্রদর্শিত হবে।',
        answerEn: 'The task status updates to "Under Review", "Completed", or "Approved" with timestamp.'
      },
      {
        id: 'c8q3',
        question: 'Q3. কাজ Reject হলে কী করব?',
        questionEn: 'Q3. What if my submission gets rejected?',
        answer: 'প্রত্যাখ্যানের কারণ পরীক্ষা করুন। শর্ত সঠিকভাবে পূরণ করে থাকলে রি-ভিউয়ের জন্য আপিল আবেদন করুন।',
        answerEn: 'Review the rejection note provided by the verifier and submit an appeal with additional proof.'
      },
      {
        id: 'c8q4',
        question: 'Q4. একটি কাজ কি একাধিকবার করা যাবে?',
        questionEn: 'Q4. Can a task be repeated multiple times?',
        answer: 'শুধুমাত্র যে কাজগুলোতে "Repeatable" ট্যাগ রয়েছে সেগুলো একাধিকবার সম্পন্ন করা যাবে।',
        answerEn: 'Only tasks specifically designated as recurring or repeatable can be performed multiple times.'
      },
      {
        id: 'c8q5',
        question: 'Q5. কাজ সম্পন্ন করার সময়সীমা থাকে কি?',
        questionEn: 'Q5. Is there a completion timer for tasks?',
        answer: 'হ্যাঁ, প্রতিটি কাজের জন্য কাউন্টডাউন টাইমার থাকে। নির্ধারিত সময়ের মধ্যে প্রমাণ জমা দিতে হবে।',
        answerEn: 'Yes, most assigned tasks feature a countdown timer ranging from 15 to 120 minutes.'
      },
      {
        id: 'c8q6',
        question: 'Q6. VPN ব্যবহার করে কাজ করা যাবে?',
        questionEn: 'Q6. Can I use a VPN while working?',
        answer: 'কাজের নিয়ম ও সেবাদাতার শর্ত অনুযায়ী নির্ধারিত হবে। অবস্থান লুকানোর জন্য অননুমোদিত VPN ব্যবহার নিষিদ্ধ।',
        answerEn: 'Using proxy/VPN servers to circumvent geographic restrictions is strictly against policy.'
      },
      {
        id: 'c8q7',
        question: 'Q7. কাজের জন্য স্ক্রিনশট দিতে হতে পারে কি?',
        questionEn: 'Q7. Is screenshot proof required?',
        answer: 'কিছু কাজের ক্ষেত্রে কাজ সম্পন্ন হওয়ার প্রামাণ্য স্ক্রিনশট আপলোড করতে হতে পারে।',
        answerEn: 'Yes, many advertisers require proof screenshots verifying final action completion.'
      },
      {
        id: 'c8q8',
        question: 'Q8. কাজের নির্দেশনা বুঝতে না পারলে কী করব?',
        questionEn: 'Q8. What if I do not understand task instructions?',
        answer: 'কাজের হেল্প আইকনে ক্লিক করুন অথবা সাপোর্ট টিকেট ওপেন করে পরামর্শ নিন। অসম্পূর্ণ কাজ জমা দেবেন না।',
        answerEn: 'Consult the task tutorial or reach out to community moderators before submitting.'
      },
      {
        id: 'c8q9',
        question: 'Q9. কাজের পুরস্কার পরিবর্তিত হতে পারে কি?',
        questionEn: 'Q9. Can task payouts fluctuate?',
        answer: 'বিজ্ঞাপনদাতার বাজেট বা ক্যাম্পেইনের পরিবর্তন সাপেক্ষে নতুন কাজের রেট পরিবর্তিত হতে পারে।',
        answerEn: 'Live payout rates correspond to current advertiser budgets and market bidding.'
      },
      {
        id: 'c8q10',
        question: 'Q10. কাজের মধ্যে সন্দেহজনক কিছু দেখলে কী করব?',
        questionEn: 'Q10. What if I find a suspicious or malicious task?',
        answer: 'অবিলম্বে কাজটি বন্ধ করুন এবং "Report Task" বাটনে ক্লিক করে অ্যাডমিনকে জানান।',
        answerEn: 'Stop working immediately and click the "Report Task" button to alert our security team.'
      }
    ]
  },
  {
    id: 'cat9',
    categoryName: 'Category 9: Technical Support (প্রযুক্তিগত সহায়তা)',
    categoryNameEn: 'Category 9: Technical Support',
    items: [
      {
        id: 'c9q1',
        question: 'Q1. Fleearn-এর ওয়েবসাইট খুলছে না কেন?',
        questionEn: 'Q1. Why is the Fleearn portal not opening?',
        answer: 'ইন্টারনেট সংযোগ, ব্রাউজার ক্যাশ বা সাময়িক সার্ভার রক্ষণাবেক্ষণের কারণে হতে পারে। কিছুক্ষণ পর রিফ্রেশ করুন।',
        answerEn: 'Check your internet connection, clear cache, or refresh after brief scheduled maintenance.'
      },
      {
        id: 'c9q2',
        question: 'Q2. অ্যাপ বা ওয়েবসাইট ধীরগতিতে কাজ করলে কী করব?',
        questionEn: 'Q2. What if the app or website is running slowly?',
        answer: 'ব্রাউজার ক্যাশ ক্লিয়ার করুন, অ্যাপের লেটেস্ট ভার্সন ইনস্টল করুন এবং ইন্টারনেটের গতি পরীক্ষা করুন।',
        answerEn: 'Clear stored cache, upgrade to the latest APK version, and check data latency.'
      },
      {
        id: 'c9q3',
        question: 'Q3. Fleearn ব্যবহার করতে কোন ব্রাউজার ব্যবহার করব?',
        questionEn: 'Q3. Which browsers are recommended?',
        answer: 'Google Chrome, Mozilla Firefox, Microsoft Edge বা Apple Safari-র আপডেটেড ভার্সন সবচেয়ে ভালো কাজ করে।',
        answerEn: 'Latest versions of Chrome, Edge, Safari, or Firefox provide optimal WebGL performance.'
      },
      {
        id: 'c9q4',
        question: 'Q4. কোনো বাটনে ক্লিক করলে কাজ হচ্ছে না কেন?',
        questionEn: 'Q4. Why is a button not responding to clicks?',
        answer: 'নেটওয়ার্ক সংযোগ বা অ্যাডব্লকারের কারণে হতে পারে। পেজ রিফ্রেশ করুন এবং অ্যাডব্লকার সাময়িক বন্ধ করুন।',
        answerEn: 'Disable conflicting ad blockers and reload the page to ensure complete script execution.'
      },
      {
        id: 'c9q5',
        question: 'Q5. Fleearn-এর নোটিফিকেশন পাচ্ছি না কেন?',
        questionEn: 'Q5. Why am I not receiving notifications?',
        answer: 'ডিভাইস সেটিংস থেকে Fleearn অ্যাপের Notification Permission অন আছে কি না তা যাচাই করুন।',
        answerEn: 'Ensure push notification permissions are enabled in your mobile OS application settings.'
      },
      {
        id: 'c9q6',
        question: 'Q6. ইমেইল নোটিফিকেশন না পেলে কী করব?',
        questionEn: 'Q6. What if I do not receive email alerts?',
        answer: 'আপনার স্প্যাম/জাঙ্ক ফোল্ডার চেক করুন এবং info@fleearn.com-কে সেফ কন্টাক্ট হিসেবে অ্যাড করুন।',
        answerEn: 'Inspect your spam inbox and whitelist notifications@fleearn.com.'
      },
      {
        id: 'c9q7',
        question: 'Q7. একটি সমস্যা রিপোর্ট করতে কী কী তথ্য দেব?',
        questionEn: 'Q7. What details should I include when reporting a bug?',
        answer: 'সমস্যার বিবরণ, স্ক্রিনশট, ডিভাইসের মডেল, ব্রাউজারের নাম এবং এরর মেসেজ উল্লেখ করুন।',
        answerEn: 'Provide a summary of the issue, device model, operating system, and screenshot error logs.'
      },
      {
        id: 'c9q8',
        question: 'Q8. Fleearn কি সব ধরনের ফোনে কাজ করবে?',
        questionEn: 'Q8. Does Fleearn work on all smartphones?',
        answer: 'Android 8.0 বা তার পরবর্তী যেকোনো স্মার্টফোনে আমাদের অফিশিয়াল APK অত্যন্ত মসৃণভাবে চলবে।',
        answerEn: 'Yes, any device with modern HTML5 support or Android 8.0+ operates seamlessly.'
      },
      {
        id: 'c9q9',
        question: 'Q9. একই সমস্যা বারবার হলে কী করব?',
        questionEn: 'Q9. What if the same error recurs continually?',
        answer: 'অ্যাপটি আনইনস্টল করে আমাদের ওয়েবসাইট থেকে লেটেস্ট APK পুনরায় ইনস্টল করুন বা সাপোর্টে জানান।',
        answerEn: 'Reinstall the freshest release APK directly from our Mobile App download page.'
      },
      {
        id: 'c9q10',
        question: 'Q10. Fleearn-এর কোনো ফিচার কাজ না করলে কী করব?',
        questionEn: 'Q10. What if a specific feature is unresponsive?',
        answer: 'ফিচারটি সাময়িক মেইনটেন্যান্সে থাকতে পারে। সিস্টেম নোটিশ চেক করুন অথবা সাপোর্টে বার্তা দিন।',
        answerEn: 'Check our live System Notices to see if scheduled maintenance is currently underway.'
      }
    ]
  },
  {
    id: 'cat10',
    categoryName: 'Category 10: Customer Support & Policies (গ্রাহক সহায়তা ও নীতিমালা)',
    categoryNameEn: 'Category 10: Customer Support & Policies',
    items: [
      {
        id: 'c10q1',
        question: 'Q1. Fleearn-এর সাপোর্ট টিমের সঙ্গে যোগাযোগ করব কীভাবে?',
        questionEn: 'Q1. How can I reach Fleearn customer support?',
        answer: 'অ্যাপের ভেতর ২৪/৭ লাইভ সাপোর্ট টিকিট, ইমেইল বা ওয়েবসাইটের সাপোর্ট বক্সের মাধ্যমে সরাসরি যোগাযোগ করা যায়।',
        answerEn: 'Through our 24/7 dedicated support desk, email at support@fleearn.com, or website forms.'
      },
      {
        id: 'c10q2',
        question: 'Q2. সাপোর্ট টিম কত দ্রুত উত্তর দেবে?',
        questionEn: 'Q2. What is the average response time?',
        answer: 'সাধারণত সাধারণ টিকিটে ১৫ মিনিট থেকে ৪ ঘণ্টার মধ্যে এবং জটিল বিষয়ে সর্বোচ্চ ২৪ ঘণ্টার মধ্যে সমাধান দেওয়া হয়।',
        answerEn: 'Average initial response is under 30 minutes, with resolution within 4-12 business hours.'
      },
      {
        id: 'c10q3',
        question: 'Q3. সাপোর্টে অভিযোগ জানাতে কী তথ্য প্রয়োজন?',
        questionEn: 'Q3. What information is needed for filing a complaint?',
        answer: 'আপনার অ্যাকাউন্ট ইউজারনেম, ট্রানজেকশন/টাস্ক আইডি এবং সমস্যার বিস্তারিত বিবরণ জমা দিতে হবে।',
        answerEn: 'Your registered account ID, relevant transaction hash or task ID, and a clear explanation.'
      },
      {
        id: 'c10q4',
        question: 'Q4. একই অভিযোগ একাধিকবার পাঠানো উচিত কি?',
        questionEn: 'Q4. Should I submit duplicate tickets for the same issue?',
        answer: 'না, একই বিষয়ে একটি টিকিট রাখাই শ্রেয়। একাধিক টিকিট দিলে রেসপন্সে বিলম্ব হতে পারে।',
        answerEn: 'No, duplicate tickets slow queue processing. Updates should be appended to the existing ticket.'
      },
      {
        id: 'c10q5',
        question: 'Q5. Fleearn-এর Terms of Service কোথায় পাওয়া যাবে?',
        questionEn: 'Q5. Where are Fleearn’s Terms of Service located?',
        answer: 'ওয়েবসাইট ও অ্যাপের ফুটার সেকশনে "গুরুত্বপূর্ণ ডকুমেন্টস" পেজে সম্পূর্ণ শর্তাবলি পাওয়া যাবে।',
        answerEn: 'Under the "Important Documents" navigation link and in the footer of every page.'
      },
      {
        id: 'c10q6',
        question: 'Q6. Privacy Policy কেন পড়ব?',
        questionEn: 'Q6. Why should I read the Privacy Policy?',
        answer: 'আপনার ব্যক্তিগত ও আর্থিক তথ্য কীভাবে সংরক্ষিত ও সুরক্ষিত থাকে তা স্পষ্টভাবে জানতে প্রাইভেসি পলিসি পড়া জরুরি।',
        answerEn: 'To fully understand how your digital credentials, identity, and financial data are secured.'
      },
      {
        id: 'c10q7',
        question: 'Q7. Fleearn-এর নিয়ম ভঙ্গ করলে কী হতে পারে?',
        questionEn: 'Q7. What are the consequences of policy violations?',
        answer: 'সতর্কবার্তা, উপার্জিত বোনাস বাতিল, পেমেন্ট স্থগিতকরণ বা অ্যাকাউন্ট স্থায়ীভাবে ব্যান করা হতে পারে।',
        answerEn: 'Penalties range from formal warnings and reward forfeitures to permanent hardware account bans.'
      },
      {
        id: 'c10q8',
        question: 'Q8. Fleearn-এর বিরুদ্ধে অভিযোগ জানানোর ব্যবস্থা থাকবে কি?',
        questionEn: 'Q8. Is there an ombudsman or dispute escalation channel?',
        answer: 'হ্যাঁ, আমাদের সিনিয়র গভর্নেন্স টিমের কাছে অভিযোগ পর্যালোচনার জন্য কমপ্লেন ফরম উপলব্ধ রয়েছে।',
        answerEn: 'Yes, users can escalate disputed support decisions directly to our Senior Compliance Board.'
      },
      {
        id: 'c10q9',
        question: 'Q9. Fleearn কি তার নীতিমালা পরিবর্তন করতে পারে?',
        questionEn: 'Q9. Can Fleearn revise its operating policies?',
        answer: 'হ্যাঁ, আইনি ও পরিচালন সংক্রান্ত প্রয়োজনে নীতিমালা হালনাগাদ করা হতে পারে এবং নোটিশ বোর্ডে তা আগাম জানানো হয়।',
        answerEn: 'Yes, policies update periodically and are announced 7 days prior on our official Notice Board.'
      },
      {
        id: 'c10q10',
        question: 'Q10. Fleearn-এর সর্বশেষ নিয়ম ও তথ্য কোথায় পাব?',
        questionEn: 'Q10. Where to find the most current guidelines and news?',
        answer: 'ওয়েবসাইটের নোটিশ পেজ, FAQ বিভাগ এবং অফিসিয়াল সামাজিক মাধ্যমে সবসময় হালনাগাদ তথ্য দেখতে পাবেন।',
        answerEn: 'Always check our live Notice Board, FAQ section, and in-app alerts for real-time announcements.'
      }
    ]
  }
];
