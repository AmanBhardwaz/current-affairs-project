
import { AppData } from './types';

export const INITIAL_DATA: AppData = {
  quizSets: {
    bihar: {
      totalQuestions: 10,
      questions: [
        {
          question: "The Bihar Government launched which portal to monitor the progress of 7-Nishchay schemes?",
          options: { A: "Gyan Bihar", B: "Prakash Portal", C: "Bihar Nischay 2.0", D: "PRASHASAN" },
          correctAnswer: "C",
          explanation: "Bihar Nischay 2.0 was launched to ensure digital monitoring and transparency in the execution of the state's 7-Nishchay Part-2 goals."
        },
        {
          question: "Which district in Bihar received the first gold medal in the National Water Awards 2023 for water conservation?",
          options: { A: "Gaya", B: "Patna", C: "East Champaran", D: "Nalanda" },
          correctAnswer: "C",
          explanation: "East Champaran district of Bihar was recognized for its exemplary performance in ground-water recharging and traditional water body restoration."
        },
        {
          question: "The Bihar government approved the construction of the state's second tiger reserve in which district?",
          options: { A: "Kaimur", B: "Rohtas", C: "Buxar", D: "Jamui" },
          correctAnswer: "A",
          explanation: "Following Valmiki Tiger Reserve, the Bihar government approved Kaimur Sanctuary to be developed as the state's second tiger habitat."
        },
        {
          question: "Who was appointed as the Chief Justice of Patna High Court in early 2023?",
          options: { A: "Justice Sanjay Karol", B: "Justice K. Vinod Chandran", C: "Justice Ashutosh Kumar", D: "Justice Naveen Sinha" },
          correctAnswer: "B",
          explanation: "Justice K. Vinod Chandran was sworn in as the 44th Chief Justice of Patna High Court, succeeding Justice Sanjay Karol."
        },
        {
          question: "Bihar ranked at which position in the NITI Aayog Export Preparedness Index 2022 among landlocked states?",
          options: { A: "2nd", B: "5th", C: "9th", D: "12th" },
          correctAnswer: "C",
          explanation: "Bihar improved its ranking significantly to reach the 9th position among landlocked states in the Export Preparedness Index released by NITI Aayog."
        },
        {
          question: "Which historical site in Bihar was recently added to the tentative list of UNESCO World Heritage Sites?",
          options: { A: "Vikramshila", B: "Cyclopean Wall of Rajgir", C: "Sher Shah Suri Tomb", D: "Golghar" },
          correctAnswer: "B",
          explanation: "The Bihar government formally sent a proposal and included the 2,500-year-old Cyclopean Wall of Rajgir in the tentative list for global heritage status."
        },
        {
          question: "The 'Mithila Makhana' from Bihar received the Geographical Indication (GI) tag in which year?",
          options: { A: "2020", B: "2021", C: "2022", D: "2023" },
          correctAnswer: "C",
          explanation: "The Central Government granted the GI tag to Mithila Makhana in August 2022, ensuring legal protection to its unique identity."
        },
        {
          question: "Bihar inaugurated its first 'Floating Solar Power Plant' in which district?",
          options: { A: "Darbhanga", B: "Supaul", C: "Saharsa", D: "Madhepura" },
          correctAnswer: "A",
          explanation: "The 2-megawatt capacity floating solar plant was inaugurated at Kadiraabad in Darbhanga district."
        },
        {
          question: "Which sportsperson from Bihar won the gold medal at the World Para-Athletics Championship 2023?",
          options: { A: "Sharad Kumar", B: "Pramod Bhagat", C: "Shailesh Kumar", D: "Jyoti Singh" },
          correctAnswer: "C",
          explanation: "Shailesh Kumar, hailing from Jamui district, won the gold in the men's high jump T63 category."
        },
        {
          question: "The state cabinet of Bihar approved 'Bihar Biofuels Production Promotion Policy' in which year?",
          options: { A: "2022", B: "2023", C: "2021", D: "2024" },
          correctAnswer: "B",
          explanation: "The policy was approved in 2023 to promote ethanol and biofuel units, making Bihar a leading hub for green energy in India."
        }
      ]
    },
    "india": {
      "totalQuestions": 10,
      "questions": [
        {
          "question": "Which state became the first in India to implement a 'Right to Health' bill?",
          "options": { "A": "Kerala", "B": "Rajasthan", "C": "Tamil Nadu", "D": "Gujarat" },
          "correctAnswer": "B",
          "explanation": "Rajasthan became the first state in India to pass the Right to Health Act, providing free OPD and IPD services to all citizens."
        },
        {
          "question": "The Indian Space Research Organisation (ISRO) successfully launched which mission to study the Sun?",
          "options": { "A": "Aditya-L1", "B": "Surya-V1", "C": "Solar-X", "D": "Bhashkar-L1" },
          "correctAnswer": "A",
          "explanation": "Aditya-L1 is India's first dedicated solar mission aimed at observing the solar corona and solar wind from the L1 point."
        },
        {
          "question": "Who was appointed as the 50th Chief Justice of India?",
          "options": { "A": "Justice U.U. Lalit", "B": "Justice D.Y. Chandrachud", "C": "Justice N.V. Ramana", "D": "Justice Sanjiv Khanna" },
          "correctAnswer": "B",
          "explanation": "Justice Dhananjaya Yeshwant Chandrachud took oath as the 50th Chief Justice of India on November 9, 2022."
        },
        {
          "question": "India signed the 'Comprehensive Economic Partnership Agreement' (CEPA) with which country in 2022?",
          /* Corrected: Fixed key typo from 'ed' to 'D' to resolve property existence error */
          "options": { "A": "Australia", "B": "USA", "C": "UAE", "D": "Israel" },
          "correctAnswer": "C",
          "explanation": "India and the United Arab Emirates (UAE) signed the CEPA to boost trade and eliminate duties on over 90% of goods."
        },
        {
          "question": "The world's longest river cruise, 'MV Ganga Vilas', was flagged off from which city?",
          "options": { "A": "Kolkata", "B": "Varanasi", "C": "Dibrugarh", "D": "Patna" },
          "correctAnswer": "B",
          "explanation": "The MV Ganga Vilas started its 51-day journey from Varanasi, Uttar Pradesh, ending in Dibrugarh, Assam."
        },
        {
          "question": "Which city was ranked as the cleanest city in India for the 7th consecutive year in Swachh Survekshan 2023?",
          "options": { "A": "Surat", "B": "Navi Mumbai", "C": "Indore", "D": "Mysuru" },
          "correctAnswer": "C",
          "explanation": "Indore maintained its top position as India's cleanest city in the Swachh Survekshan 2023 awards."
        },
        {
          "question": "The G20 Summit 2023 was held under India's presidency in which city?",
          "options": { "A": "Mumbai", "B": "Bengaluru", "C": "New Delhi", "D": "Chennai" },
          "correctAnswer": "C",
          "explanation": "The main Leaders' Summit of G20 took place at the Bharat Mandapam, New Delhi, in September 2023."
        },
        {
          "question": "The 'Statue of Equality' dedicated to Ramanujacharya was inaugurated in which city?",
          "options": { "A": "Hyderabad", "B": "Chennai", "C": "Bengaluru", "D": "Kochi" },
          "correctAnswer": "A",
          "explanation": "The 216-foot tall Statue of Equality was inaugurated by the Prime Minister in Muchintal, Hyderabad."
        },
        {
          "question": "Which Indian state launched the 'Ladli Behna' scheme for financial empowerment of women?",
          "options": { "A": "Uttar Pradesh", "B": "Madhya Pradesh", "C": "Bihar", "D": "Maharashtra" },
          "correctAnswer": "B",
          "explanation": "The Madhya Pradesh government launched the Mukhyamantri Ladli Behna Yojana to provide financial assistance to women."
        },
        {
          "question": "ISRO launched the LVM3-M3 mission carrying how many OneWeb satellites into orbit?",
          "options": { "A": "32", "B": "36", "C": "40", "D": "44" },
          "correctAnswer": "B",
          "explanation": "ISRO successfully placed 36 satellites of the OneWeb group into orbit in its largest commercial launch."
        }
      ]
    },
    "international": {
      "totalQuestions": 10,
      "questions": [
        {
          "question": "Which country officially became the 31st member of NATO in 2023?",
          "options": { "A": "Sweden", "B": "Finland", "C": "Ukraine", "D": "Georgia" },
          "correctAnswer": "B",
          "explanation": "Finland joined the North Atlantic Treaty Organization (NATO) as its 31st member on April 4, 2023."
        },
        {
          "question": "The 2023 BRICS Summit was hosted by which country?",
          "options": { "A": "India", "B": "Brazil", "C": "South Africa", "D": "China" },
          "correctAnswer": "C",
          "explanation": "South Africa hosted the 15th BRICS Summit in Johannesburg, where it was decided to expand the group."
        },
        {
          "question": "Which country launched the 'Chandrayaan-like' Moon mission named 'Luna-25'?",
          "options": { "A": "Japan", "B": "China", "C": "Russia", "D": "USA" },
          "correctAnswer": "C",
          "explanation": "Russia launched Luna-25, its first moon-landing mission in 47 years, which unfortunately crashed on the lunar surface."
        },
        {
          "question": "Who was appointed as the President of the World Bank in 2023?",
          "options": { "A": "Ajay Banga", "B": "Indermit Gill", "C": "Gita Gopinath", "D": "Kristalina Georgieva" },
          "correctAnswer": "A",
          "explanation": "Indian-American Ajay Banga was confirmed as the President of the World Bank for a five-year term starting June 2023."
        },
        {
          "question": "Which country ranked 1st in the World Happiness Report 2023?",
          "options": { "A": "Denmark", "B": "Finland", "C": "Iceland", "D": "Norway" },
          "correctAnswer": "B",
          "explanation": "Finland was ranked the world's happiest country for the sixth consecutive year."
        },
        {
          "question": "The United Nations officially declared which year as the 'International Year of Millets'?",
          "options": { "A": "2022", "B": "2023", "C": "2024", "D": "2025" },
          "correctAnswer": "B",
          "explanation": "The UN General Assembly, following a proposal by India, declared 2023 as the International Year of Millets."
        },
        {
          "question": "Which country won the FIFA Women's World Cup 2023?",
          "options": { "A": "England", "B": "Spain", "C": "USA", "D": "Australia" },
          "correctAnswer": "B",
          "explanation": "Spain defeated England 1-0 in the final to win their first-ever FIFA Women's World Cup title."
        },
        {
          "question": "The 28th UN Climate Change Conference (COP28) was held in which city?",
          "options": { "A": "Sharm El-Sheikh", "B": "Glasgow", "C": "Dubai", "D": "Baku" },
          "correctAnswer": "C",
          "explanation": "COP28 was hosted by the United Arab Emirates (UAE) in Dubai from November to December 2023."
        },
        {
          "question": "Which country became the first to grant legal status to Bitcoin as national currency?",
          "options": { "A": "El Salvador", "B": "Central African Republic", "C": "Venezuela", "D": "Panama" },
          "correctAnswer": "A",
          "explanation": "El Salvador became the world's first country to adopt Bitcoin as legal tender alongside the US Dollar in 2021."
        },
        {
          "question": "The 'Quadrilateral Security Dialogue' (QUAD) Leaders' Summit 2023 was held in which country?",
          "options": { "A": "India", "B": "Australia", "C": "Japan", "D": "USA" },
          "correctAnswer": "C",
          "explanation": "The QUAD Leaders' Summit was held on the sidelines of the G7 Summit in Hiroshima, Japan."
        }
      ]
    }
  },
  "newsSection": {
    "bihar": [
      "Bihar Government launched the 'Nischay 2.0' digital tracking portal for welfare schemes.",
      "The Central Government granted GI Tag to Mithila Makhana from Bihar.",
      "Bihar cabinet approved the creation of a second tiger reserve in Kaimur district.",
      "Justice K. Vinod Chandran was appointed as the Chief Justice of Patna High Court.",
      "Bihar's first floating solar plant was inaugurated in Darbhanga district.",
      "Shailesh Kumar from Jamui won a gold medal at the World Para-Athletics Championship 2023.",
      "Bihar ranked 9th among landlocked states in NITI Aayog's Export Preparedness Index 2022.",
      "The state government approved the 'Bihar Biofuels Production Promotion Policy 2023'.",
      "East Champaran district received the National Water Award for excellent water conservation.",
      "The 2,500-year-old Cyclopean Wall of Rajgir was included in the UNESCO tentative list."
    ],
    "india": [
      "ISRO successfully launched the Aditya-L1 mission to study the Sun.",
      "Rajasthan became the first Indian state to implement the Right to Health Act.",
      "Justice D.Y. Chandrachud was appointed as the 50th Chief Justice of India.",
      "The world's longest river cruise, MV Ganga Vilas, was flagged off from Varanasi.",
      "Indore was ranked as India's cleanest city for the seventh consecutive year in 2023.",
      "India hosted the 18th G20 Summit in New Delhi at Bharat Mandapam.",
      "The 216-foot Statue of Equality was inaugurated in Hyderabad.",
      "The Parliament of India passed the 'Nari Shakti Vandan Adhiniyam' (Women Reservation Bill).",
      "India signed a Comprehensive Economic Partnership Agreement (CEPA) with the UAE.",
      "Madhya Pradesh launched the 'Ladli Behna' financial assistance scheme for women."
    ],
    "international": [
      "Finland officially became the 31st member of the NATO alliance in 2023.",
      "Ajay Banga was appointed as the President of the World Bank.",
      "South Africa hosted the 15th BRICS Summit in Johannesburg.",
      "Spain won the FIFA Women's World Cup 2023 by defeating England.",
      "The UN declared 2023 as the International Year of Millets.",
      "COP28 climate summit was held in Dubai, United Arab Emirates.",
      "Finland was ranked as the world's happiest country in the 2023 Happiness Report.",
      "The QUAD Leaders' Summit 2023 took place in Hiroshima, Japan.",
      "Russia launched the Luna-25 mission, its first lunar lander in nearly 50 years.",
      "El Salvador inaugurated the 'Bitcoin City' project as part of its crypto-legalization."
    ]
  }
};