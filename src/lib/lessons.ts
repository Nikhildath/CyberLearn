import {
  Fish,
  Bug,
  KeyRound,
  Users,
  ShieldCheck,
  Wifi,
  Lock,
  Cloud,
  Smartphone,
  Router,
  Server,
  Database,
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
    title: 'Phishing Attacks',
    Icon: Fish,
    content: [
        "Phishing is a deceptive cyber attack where criminals impersonate legitimate organizations to trick you into revealing sensitive information.",
        "Attackers use fraudulent emails, text messages, or websites that look genuine. These communications often create a sense of urgency, such as claiming your account is compromised or you've won a prize, to pressure you into acting without thinking.",
        "Common goals of phishing are to steal login credentials, credit card numbers, or bank account details. They might also trick you into installing malware.",
        "To protect yourself, always scrutinize the sender's email address for inconsistencies. Hover over links before clicking to see the actual destination URL. Be wary of unexpected attachments and requests for personal information. When in doubt, contact the organization directly through a trusted channel.",
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
      "'Malware' is short for 'malicious software'. It's a broad term for any program designed to disrupt computer operations, gather sensitive information, or gain unauthorized access to private systems.",
      "Types of malware include viruses (which attach to clean files and spread), worms (which self-replicate across networks), spyware (which secretly monitors your activity), and trojans (which disguise themselves as legitimate software).",
      "Ransomware is a particularly damaging form of malware. It encrypts your personal files, making them inaccessible. The attackers then demand a ransom payment, usually in cryptocurrency, in exchange for the decryption key to restore your files.",
      "To stay safe, use reputable antivirus software, enable firewalls, and keep your operating system and applications updated to patch security vulnerabilities. Be extremely cautious about downloading files or clicking on ads from untrusted sources."
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
        "Passwords are your first line of defense against unauthorized access to your digital life. Creating strong, unique passwords is one of the most effective security habits you can adopt.",
        "A strong password should be long (at least 12-16 characters) and complex. It should contain a mix of uppercase letters, lowercase letters, numbers, and special symbols (like !@#$%). Avoid using easily guessable information like your name, birthday, or common words.",
        "The single most important rule is to never reuse passwords across different websites. If one service is breached, attackers will use your stolen credentials to try and log into your other accounts, a technique called 'credential stuffing'.",
        "Since remembering dozens of complex passwords is impossible, you should use a password manager. These applications generate and securely store unique passwords for all your accounts, so you only have to remember one master password."
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
    id: '2fa',
    title: 'Two-Factor Auth (2FA)',
    Icon: Lock,
    content: [
      "Two-Factor Authentication (2FA) adds a second layer of security to your accounts, making it much harder for attackers to gain access, even if they have your password.",
      "It works by requiring two different types of verification. The first is something you know (your password). The second is something you have (like your phone) or something you are (like your fingerprint).",
      "Common 2FA methods include a code sent via SMS (text message), a code generated by an authenticator app (like Google Authenticator or Authy), a physical security key (like a YubiKey), or a biometric scan.",
      "You should enable 2FA on all your important accounts, especially email, banking, and social media. While SMS is convenient, authenticator apps and physical keys are considered more secure because they are not vulnerable to SIM-swapping attacks."
    ],
    quiz: [
      {
        question: "Why is 2FA more secure than just a password?",
        options: [
          "It makes your password longer.",
          "It requires a second piece of evidence to prove your identity.",
          "It encrypts your password.",
          "It changes your password every day."
        ],
        correctAnswer: "It requires a second piece of evidence to prove your identity.",
        explanation: "2FA's strength comes from requiring verification from two different factors. An attacker would need to steal both your password and gain access to your second factor (e.g., your phone) to compromise your account."
      }
    ]
  },
  {
    id: 'wifi-security',
    title: 'Secure Wi-Fi Usage',
    Icon: Wifi,
    content: [
      "Public Wi-Fi networks, like those in coffee shops, airports, and hotels, are convenient but can be insecure. They are often unencrypted, meaning attackers on the same network can potentially intercept your data.",
      "An attacker can set up a 'man-in-the-middle' attack or create a fake Wi-Fi hotspot with a convincing name (e.g., 'Free_Airport_Wi-Fi') to spy on your online activity and steal information.",
      "When using public Wi-Fi, avoid logging into sensitive accounts like banking or email. If you must, ensure the website is using HTTPS (look for the padlock in the address bar).",
      "For the best protection on public networks, use a Virtual Private Network (VPN). A VPN encrypts all your internet traffic, creating a secure tunnel that makes your data unreadable to anyone trying to snoop on the network."
    ],
    quiz: [
      {
        question: "What is the most effective way to protect your data on a public Wi-Fi network?",
        options: [
          "Only visiting websites you trust.",
          "Using a firewall.",
          "Using a Virtual Private Network (VPN).",
          "Connecting to the network with the strongest signal."
        ],
        correctAnswer: "Using a Virtual Private Network (VPN).",
        explanation: "A VPN is the best tool for public Wi-Fi because it encrypts your entire internet connection, making it unreadable to eavesdroppers, even on an unsecured network."
      }
    ]
  },
  {
    id: 'software-updates',
    title: 'Software Updates',
    Icon: ShieldCheck,
    content: [
      "Keeping your software and operating system updated is one of a simplest yet most critical cybersecurity practices.",
      "Software updates don't just add new features; they often contain vital security patches that fix vulnerabilities discovered by developers or security researchers.",
      "Cybercriminals actively search for devices running outdated software with known exploits. Failing to update leaves your devices and data exposed to malware and other attacks.",
      "You should enable automatic updates whenever possible for your operating system (Windows, macOS, Android, iOS) and applications, especially web browsers and antivirus software. This ensures you are always protected against the latest known threats without having to think about it."
    ],
    quiz: [
      {
        question: "Why are software updates important for security?",
        options: [
          "They make your apps run faster.",
          "They change the look of the user interface.",
          "They fix security holes (vulnerabilities) that attackers can exploit.",
          "They free up storage space on your device."
        ],
        correctAnswer: "They fix security holes (vulnerabilities) that attackers can exploit.",
        explanation: "The most critical function of software updates is to patch vulnerabilities. Attackers create exploits for these vulnerabilities, and updating is your primary defense against them."
      }
    ]
  },
  {
    id: 'data-backups',
    title: 'Data Backups',
    Icon: Database,
    content: [
      "Data backups are your safety net against data loss. Whether it's due to a hardware failure, accidental deletion, or a ransomware attack, having a recent backup can save you from losing irreplaceable files.",
      "The 3-2-1 backup strategy is a well-regarded best practice. It means you should have at least 3 copies of your data, on 2 different types of media (e.g., an external hard drive and a cloud service), with 1 copy stored off-site (in the cloud or at a different physical location).",
      "You can back up your data manually by copying files to an external drive, or you can automate the process using software like Windows File History, Apple's Time Machine, or a cloud backup service (like Backblaze, iDrive, or Dropbox).",
      "Regularly test your backups to ensure they are working correctly and that you can actually restore your files from them. A backup is useless if it's corrupted or incomplete."
    ],
    quiz: [
      {
        question: "What is the primary purpose of a data backup?",
        options: [
          "To speed up your computer.",
          "To create copies of your data for recovery in case of loss.",
          "To share files with other people.",
          "To encrypt your files for security."
        ],
        correctAnswer: "To create copies of your data for recovery in case of loss.",
        explanation: "The fundamental reason for backing up data is to ensure you can recover it if the original data is lost, corrupted, or destroyed by events like hardware failure, theft, or a ransomware attack."
      }
    ]
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering',
    Icon: Users,
    content: [
      "Social engineering is the art of psychological manipulation. Attackers use it to trick people into divulging confidential information or performing actions that compromise security.",
      "Instead of using technical exploits to hack systems, social engineers 'hack' humans. They might pretend to be a coworker, an IT help desk employee, a delivery person, or even a senior executive (a technique called 'whaling').",
      "They exploit human trust, fear, curiosity, and a desire to be helpful. Tactics include creating a false sense of urgency, dropping a malware-infected USB stick labeled 'Salaries', or sending a fake 'package delivery failed' notification.",
      "Always be skeptical of unexpected requests for information or action, especially those that are urgent or unusual. Verify the person's identity through a separate, trusted communication channel (like an official company directory) before complying with any request."
    ],
    quiz: [
      {
        question: "An attacker calls you pretending to be from IT support and asks for your password to fix an 'urgent issue'. This is an example of:",
        options: [
          "Ransomware",
          "A Denial-of-Service attack",
          "Social Engineering",
          "A brute-force attack"
        ],
        correctAnswer: "Social Engineering",
        explanation: "This is a classic social engineering tactic. The attacker is manipulating you by impersonating someone trustworthy to trick you into giving up your password. A legitimate IT department will never ask for your password."
      }
    ]
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security',
    Icon: Cloud,
    content: [
      "Cloud security involves protecting data, applications, and infrastructure hosted in a cloud environment (like AWS, Google Cloud, or Microsoft Azure). It's a shared responsibility between you and the cloud provider.",
      "The cloud provider is responsible for the security *of* the cloud – protecting the physical data centers, servers, and network infrastructure.",
      "You are responsible for security *in* the cloud. This includes properly configuring your services, managing user access and permissions, encrypting your data, and securing your applications.",
      "A common mistake is misconfiguring cloud storage (like an Amazon S3 bucket) to be publicly accessible, accidentally exposing sensitive data to the entire internet. Always use strong access controls, enable multi-factor authentication for cloud accounts, and regularly audit your configurations."
    ],
    quiz: [
      {
        question: "In the cloud 'Shared Responsibility Model', what are you typically responsible for?",
        options: [
          "Securing the physical data center.",
          "Managing and securing your own data and user access.",
          "Maintaining the server hardware.",
          "Protecting against natural disasters."
        ],
        correctAnswer: "Managing and securing your own data and user access.",
        explanation: "While the cloud provider secures the physical infrastructure, you are always responsible for how you configure your services, who you grant access to, and the security of the data you upload."
      }
    ]
  },
  {
    id: 'ip-address',
    title: "What's My IP?",
    Icon: Router,
    content: [
      "Your IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication.",
      "Think of it like a mailing address for your computer. It allows your device to be identified on the internet, so it can send and receive data with other computers, servers, and devices.",
      "Your IP address can reveal some information about you, such as your general geographic location (country, city) and your Internet Service Provider (ISP). Websites use this for localization, analytics, and sometimes for security.",
      "When you're at home, all your devices (phone, laptop, TV) typically share one public IP address assigned by your ISP. When you connect to a public Wi-Fi, you use the IP address of that network. Using a VPN can mask your real IP address, enhancing your privacy online."
    ],
    quiz: [
      {
        question: "What is an IP address most similar to?",
        options: [
          "Your computer's name",
          "Your email address",
          "A postal mailing address for your device on the internet",
          "Your phone number"
        ],
        correctAnswer: "A postal mailing address for your device on the internet",
        explanation: "An IP address functions like a mailing address, ensuring that data packets sent across the internet are delivered to the correct destination device."
      }
    ]
  },
];
