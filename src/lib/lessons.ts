import {
  Fish,
  Bug,
  KeyRound,
  Users,
  ShieldCheck,
  Wifi,
  Lock,
  AlertTriangle,
  Cloud,
  Smartphone,
  Router,
  Building,
  Network,
  type LucideIcon,
} from 'lucide-react';

export type LessonQuiz = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export type Lesson = {
  id: string;
  title: string;
  Icon: LucideIcon;
  content: string[];
  quiz: LessonQuiz[];
};

export const lessons: Lesson[] = [
  {
    id: 'phishing',
    title: 'Phishing',
    Icon: Fish,
    content: [
        "Welcome to your first interactive lesson on Phishing!",
        "Phishing is a cyber attack where scammers try to trick you into giving away sensitive information, like passwords or credit card numbers.",
        "They often do this by sending fake emails or messages that look like they're from a real company, like your bank or a social media site.",
        "These messages might create a sense of urgency, telling you to 'act now' to avoid your account being closed. They often contain links to fake websites.",
        "A key way to protect yourself is to always check the sender's email address. Scammers often use addresses that are very similar to real ones, but with small changes. Also, hover over links before you click to see the actual web address they lead to.",
    ],
    quiz: [
        {
            question: "You receive an email from 'yourbank.co' instead of 'yourbank.com' asking you to urgently update your password. What should you do?",
            options: [
                "Click the link and update your password immediately.",
                "Reply to the email with your password to save time.",
                "Delete the email and report it as phishing.",
                "Call the number provided in the email to verify."
            ],
            correctAnswer: "Delete the email and report it as phishing.",
            explanation: "This is a classic phishing attempt. The slightly incorrect domain name is a major red flag. Never click links or call numbers in suspicious emails. Instead, go to the official website or use a trusted phone number."
        }
    ]
  },
  {
    id: 'malware',
    title: 'Malware & Ransomware',
    Icon: Bug,
    content: [
      "Let's talk about Malware. 'Malware' is short for 'malicious software'. It's a program designed to disrupt computer operations, gather sensitive information, or gain access to private computer systems.",
      "Viruses, spyware, and trojans are all types of malware. A particularly nasty type is Ransomware.",
      "Ransomware encrypts your files, making them inaccessible. The attackers then demand a ransom payment, usually in cryptocurrency, to give you the decryption key.",
      "To stay safe, use reputable antivirus software, keep your operating system and apps updated, and be extremely cautious about downloading files or clicking on ads from untrusted sources."
    ],
    quiz: [
        {
            question: "What is the primary goal of ransomware?",
            options: [
                "To steal your personal identity.",
                "To encrypt your files and demand payment for their release.",
                "To slow down your computer.",
                "To show you advertisements."
            ],
            correctAnswer: "To encrypt your files and demand payment for their release.",
            explanation: "Ransomware's main purpose is to hold your data hostage. It encrypts your files and demands a ransom to restore your access."
        }
    ]
  },
  {
    id: 'password-security',
    title: 'Password Security',
    Icon: KeyRound,
    content: [
        "Passwords are the keys to your digital life, so let's make them strong!",
        "A strong password acts as a difficult barrier for attackers. The best passwords are long, complex, and unique.",
        "Aim for at least 12-16 characters. Use a mix of uppercase letters, lowercase letters, numbers, and symbols (like !@#$%).",
        "Crucially, never reuse passwords across different websites. If one site is breached, attackers will try that same password everywhere else.",
        "Since remembering dozens of complex, unique passwords is impossible, use a password manager! These tools generate and securely store your passwords for you."
    ],
    quiz: [
        {
            question: "Which of the following is the strongest password?",
            options: [
                "password123",
                "MyDogFido",
                "Tr0ub4dor&3",
                "J@nuary2024!"
            ],
            correctAnswer: "Tr0ub4dor&3",
            explanation: "'Tr0ub4dor&3' is a good example of a strong password because it uses a mix of character types and isn't a common word. While 'J@nuary2024!' is also good, it is tied to a specific date which can be easier to guess."
        }
    ]
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering',
    Icon: Users,
    content: [
      "Social engineering is the art of psychological manipulation. Attackers use it to trick people into divulging confidential information or performing actions.",
      "Instead of hacking systems, they 'hack' humans. They might pretend to be a coworker, an IT help desk employee, or even a senior executive.",
      "They exploit human trust, fear, and curiosity. For example, they might drop a USB stick labeled 'Salaries' in an office parking lot, knowing someone will be curious enough to plug it in.",
      "Always be wary of unexpected requests, especially those that create a sense of urgency or pressure. Verify the person's identity through a separate, trusted channel before complying."
    ],
    quiz: [
      {
        question: "An attacker calls you pretending to be from IT support and asks for your password to fix an 'urgent issue'. This is an example of:",
        options: [
          "Ransomware",
          "A Denial-of-Service attack",
          "Social Engineering",
          "A phishing email"
        ],
        correctAnswer: "Social Engineering",
        explanation: "This is social engineering. The attacker is manipulating you by pretending to be someone trustworthy to trick you into giving up your password. A real IT department will never ask for your password."
      }
    ]
  },
  {
    id: 'ip-address',
    title: "What's My IP?",
    Icon: Network,
    content: [
      "Let's learn about your IP Address. 'IP' stands for 'Internet Protocol'.",
      "Think of an IP address like a mailing address for your computer on the internet. It's a unique string of numbers that identifies your device so it can send and receive data online.",
      "There are two main types: IPv4 (like 192.168.1.1) and the newer, longer IPv6. Every device connected to the internet has one.",
      "Your IP address can reveal your general geographic location (country, city), which is used by websites to serve you relevant content. However, it doesn't reveal your name or home address.",
      "When you're at home, all your devices usually share one public IP address assigned by your Internet Service Provider (ISP). At a coffee shop, you share their IP address with everyone else there."
    ],
    quiz: [
      {
        question: "What is an IP address most similar to?",
        options: [
          "Your computer's name",
          "Your email address",
          "A postal mailing address",
          "Your phone number"
        ],
        correctAnswer: "A postal mailing address",
        explanation: "An IP address works like a mailing address, allowing data to be sent to and from the correct device on the vast network of the internet."
      }
    ]
  },
];
