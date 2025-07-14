
export const INSPIRATIONAL_QUOTES: string[] = [
  "The best way to predict the future is to create it.",
  "Believe you can and you're halfway there.",
  "Embrace the glorious mess that you are.",
  "You are stronger than you think.",
  "Every day is a new beginning, tend to it with love.",
  "Listen to your body; it's wiser than you think.",
  "Self-care is not selfish, it's essential."
];

export const FUN_FACTS: string[] = [
  "The average menstrual cycle is 28 days long, but can range from 21 to 35 days.",
  "Ovulation usually occurs about 14 days before your period starts.",
  "Menstruation is a natural and healthy part of life for many.",
  "The color of menstrual blood can vary throughout your period.",
  "Some people experience 'period brain', a feeling of fogginess, which is totally normal.",
  "Historically, many cultures have had unique rituals and views on menstruation."
];

export type QuizQuestion = {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

export const STATIC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    questionText: "What is the typical length of a menstrual cycle?",
    options: ["14 days", "28 days", "40 days", "7 days"],
    correctAnswerIndex: 1,
    explanation: "While cycles can range from 21 to 35 days, 28 days is the average length used as a general guideline."
  },
  {
    questionText: "Which hormone is dominant during the follicular phase (before ovulation)?",
    options: ["Progesterone", "Testosterone", "Estrogen", "Cortisol"],
    correctAnswerIndex: 2,
    explanation: "Estrogen is the primary hormone during the follicular phase, responsible for thickening the uterine lining."
  },
  {
    questionText: "Which of these is a common symptom of Premenstrual Syndrome (PMS)?",
    options: ["Increased energy", "Mood swings", "Hair growth", "Improved memory"],
    correctAnswerIndex: 1,
    explanation: "Mood swings, bloating, and fatigue are common symptoms of PMS, caused by hormonal fluctuations."
  },
  {
    questionText: "What is ovulation?",
    options: ["The start of a period", "The release of an egg from the ovary", "The shedding of the uterine lining", "The end of the fertile window"],
    correctAnswerIndex: 1,
    explanation: "Ovulation is the key event in the menstrual cycle where a mature egg is released from an ovary, making pregnancy possible."
  },
  {
    questionText: "Which of these can help alleviate menstrual cramps?",
    options: ["Drinking more caffeine", "Avoiding exercise", "Using a heating pad", "Eating more sugar"],
    correctAnswerIndex: 2,
    explanation: "Applying heat with a heating pad or warm bath can help relax the uterine muscles and relieve cramp pain. Gentle exercise can also help."
  },
  {
    questionText: "Which of these conditions involves tissue growing outside the uterus?",
    options: ["Fibroids", "Endometriosis", "PCOS", "Ectopic pregnancy"],
    correctAnswerIndex: 1,
    explanation: "Endometriosis is a condition where tissue similar to the lining inside the uterus grows outside the uterus."
  },
  {
    questionText: "Which nutrient helps reduce bloating and muscle cramps?",
    options: ["Magnesium", "Vitamin K", "Sodium", "Glucose"],
    correctAnswerIndex: 0,
    explanation: "Magnesium is known to help relax muscles and can reduce bloating and cramps associated with menstruation."
  },
  {
    questionText: "How does physical activity affect menstruation?",
    options: ["It worsens symptoms", "It helps reduce cramps", "It causes heavy flow", "It delays periods permanently"],
    correctAnswerIndex: 1,
    explanation: "Gentle physical activity can increase blood flow and release endorphins, which helps in reducing menstrual cramps."
  },
  {
    questionText: "Can poor hygiene during menstruation cause infection?",
    options: ["No", "Yes", "Only in cold weather", "Only in adults"],
    correctAnswerIndex: 1,
    explanation: "Poor hygiene can lead to bacterial growth and increase the risk of infections like bacterial vaginosis or urinary tract infections."
  },
  {
    questionText: "Why might periods stop suddenly?",
    options: ["Change in hair color", "Extreme weight loss or stress", "Increase in water intake", "Frequent exercise"],
    correctAnswerIndex: 1,
    explanation: "Significant stressors on the body, such as extreme weight loss or high levels of stress, can disrupt the hormonal balance and cause periods to stop."
  },
  {
    questionText: "What is implantation bleeding?",
    options: ["Heavy period", "Early light spotting", "Menopause bleeding", "Bleeding from injury"],
    correctAnswerIndex: 1,
    explanation: "Implantation bleeding is light spotting that can occur when a fertilized egg attaches to the lining of the uterus."
  },
  {
    questionText: "Which of these is a hormonal contraceptive that can affect the cycle?",
    options: ["Painkiller", "Antibiotic", "Birth control pill", "Vitamin C"],
    correctAnswerIndex: 2,
    explanation: "Birth control pills contain hormones that regulate the menstrual cycle and prevent ovulation."
  },
  {
    questionText: "What’s the average number of eggs released per cycle?",
    options: ["5", "2", "1", "10"],
    correctAnswerIndex: 2,
    explanation: "Typically, only one egg is released from the ovaries during each menstrual cycle."
  },
  {
    questionText: "Which of the following may help regulate periods?",
    options: ["Smoking", "Balanced diet", "Skipping meals", "Dehydration"],
    correctAnswerIndex: 1,
    explanation: "A balanced diet provides the necessary nutrients for hormone production and can help in regulating the menstrual cycle."
  },
  {
    questionText: "Is it normal for periods to be irregular during puberty?",
    options: ["No", "Yes", "Only in adults", "Only in winter"],
    correctAnswerIndex: 1,
    explanation: "It is very common for menstrual cycles to be irregular for the first few years after puberty begins as the body's hormones regulate."
  },
  {
    questionText: "Which of these hormones decreases before menstruation starts?",
    options: ["Cortisol", "Estrogen and progesterone", "Testosterone", "Adrenaline"],
    correctAnswerIndex: 1,
    explanation: "A drop in estrogen and progesterone levels signals the uterus to shed its lining, which starts menstruation."
  },
  {
    questionText: "Which of the following can help track ovulation?",
    options: ["Sleeping habits", "Basal body temperature", "Nail growth", "Earwax color"],
    correctAnswerIndex: 1,
    explanation: "Tracking basal body temperature, which is your body's lowest resting temperature, can show a slight increase after ovulation."
  },
  {
    questionText: "Which is a sign of a healthy menstrual cycle?",
    options: ["Extreme cramps", "Heavy clots", "Regular cycles with manageable flow", "Bleeding longer than 10 days"],
    correctAnswerIndex: 2,
    explanation: "A healthy cycle is generally regular, with a manageable flow and mild, tolerable symptoms."
  },
  {
    questionText: "Which of these is a normal period color?",
    options: ["Neon pink", "Bright red to dark brown", "Blue", "Green"],
    correctAnswerIndex: 1,
    explanation: "Menstrual blood can vary in color from bright red at the beginning to dark brown towards the end of the period."
  },
  {
    questionText: "What is the main cause of primary dysmenorrhea?",
    options: ["Uterine fibroids", "Endometriosis", "Prostaglandin overproduction", "Hormone replacement"],
    correctAnswerIndex: 2,
    explanation: "Primary dysmenorrhea (common menstrual cramps) is caused by the overproduction of prostaglandins, which cause uterine contractions."
  },
  {
    questionText: "Which phase follows menstruation in the cycle?",
    options: ["Luteal", "Ovulation", "Follicular", "Pre-menstrual"],
    correctAnswerIndex: 2,
    explanation: "The follicular phase starts on the first day of menstruation and lasts until ovulation."
  },
  {
    questionText: "How can smoking affect menstruation?",
    options: ["It regulates the cycle", "It makes the flow healthier", "It can lead to irregular periods", "It has no effect"],
    correctAnswerIndex: 2,
    explanation: "Smoking can affect hormone levels, potentially leading to shorter, more irregular menstrual cycles."
  },
  {
    questionText: "Why might someone miss their period besides pregnancy?",
    options: ["Regular sleep", "Low stress", "Hormonal imbalance", "Drinking water"],
    correctAnswerIndex: 2,
    explanation: "Hormonal imbalances, often caused by stress, diet, or medical conditions, are a common reason for missing a period."
  },
  {
    questionText: "How can periods impact school attendance in some countries?",
    options: ["No effect", "Increased performance", "Absenteeism due to stigma or lack of facilities", "Better health"],
    correctAnswerIndex: 2,
    explanation: "In many parts of the world, lack of access to menstrual products and sanitary facilities, along with cultural stigma, causes students to miss school."
  },
  {
    questionText: "How often should a menstrual cup be emptied?",
    options: ["Every hour", "Every 4–12 hours", "Once per period", "Only at night"],
    correctAnswerIndex: 1,
    explanation: "Depending on flow, a menstrual cup should typically be emptied every 4 to 12 hours."
  },
  {
    questionText: "Which of the following may indicate an underlying condition?",
    options: ["Light bleeding for 3 days", "Periods with large clots", "Mild cramps", "Regular 28-day cycle"],
    correctAnswerIndex: 1,
    explanation: "While small clots can be normal, consistently passing large clots may indicate an underlying issue like fibroids or menorrhagia."
  },
  {
    questionText: "What helps reduce menstrual bloating?",
    options: ["Salty snacks", "Staying sedentary", "Staying hydrated", "Sugary drinks"],
    correctAnswerIndex: 2,
    explanation: "Staying hydrated by drinking plenty of water can help flush out excess sodium and reduce water retention and bloating."
  },
  {
    questionText: "What does anovulation mean?",
    options: ["Menopause", "No menstruation", "No ovulation during a cycle", "Excessive cramps"],
    correctAnswerIndex: 2,
    explanation: "Anovulation is the term for a menstrual cycle in which the ovaries do not release an egg."
  },
  {
    questionText: "Which mineral can help reduce PMS symptoms?",
    options: ["Sodium", "Zinc", "Mercury", "Chlorine"],
    correctAnswerIndex: 1,
    explanation: "Zinc has been shown to help reduce some PMS symptoms like cramping and bloating."
  },
  {
    questionText: "What is a sign of toxic shock syndrome (TSS)?",
    options: ["Sneezing", "Sudden high fever", "Diarrhea", "Dry mouth"],
    correctAnswerIndex: 1,
    explanation: "TSS is a rare but serious condition, and its symptoms include a sudden high fever, rash, and low blood pressure."
  },
  {
    questionText: "Which menstrual product is internal?",
    options: ["Pad", "Tampon", "Panty liner", "Towel"],
    correctAnswerIndex: 1,
    explanation: "Tampons are designed to be worn internally to absorb menstrual flow."
  },
  {
    questionText: "Why might adolescent girls have irregular periods?",
    options: ["Poor hygiene", "Hormonal fluctuations", "Disease", "Normal blood sugar"],
    correctAnswerIndex: 1,
    explanation: "During adolescence, the body's hormonal system is still maturing, which often leads to irregular periods."
  },
  {
    questionText: "Which of these hormones is highest just before ovulation?",
    options: ["LH", "Cortisol", "Insulin", "Prolactin"],
    correctAnswerIndex: 0,
    explanation: "A surge in Luteinizing Hormone (LH) is what triggers the ovary to release an egg."
  },
  {
    questionText: "When is the uterus lining at its thickest?",
    options: ["After menstruation", "Before menstruation", "During ovulation", "During cramps"],
    correctAnswerIndex: 1,
    explanation: "The uterine lining (endometrium) thickens throughout the cycle and is at its thickest just before menstruation begins, in preparation for a potential pregnancy."
  },
  {
    questionText: "Why are iron-rich foods important during periods?",
    options: ["They control hormones", "They relieve cramps", "They prevent anemia", "They increase flow"],
    correctAnswerIndex: 2,
    explanation: "Menstrual bleeding leads to iron loss, so eating iron-rich foods helps to replenish stores and prevent iron-deficiency anemia."
  },
  {
    questionText: "Which of these is not a menstrual disorder?",
    options: ["Dysmenorrhea", "Amenorrhea", "Insomnia", "Menorrhagia"],
    correctAnswerIndex: 2,
    explanation: "While insomnia can be a symptom of PMS, it is not classified as a menstrual disorder itself. The others relate to painful, absent, or heavy periods."
  },
  {
    questionText: "What is the role of progesterone after ovulation?",
    options: ["To increase blood pressure", "To thicken cervical mucus", "To support the uterine lining", "To initiate menstruation"],
    correctAnswerIndex: 2,
    explanation: "After ovulation, progesterone rises to help maintain the uterine lining, making it receptive for a fertilized egg."
  },
  {
    questionText: "How can weight affect periods?",
    options: ["No effect", "Both underweight and overweight can cause irregularities", "Only underweight matters", "Only overweight matters"],
    correctAnswerIndex: 1,
    explanation: "Body fat levels influence hormone production, so both being significantly underweight or overweight can disrupt the menstrual cycle."
  },
  {
    questionText: "Which of these can regulate hormone levels naturally?",
    options: ["Fast food", "Balanced diet and exercise", "Late nights", "Skipping meals"],
    correctAnswerIndex: 1,
    explanation: "A healthy lifestyle, including a balanced diet and regular exercise, is key to supporting hormonal balance."
  },
  {
    questionText: "Which tool is commonly used to estimate fertile days?",
    options: ["Blood pressure monitor", "Ovulation calendar/app", "Thermometer", "Spoon test"],
    correctAnswerIndex: 1,
    explanation: "Ovulation calendars and tracking apps are popular tools for predicting the fertile window based on cycle data."
  },
  {
    questionText: "Can some people get pregnant without regular periods?",
    options: ["Yes, ovulation can still occur", "No, it’s impossible", "Only at menopause", "Only with medication"],
    correctAnswerIndex: 0,
    explanation: "Yes, it is possible. Ovulation can still occur, even if it's irregular and not followed by a predictable period."
  },
  {
    questionText: "What is a common cause of secondary dysmenorrhea?",
    options: ["Hormonal birth control", "Lack of ovulation", "Endometriosis", "Water retention"],
    correctAnswerIndex: 2,
    explanation: "Secondary dysmenorrhea (cramps that develop later in life) is often caused by a physical condition, such as endometriosis or fibroids."
  },
  {
    questionText: "What happens to the egg if it is not fertilized?",
    options: ["It implants in uterus", "It dissolves and is shed with the lining", "It becomes a cyst", "It stays until the next cycle"],
    correctAnswerIndex: 1,
    explanation: "If the egg is not fertilized, it disintegrates and is shed from the body along with the uterine lining during menstruation."
  },
  {
    questionText: "How can periods help indicate reproductive health?",
    options: ["By their timing and symptoms", "By their color", "By their smell", "By the pad used"],
    correctAnswerIndex: 0,
    explanation: "The regularity, flow, and symptoms of your menstrual cycle can provide important clues about your overall reproductive health."
  },
  {
    questionText: "Which of the following may reduce menstrual migraines?",
    options: ["Caffeine", "Cold drinks", "Magnesium supplements", "Sugar"],
    correctAnswerIndex: 2,
    explanation: "Magnesium has been shown to help in the prevention and reduction of menstrual migraines for some individuals."
  },
  {
    questionText: "How many phases are in the menstrual cycle?",
    options: ["2", "3", "4", "5"],
    correctAnswerIndex: 2,
    explanation: "The menstrual cycle is typically divided into four main phases: menstruation, the follicular phase, ovulation, and the luteal phase."
  },
  {
    questionText: "Which of these is not a symptom of PMS?",
    options: ["Cramps", "Mood swings", "Increased intelligence", "Bloating"],
    correctAnswerIndex: 2,
    explanation: "Increased intelligence is not a recognized symptom of Premenstrual Syndrome (PMS)."
  },
  {
    questionText: "Which gland secretes estrogen?",
    options: ["Pancreas", "Thyroid", "Ovaries", "Brain"],
    correctAnswerIndex: 2,
    explanation: "The ovaries are the primary producers of the hormone estrogen in the female body."
  },
  {
    questionText: "What is a normal interval between periods?",
    options: ["10–15 days", "21–35 days", "40–60 days", "60–90 days"],
    correctAnswerIndex: 1,
    explanation: "For most adults, a normal cycle length, or the interval between periods, is between 21 and 35 days."
  },
  {
    questionText: "Which of these foods helps with iron absorption?",
    options: ["Milk", "Citrus fruits", "Fried food", "Carbonated drinks"],
    correctAnswerIndex: 1,
    explanation: "Citrus fruits are high in Vitamin C, which significantly enhances the body's ability to absorb iron from plant-based foods."
  },
  {
    questionText: "Which phase is characterized by high progesterone?",
    options: ["Follicular", "Menstrual", "Ovulatory", "Luteal"],
    correctAnswerIndex: 3,
    explanation: "The luteal phase, which occurs after ovulation, is characterized by high levels of progesterone."
  },
  {
    questionText: "Why do girls experience breast tenderness before their period?",
    options: ["Water intake", "Infection", "Hormonal changes", "Low sugar"],
    correctAnswerIndex: 2,
    explanation: "Rising levels of hormones, particularly progesterone, before a period can cause breast tissue to swell and feel tender."
  },
  {
    questionText: "Which of these can increase menstrual flow?",
    options: ["Iron supplements", "Blood thinners", "Sleep", "Low-carb diet"],
    correctAnswerIndex: 1,
    explanation: "Medications that thin the blood (anticoagulants) can sometimes lead to a heavier menstrual flow."
  },
  {
    questionText: "How long does the luteal phase usually last?",
    options: ["7 days", "14 days", "21 days", "28 days"],
    correctAnswerIndex: 1,
    explanation: "The luteal phase is typically the most consistent part of the cycle, lasting about 14 days for most people."
  },
  {
    questionText: "Which is a possible emotional symptom during PMS?",
    options: ["Euphoria", "Irritability", "Memory loss", "Confusion"],
    correctAnswerIndex: 1,
    explanation: "Irritability is a very common emotional symptom of PMS, caused by fluctuating hormone levels."
  },
  {
    questionText: "What’s one sign your period may be too heavy?",
    options: ["Needing 1 pad per day", "Changing pad every 1–2 hours", "Mild cramps", "2-day period"],
    correctAnswerIndex: 1,
    explanation: "Needing to change your pad or tampon every one to two hours is a sign of menorrhagia, or an unusually heavy period."
  },
  {
    questionText: "Which hormone drops if there's no pregnancy?",
    options: ["Progesterone", "Testosterone", "Insulin", "Melatonin"],
    correctAnswerIndex: 0,
    explanation: "If pregnancy doesn't occur, progesterone levels drop, triggering the breakdown of the uterine lining and the start of a period."
  },
  {
    questionText: "What may happen during ovulation pain (mittelschmerz)?",
    options: ["Pain on one side of abdomen", "Vomiting", "Nosebleed", "Numbness"],
    correctAnswerIndex: 0,
    explanation: "Mittelschmerz is a one-sided, lower abdominal pain that some people experience at the time of ovulation."
  },
  {
    questionText: "Which of these is used to predict ovulation by temperature changes?",
    options: ["Rectal monitor", "Basal body thermometer", "Stopwatch", "Hormone app"],
    correctAnswerIndex: 1,
    explanation: "A basal body thermometer is sensitive enough to detect the slight rise in temperature that occurs after ovulation."
  },
  {
    questionText: "Why is sleep important during menstruation?",
    options: ["Lowers hormone levels", "Reduces mood swings and cramps", "Stops ovulation", "Causes early periods"],
    correctAnswerIndex: 1,
    explanation: "Getting adequate sleep can help manage mood swings, reduce fatigue, and may even help lessen the severity of cramps."
  },
  {
    questionText: "What is the function of GnRH?",
    options: ["Starts pregnancy", "Stimulates FSH and LH production", "Stops menstruation", "Regulates digestion"],
    correctAnswerIndex: 1,
    explanation: "Gonadotropin-releasing hormone (GnRH) is released from the brain and stimulates the pituitary gland to produce FSH and LH, which drive the menstrual cycle."
  },
  {
    questionText: "Which nutrient supports uterine muscle function?",
    options: ["Potassium", "Magnesium", "Lead", "Sodium"],
    correctAnswerIndex: 1,
    explanation: "Magnesium plays a crucial role in muscle function and relaxation, which is why it can help with uterine cramps."
  },
  {
    questionText: "What is a normal range for period length?",
    options: ["1–2 days", "2–7 days", "7–14 days", "10–20 days"],
    correctAnswerIndex: 1,
    explanation: "The duration of menstrual bleeding is typically between 2 and 7 days."
  },
  {
    questionText: "Which country removed taxes on menstrual products first?",
    options: ["India", "Kenya", "USA", "UK"],
    correctAnswerIndex: 1,
    explanation: "Kenya was the first country in the world to end value-added tax (VAT) on menstrual products, back in 2004."
  },
  {
    questionText: "Which protein can be lost in large amounts during heavy flow?",
    options: ["Albumin", "Hemoglobin", "Myosin", "Keratin"],
    correctAnswerIndex: 1,
    explanation: "Hemoglobin is the protein in red blood cells that carries oxygen, and significant amounts can be lost during heavy menstrual bleeding, leading to anemia."
  },
  {
    questionText: "Why is stigma around menstruation harmful?",
    options: ["It improves awareness", "It reduces confidence and access to care", "It promotes education", "It saves resources"],
    correctAnswerIndex: 1,
    explanation: "Stigma can prevent people from seeking medical care, accessing education, and can negatively impact mental health and confidence."
  },
  {
    questionText: "What is menometrorrhagia?",
    options: ["Short periods", "Heavy and irregular bleeding", "Bleeding after menopause", "Bleeding only in teens"],
    correctAnswerIndex: 1,
    explanation: "Menometrorrhagia is a condition characterized by menstrual bleeding that is both excessively heavy and irregular."
  },
  {
    questionText: "How often should reusable pads be washed?",
    options: ["Every 3 days", "After each use", "Weekly", "Monthly"],
    correctAnswerIndex: 1,
    explanation: "For proper hygiene, reusable menstrual pads should be washed after each use."
  },
  {
    questionText: "Which vitamin supports hormone regulation during the menstrual cycle?",
    options: ["Vitamin B6", "Vitamin C", "Vitamin D", "Vitamin A"],
    correctAnswerIndex: 0,
    explanation: "Vitamin B6 is involved in the synthesis of neurotransmitters and can help regulate hormonal activity and alleviate PMS symptoms."
  },
  {
    questionText: "Which phase of the cycle includes menstruation and follicular growth?",
    options: ["Luteal", "Ovulatory", "Follicular", "Secretory"],
    correctAnswerIndex: 2,
    explanation: "The follicular phase begins on day one of menstruation and continues until ovulation. It's when the follicles in the ovary mature."
  },
  {
    questionText: "Which of the following helps relieve menstrual migraines?",
    options: ["Processed meat", "Dark chocolate", "Carbonated drinks", "Fried snacks"],
    correctAnswerIndex: 1,
    explanation: "Dark chocolate is a source of magnesium, which can help relax blood vessels and may relieve menstrual migraines."
  },
  {
    questionText: "Which of these is a non-hormonal method to manage heavy periods?",
    options: ["Birth control", "Iron supplements", "Tranexamic acid", "Progesterone shots"],
    correctAnswerIndex: 2,
    explanation: "Tranexamic acid is a non-hormonal medication that helps blood to clot and can reduce heavy menstrual bleeding."
  },
  {
    questionText: "What causes the thickening of the uterine lining?",
    options: ["LH", "Estrogen", "FSH", "Testosterone"],
    correctAnswerIndex: 1,
    explanation: "Estrogen is the hormone responsible for rebuilding and thickening the endometrium (uterine lining) after menstruation."
  },
  {
    questionText: "What’s a good exercise during periods?",
    options: ["Intense cardio", "Light walking or yoga", "Sprinting", "Powerlifting"],
    correctAnswerIndex: 1,
    explanation: "Gentle exercises like light walking or yoga can help relieve cramps and boost mood without putting too much stress on the body."
  },
  {
    questionText: "What are clots in menstrual blood usually made of?",
    options: ["Hormones", "Bacteria", "Blood and tissue", "Fat"],
    correctAnswerIndex: 2,
    explanation: "Menstrual clots are a mixture of blood cells, tissue from the uterine lining, and proteins that help regulate bleeding."
  },
  {
    questionText: "What is oligomenorrhea?",
    options: ["Absence of periods", "Frequent bleeding", "Infrequent periods", "Heavy flow"],
    correctAnswerIndex: 2,
    explanation: "Oligomenorrhea is the medical term for having infrequent periods, for example, cycling every 35 days or more."
  },
  {
    questionText: "Which of these can lead to hormonal imbalance?",
    options: ["Balanced meals", "Chronic stress", "Good hydration", "Fiber-rich diet"],
    correctAnswerIndex: 1,
    explanation: "Chronic stress elevates cortisol levels, which can disrupt the balance of reproductive hormones and affect the menstrual cycle."
  },
  {
    questionText: "What is the average age for menarche globally?",
    options: ["8", "9", "12", "16"],
    correctAnswerIndex: 2,
    explanation: "The average age of menarche, or the first menstrual period, is around 12 years old, though it can vary widely."
  },
  {
    questionText: "What is the average age for menopause worldwide?",
    options: ["45–55", "30–35", "60–65", "70–75"],
    correctAnswerIndex: 0,
    explanation: "The average age for menopause to occur is between 45 and 55, with 51 being a common average in many countries."
  },
  {
    questionText: "What may cause early menopause?",
    options: ["Good nutrition", "Regular exercise", "Smoking", "High estrogen"],
    correctAnswerIndex: 2,
    explanation: "Smoking is a known factor that can lead to an earlier onset of menopause."
  },
  {
    questionText: "What is the term for painful ovulation?",
    options: ["Amenorrhea", "Dysmenorrhea", "Mittelschmerz", "Menorrhagia"],
    correctAnswerIndex: 2,
    explanation: "Mittelschmerz is the medical term for the one-sided, lower abdominal pain associated with ovulation."
  },
  {
    questionText: "What should be done if a period lasts more than 10 days?",
    options: ["Wait it out", "Take a nap", "See a doctor", "Skip meals"],
    correctAnswerIndex: 2,
    explanation: "Prolonged bleeding (more than 7-10 days) can be a sign of an underlying issue and should be evaluated by a doctor."
  },
  {
    questionText: "Which of the following is a myth?",
    options: ["You can exercise during periods", "You should avoid baths during periods", "You can use menstrual cups", "PMS is real"],
    correctAnswerIndex: 1,
    explanation: "The idea that you should avoid baths or swimming during your period is a common myth; it's perfectly safe."
  },
  {
    questionText: "How do hormonal IUDs affect menstruation?",
    options: ["Increase flow", "Stop ovulation", "May reduce or stop periods", "Cause early menopause"],
    correctAnswerIndex: 2,
    explanation: "Hormonal IUDs release a small amount of progestin, which thins the uterine lining and often leads to lighter, or even absent, periods."
  },
  {
    questionText: "What is a common PMS craving?",
    options: ["Bitter herbs", "Spicy soup", "Chocolate", "Salad"],
    correctAnswerIndex: 2,
    explanation: "Cravings for sweet or salty foods, like chocolate, are common PMS symptoms linked to hormonal changes."
  },
  {
    questionText: "Which lifestyle choice improves menstrual health?",
    options: ["High caffeine", "High sugar", "Adequate sleep and hydration", "Low fiber diet"],
    correctAnswerIndex: 2,
    explanation: "Getting enough sleep and staying hydrated are fundamental lifestyle habits that support hormonal balance and overall menstrual health."
  },
  {
    questionText: "Why do periods sometimes vary month to month?",
    options: ["Genetics", "Environmental and lifestyle factors", "Hair growth", "Skin tone"],
    correctAnswerIndex: 1,
    explanation: "Factors like stress, diet, exercise, and travel can all cause slight variations in your cycle from one month to the next."
  },
  {
    questionText: "Which protein carries oxygen and is affected by menstrual blood loss?",
    options: ["Myoglobin", "Hemoglobin", "Collagen", "Albumin"],
    correctAnswerIndex: 1,
    explanation: "Hemoglobin is the iron-containing protein in red blood cells. Significant blood loss can lower hemoglobin levels."
  },
  {
    questionText: "What does spotting before a period usually indicate?",
    options: ["Nothing unusual or sometimes hormonal imbalance", "Ovulation", "Dehydration", "High estrogen"],
    correctAnswerIndex: 0,
    explanation: "Light spotting before a period can be normal for some, or it can indicate hormonal fluctuations."
  },
  {
    questionText: "Which of these best describes a normal cycle?",
    options: ["Always exactly 28 days", "Between 21 and 35 days", "40–45 days", "Every 15 days"],
    correctAnswerIndex: 1,
    explanation: "A cycle length between 21 and 35 days is considered within the normal range for most adults."
  },
  {
    questionText: "What are fibroids?",
    options: ["Fat cells", "Non-cancerous uterine growths", "Hormones", "Menstrual clots"],
    correctAnswerIndex: 1,
    explanation: "Fibroids are non-cancerous growths of the uterus that often appear during childbearing years."
  },
  {
    questionText: "Which of these is not a period hygiene product?",
    options: ["Tampon", "Sanitary pad", "Bandage", "Menstrual cup"],
    correctAnswerIndex: 2,
    explanation: "A bandage is used for covering wounds and is not a menstrual hygiene product."
  },
  {
    questionText: "What are PMS symptoms caused by?",
    options: ["Virus", "Infection", "Hormonal changes", "Physical injury"],
    correctAnswerIndex: 2,
    explanation: "Premenstrual Syndrome (PMS) symptoms are linked to the cyclical hormonal changes that occur during the luteal phase."
  },
  {
    questionText: "What is perimenopause?",
    options: ["Period during menopause", "Transition phase before menopause", "Fertility peak", "Period after menopause"],
    correctAnswerIndex: 1,
    explanation: "Perimenopause is the transitional period before menopause when the body's production of estrogen begins to decline."
  },
  {
    questionText: "What does the term 'flow' refer to in menstruation?",
    options: ["Hormone level", "Volume of blood lost", "Days until ovulation", "Temperature"],
    correctAnswerIndex: 1,
    explanation: "Flow refers to the amount or volume of menstrual blood lost during a period."
  },
  {
    questionText: "What can reduce the effectiveness of hormonal birth control pills?",
    options: ["Eating fruits", "Taking antibiotics", "Exercise", "Hot weather"],
    correctAnswerIndex: 1,
    explanation: "Certain medications, including some antibiotics, can interfere with the absorption and effectiveness of hormonal birth control."
  },
  {
    questionText: "What should you do if you feel faint or weak during your period?",
    options: ["Ignore it", "Stay dehydrated", "Drink water and rest", "Walk in the sun"],
    correctAnswerIndex: 2,
    explanation: "Feeling faint could be a sign of dehydration or heavy blood loss, so it's important to rest and rehydrate. See a doctor if it persists."
  },
  {
    questionText: "What are reusable period underwear designed to do?",
    options: ["Replace exercise clothes", "Absorb menstrual blood", "Measure hormone levels", "Increase estrogen"],
    correctAnswerIndex: 1,
    explanation: "Reusable period underwear has built-in absorbent layers designed to replace disposable pads or tampons."
  },
  {
    questionText: "What is the term for irregular bleeding between periods?",
    options: ["Menorrhagia", "Spotting", "Metrorrhagia", "Amenorrhea"],
    correctAnswerIndex: 2,
    explanation: "Metrorrhagia is the medical term for uterine bleeding at irregular intervals, particularly between expected menstrual periods."
  },
  {
    questionText: "Which of the following can make period pain worse?",
    options: ["Exercise", "Dehydration", "Water", "Rest"],
    correctAnswerIndex: 1,
    explanation: "Dehydration can thicken blood and constrict blood vessels, which may worsen menstrual cramps."
  },
  {
    questionText: "Which is not a common mood symptom of PMS?",
    options: ["Irritability", "Sadness", "Euphoria", "Anxiety"],
    correctAnswerIndex: 2,
    explanation: "While mood can be elevated at other times in the cycle, euphoria (a state of intense happiness) is not a common symptom of PMS."
  },
  {
    questionText: "What kind of doctor should you see for period-related problems?",
    options: ["Dermatologist", "Gynecologist", "Neurologist", "Cardiologist"],
    correctAnswerIndex: 1,
    explanation: "A gynecologist is a doctor who specializes in female reproductive health."
  },
  {
    questionText: "How can omega-3 fatty acids help during menstruation?",
    options: ["Increase blood pressure", "Cause bloating", "Reduce inflammation and cramps", "Increase flow"],
    correctAnswerIndex: 2,
    explanation: "Omega-3 fatty acids have anti-inflammatory properties that can help reduce the prostaglandin production linked to menstrual cramps."
  },
  {
    questionText: "Which drink is helpful for staying hydrated during menstruation?",
    options: ["Alcohol", "Soda", "Water", "Coffee"],
    correctAnswerIndex: 2,
    explanation: "Water is the best choice for staying hydrated, as sugary or caffeinated drinks can sometimes worsen symptoms like bloating."
  },
  {
    questionText: "Which fruit is rich in iron and good during periods?",
    options: ["Banana", "Watermelon", "Pomegranate", "Pineapple"],
    correctAnswerIndex: 2,
    explanation: "Pomegranate is a good source of iron, which can help replenish iron stores lost during menstruation."
  },
  {
    questionText: "What is the best position for sleeping with cramps?",
    options: ["On your back", "On your side with knees curled", "Standing", "Upside down"],
    correctAnswerIndex: 1,
    explanation: "Sleeping in the fetal position (on your side with knees curled) can take pressure off the abdominal muscles and help relieve cramps."
  },
  {
    questionText: "What can indicate an infection during menstruation?",
    options: ["Mild cramps", "Foul odor and unusual discharge", "Dark red blood", "Mood changes"],
    correctAnswerIndex: 1,
    explanation: "A strong, foul odor or a significant change in discharge color or consistency can be signs of a vaginal infection."
  },
  {
    questionText: "Which day of the cycle is considered ovulation in a 28-day cycle?",
    options: ["Day 1", "Day 7", "Day 14", "Day 21"],
    correctAnswerIndex: 2,
    explanation: "In a typical 28-day cycle, ovulation usually occurs around day 14."
  },
  {
    questionText: "Which of these helps balance estrogen levels?",
    options: ["Processed meat", "Flaxseeds", "White rice", "Soda"],
    correctAnswerIndex: 1,
    explanation: "Flaxseeds contain lignans, which are phytoestrogens that can help balance estrogen levels in the body."
  },
  {
    questionText: "Which tea is often used for menstrual pain relief?",
    options: ["Iced tea", "Ginger or chamomile tea", "Bubble tea", "Lemonade"],
    correctAnswerIndex: 1,
    explanation: "Both ginger and chamomile teas have anti-inflammatory and anti-spasmodic properties that can help soothe menstrual cramps."
  },
  {
    questionText: "Can heavy exercise delay periods?",
    options: ["No", "Yes, especially in athletes", "Only in summer", "Only in teens"],
    correctAnswerIndex: 1,
    explanation: "Yes, intense or excessive exercise can put stress on the body and disrupt the hormonal cycle, sometimes leading to delayed or missed periods."
  },
  {
    questionText: "Which vitamin helps absorb iron better?",
    options: ["Vitamin C", "Vitamin A", "Vitamin D", "Vitamin E"],
    correctAnswerIndex: 0,
    explanation: "Vitamin C significantly improves the absorption of non-heme iron, which is the type of iron found in plant-based foods."
  },
  {
    questionText: "What’s one way to track symptoms during your cycle?",
    options: ["Guesswork", "Calendar or tracking app", "Emailing your doctor daily", "Taking selfies"],
    correctAnswerIndex: 1,
    explanation: "Using a calendar or a cycle tracking app is an effective way to monitor symptoms and identify patterns in your cycle."
  },
  {
    questionText: "Which system is mainly involved in menstruation?",
    options: ["Respiratory", "Digestive", "Reproductive", "Circulatory only"],
    correctAnswerIndex: 2,
    explanation: "The reproductive system, which includes the ovaries, uterus, and vagina, is the primary system involved in the menstrual cycle."
  },
  {
    questionText: "What is menometrorrhagia?",
    options: ["Light spotting", "Bleeding between and during periods", "No period for 3 months", "Normal period flow"],
    correctAnswerIndex: 1,
    explanation: "Menometrorrhagia is a condition that involves bleeding that is both heavy and irregular in its timing."
  },
  {
    questionText: "What is considered a sign of iron deficiency anemia?",
    options: ["Increased hunger", "Clear skin", "Fatigue and pale skin", "Restlessness"],
    correctAnswerIndex: 2,
    explanation: "Fatigue, weakness, pale skin, and shortness of breath are common signs of iron deficiency anemia."
  },
  {
    questionText: "What is the purpose of cervical mucus?",
    options: ["Clean the uterus", "Block sperm", "Help or hinder sperm depending on cycle", "Detect ovulation by taste"],
    correctAnswerIndex: 2,
    explanation: "The consistency of cervical mucus changes throughout the cycle, becoming thin and slippery around ovulation to help sperm, and thicker at other times to block it."
  },
  {
    questionText: "Why are warm compresses helpful during periods?",
    options: ["They lower blood pressure", "They reduce cramps by relaxing muscles", "They slow digestion", "They increase hormone levels"],
    correctAnswerIndex: 1,
    explanation: "Applying warmth to the abdomen helps to relax the contracting uterine muscles, thereby reducing the pain of cramps."
  }
];
