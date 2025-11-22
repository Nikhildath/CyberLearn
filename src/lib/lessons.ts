
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
  Shield,
  Fingerprint,
  FileCode,
  Network,
  Laptop,
  ShieldAlert,
  Binary,
  GitBranch,
  Globe,
  Route,
  Target,
  FileKey2,
  LockKeyhole,
  FileLock2,
  FunctionSquare,
  ClipboardList,
  GraduationCap,
  GanttChartSquare,
  Code2,
  Braces,
  DatabaseBackup,
  Siren,
  Shuffle,
  Monitor,
  Footprints,
  FileCog,
  HardHat,
  Briefcase,
  Layers,
  FlaskConical,
  Scale,
  Building,
  HeartPulse,
  ScanEye,
  Type,
  Link,
  Cookie
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
  youtubeVideoId?: string;
};

export const lessons: Lesson[] = [
  // Tier 1: Fundamentals
  {
    id: 'what-is-cybersecurity',
    title: 'What is Cybersecurity?',
    Icon: Shield,
    content: [
      "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks.",
      "These attacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users via ransomware; or interrupting normal business processes.",
      "Implementing effective cybersecurity measures is particularly challenging today because there are more devices than people, and attackers are becoming more innovative.",
      "A successful cybersecurity approach has multiple layers of protection spread across the computers, networks, programs, or data that one intends to keep safe."
    ],
    quiz: [{
      question: "What is the primary goal of cybersecurity?",
      options: ["To make computers faster.", "To create new software.", "To protect digital systems and data from attacks.", "To design websites."],
      correctAnswer: "To protect digital systems and data from attacks.",
      explanation: "Cybersecurity's core purpose is to defend against digital threats to ensure the confidentiality, integrity, and availability of information and systems."
    }],
    youtubeVideoId: 'z56m3iM92gA'
  },
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
    quiz: [{
            question: "You receive an email from 'yourbank.co' instead of 'yourbank.com' asking you to urgently update your password. What should you do?",
            options: [
                "Click the link and update your password immediately.",
                "Reply to the email with your password to save time.",
                "Delete the email and report it as phishing.",
                "Call the number provided in the email to verify."
            ],
            correctAnswer: "Delete the email and report it as phishing.",
            explanation: "This is a classic phishing attempt. The slightly incorrect domain name is a major red flag. Never click links or call numbers in suspicious emails. Instead, go to the official website or use a trusted phone number."
    }],
    youtubeVideoId: 'V9J93Oi-04k'
  },
  {
    id: 'password-security',
    title: 'Strong Passwords',
    Icon: KeyRound,
    content: [
        "Passwords are your first line of defense against unauthorized access. Creating strong, unique passwords is one of the most effective security habits you can adopt.",
        "A strong password should be long (at least 12-16 characters) and complex. It should contain a mix of uppercase letters, lowercase letters, numbers, and special symbols (like !@#$%). Avoid using easily guessable information like your name, birthday, or common words.",
        "The single most important rule is to never reuse passwords across different websites. If one service is breached, attackers will use your stolen credentials to try and log into your other accounts, a technique called 'credential stuffing'.",
        "Since remembering dozens of complex passwords is impossible, you should use a password manager. These applications generate and securely store unique passwords for all your accounts, so you only have to remember one master password."
    ],
    quiz: [{
            question: "Which of the following is the strongest password?",
            options: [
                "password123",
                "MyDogFido",
                "Tr0ub4dor&3",
                "J@nuary2024!"
            ],
            correctAnswer: "Tr0ub4dor&3",
            explanation: "'Tr0ub4dor&3' is a good example of a strong password because it uses a mix of character types and isn't a common word. While 'J@nuary2024!' is also good, it is tied to a specific date which can be easier to guess."
    }],
    youtubeVideoId: 'g6nSHe1h3nU'
  },
  {
    id: '2fa',
    title: 'Two-Factor Auth (2FA)',
    Icon: Lock,
    content: [
      "Two-Factor Authentication (2FA) adds a crucial second layer of security to your accounts, making it much harder for attackers to gain access, even if they have your password.",
      "It works by requiring two different types of verification. The first is something you know (your password). The second is something you have (like your phone) or something you are (like your fingerprint).",
      "Common 2FA methods include a code sent via SMS (text message), a code generated by an authenticator app (like Google Authenticator or Authy), a physical security key (like a YubiKey), or a biometric scan.",
      "You should enable 2FA on all your important accounts, especially email, banking, and social media. While SMS is convenient, authenticator apps and physical keys are considered more secure because they are not vulnerable to SIM-swapping attacks."
    ],
    quiz: [{
        question: "Why is 2FA more secure than just a password?",
        options: [
          "It makes your password longer.",
          "It requires a second piece of evidence to prove your identity.",
          "It encrypts your password.",
          "It changes your password every day."
        ],
        correctAnswer: "It requires a second piece of evidence to prove your identity.",
        explanation: "2FA's strength comes from requiring verification from two different factors. An attacker would need to steal both your password and gain access to your second factor (e.g., your phone) to compromise your account."
    }],
    youtubeVideoId: 'c10s33oO3gI'
  },
  {
    id: 'malware',
    title: 'Malware Types',
    Icon: Bug,
    content: [
      "'Malware' is short for 'malicious software'. It's a broad term for any program designed to disrupt computer operations, gather sensitive information, or gain unauthorized access to private systems.",
      "Types of malware include viruses (which attach to clean files and spread), worms (which self-replicate across networks), spyware (which secretly monitors your activity), and trojans (which disguise themselves as legitimate software).",
      "Ransomware is a particularly damaging form of malware. It encrypts your personal files, making them inaccessible. The attackers then demand a ransom payment, usually in cryptocurrency, in exchange for the decryption key to restore your files.",
      "To stay safe, use reputable antivirus software, enable firewalls, and keep your operating system and applications updated to patch security vulnerabilities. Be extremely cautious about downloading files or clicking on ads from untrusted sources."
    ],
    quiz: [{
            question: "A piece of malware that disguises itself as a useful program is called a...",
            options: [
                "Virus",
                "Worm",
                "Trojan",
                "Spyware"
            ],
            correctAnswer: "Trojan",
            explanation: "A Trojan, named after the ancient Greek story, tricks users into running it by appearing to be a legitimate application, like a game or utility."
    }],
    youtubeVideoId: 'Ssu_xhy255g'
  },
  {
    id: 'wifi-security',
    title: 'Secure Wi-Fi Usage',
    Icon: Wifi,
    content: [
      "Public Wi-Fi networks, like those in coffee shops, airports, and hotels, are convenient but can be major security risks. They are often unencrypted, meaning attackers on the same network can potentially intercept your data.",
      "An attacker can perform a 'man-in-the-middle' attack by creating a fake Wi-Fi hotspot with a convincing name (e.g., 'Free_Airport_Wi-Fi'). If you connect, they can monitor all your online activity and steal information.",
      "When using public Wi-Fi, avoid logging into sensitive accounts like banking or email. If you must, ensure the website is using HTTPS (look for the padlock in the address bar), which encrypts the connection between your browser and the site.",
      "For the best protection on public networks, use a Virtual Private Network (VPN). A VPN encrypts all your internet traffic, creating a secure, private tunnel that makes your data unreadable to anyone trying to snoop on the network."
    ],
    quiz: [{
        question: "What is the most effective way to protect your data on a public Wi-Fi network?",
        options: [
          "Only visiting websites you trust.",
          "Using a firewall.",
          "Using a Virtual Private Network (VPN).",
          "Connecting to the network with the strongest signal."
        ],
        correctAnswer: "Using a Virtual Private Network (VPN).",
        explanation: "A VPN is the best tool for public Wi-G because it encrypts your entire internet connection, making it unreadable to eavesdroppers, even on an unsecured network."
    }],
    youtubeVideoId: 'p6S81iS1aW4'
  },
  {
    id: 'software-updates',
    title: 'Software Updates',
    Icon: ShieldCheck,
    content: [
      "Keeping your software and operating system updated is one of the simplest yet most critical cybersecurity practices. It's like fixing a broken lock on your door.",
      "Software updates don't just add new features; they often contain vital security patches that fix vulnerabilities discovered by developers or security researchers. These vulnerabilities are weaknesses that hackers can exploit.",
      "Cybercriminals actively search for devices running outdated software with known exploits. Failing to update leaves your digital doors wide open for malware and other attacks.",
      "You should enable automatic updates whenever possible for your operating system (Windows, macOS, Android, iOS) and applications, especially web browsers and antivirus software. This ensures you are always protected against the latest known threats without having to think about it."
    ],
    quiz: [{
        question: "Why are software updates important for security?",
        options: [
          "They make your apps run faster.",
          "They change the look of the user interface.",
          "They fix security holes (vulnerabilities) that attackers can exploit.",
          "They free up storage space on your device."
        ],
        correctAnswer: "They fix security holes (vulnerabilities) that attackers can exploit.",
        explanation: "The most critical function of software updates is to patch vulnerabilities. Attackers create exploits for these vulnerabilities, and updating is your primary defense against them."
    }],
    youtubeVideoId: 'm41s-m1h4dM'
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
    quiz: [{
        question: "An attacker calls you pretending to be from IT support and asks for your password to fix an 'urgent issue'. This is an example of:",
        options: [
          "Ransomware",
          "A Denial-of-Service attack",
          "Social Engineering",
          "A brute-force attack"
        ],
        correctAnswer: "Social Engineering",
        explanation: "This is a classic social engineering tactic. The attacker is manipulating you by impersonating someone trustworthy to trick you into giving up your password. A legitimate IT department will never ask for your password."
    }],
    youtubeVideoId: 'Y-t3bI4sRkY'
  },
  // Tier 2: Networking & Systems
  {
    id: 'ip-address',
    title: "IP Addresses & DNS",
    Icon: Route,
    content: [
      "An IP (Internet Protocol) address is a unique numerical label for a device on a network. IPv4 (e.g., 192.168.1.1) and IPv6 (e.g., 2001:0db8:...) are the two versions.",
      "It's like a mailing address, allowing data to be sent to the correct destination. Public IPs are internet-facing, while private IPs are used within a local network (like your home).",
      "Since remembering numbers is hard, the Domain Name System (DNS) acts as the phonebook of the internet. It translates human-readable domain names (like www.google.com) into machine-readable IP addresses.",
      "When you type a URL in your browser, your computer queries a DNS server to find the corresponding IP address before it can request the website data. Securing DNS (e.g., with DNS over HTTPS) prevents attackers from redirecting you to malicious sites."
    ],
    quiz: [{
        question: "What is the function of DNS?",
        options: [
          "To assign IP addresses to devices.",
          "To translate domain names into IP addresses.",
          "To encrypt internet traffic.",
          "To filter malicious websites."
        ],
        correctAnswer: "To translate domain names into IP addresses.",
        explanation: "DNS is the system that maps human-friendly names (like www.example.com) to the numerical IP addresses that computers use to find each other on a network."
    }],
    youtubeVideoId: 'ASa43m6aD5E'
  },
  {
    id: 'firewalls',
    title: 'Firewalls',
    Icon: Shield,
    content: [
      "A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.",
      "Think of a firewall as a digital gatekeeper for your network or computer. It stands between a trusted network (like your home network) and an untrusted network (like the internet), filtering traffic to block malicious data packets.",
      "Firewalls can be software (installed on your computer) or hardware (a physical device). Most modern operating systems include a built-in software firewall, which you should always keep enabled.",
      "While essential, a firewall is just one part of a comprehensive security strategy. It works best when combined with antivirus software, regular updates, and secure user habits."
    ],
    quiz: [{
        question: "What is the main function of a firewall?",
        options: [
          "To make your internet faster.",
          "To back up your files.",
          "To monitor and filter network traffic to block threats.",
          "To find and remove viruses on your computer."
        ],
        correctAnswer: "To monitor and filter network traffic to block threats.",
        explanation: "A firewall's core purpose is to act as a barrier, inspecting data packets and blocking any that don't meet the security rules, thus protecting the network from external threats."
    }],
    youtubeVideoId: 'VLZ44S1fC_A'
  },
  {
    id: 'vpn',
    title: 'VPNs Explained',
    Icon: Globe,
    content: [
        "A Virtual Private Network (VPN) creates a secure, encrypted connection—a 'tunnel'—over a less secure network, like the public internet.",
        "When you use a VPN, your internet traffic is routed through a remote server run by the VPN provider. This has two main benefits: it encrypts your data, making it unreadable to anyone on your local network (like on public Wi-Fi), and it masks your real IP address, making you appear as if you're browsing from the VPN server's location.",
        "VPNs are essential for privacy and security. They prevent your Internet Service Provider (ISP) from seeing your browsing activity and protect you from snoops on public networks.",
        "Companies also use VPNs to provide secure remote access to their internal corporate networks for employees working from home or traveling."
    ],
    quiz: [{
        question: "What is a primary security benefit of using a VPN on public Wi-Fi?",
        options: [
            "It increases your internet speed.",
            "It gives you free access to paid services.",
            "It encrypts your traffic, making it unreadable to others on the network.",
            "It blocks all advertisements."
        ],
        correctAnswer: "It encrypts your traffic, making it unreadable to others on the network.",
        explanation: "By encrypting your data, a VPN creates a secure tunnel that protects your information from being intercepted by attackers who may be monitoring the public network."
    }],
    youtubeVideoId: 'v_s_1z-xtiA'
  },
  {
    id: 'os-security',
    title: 'Operating System Security',
    Icon: Laptop,
    content: [
      "Operating System (OS) security involves the measures taken to protect the OS from threats, viruses, worms, malware, and remote hacker intrusions.",
      "Modern operating systems (like Windows, macOS, Linux, iOS, and Android) have many built-in security features, including user accounts with different privilege levels, firewalls, and sandboxing (isolating apps so they can't access other parts of the system).",
      "One of the most important aspects of OS security is managing user permissions. You should always use a standard user account for daily tasks and only use an administrator account when you need to install software or change system settings. This principle of 'least privilege' limits the damage malware can do.",
      "Regularly updating your OS is critical. These updates contain patches for security vulnerabilities that have been discovered. Disabling automatic updates is a significant security risk."
    ],
    quiz: [{
        question: "What is the 'principle of least privilege'?",
        options: [
          "Giving all users administrator rights.",
          "Using the same password for everything.",
          "Giving users only the permissions they need to perform their tasks and no more.",
          "Installing as few applications as possible."
        ],
        correctAnswer: "Giving users only the permissions they need to perform their tasks and no more.",
        explanation: "The principle of least privilege is a security best practice that limits user access rights to the bare minimum required to do their job. This minimizes the potential damage from a compromised account."
    }],
    youtubeVideoId: 'b_i_y16_2gE'
  },
  {
    id: 'data-encryption',
    title: 'Data Encryption',
    Icon: FileLock2,
    content: [
      "Encryption is the process of converting data into a code to prevent unauthorized access. It scrambles readable data (plaintext) into an unreadable format (ciphertext).",
      "To read the encrypted data, you need the correct 'key'. This is why encryption is fundamental to data security. There are two main types: symmetric (uses the same key to encrypt and decrypt) and asymmetric (uses a public key to encrypt and a private key to decrypt).",
      "You encounter encryption every day. When you see a padlock icon in your browser's address bar (HTTPS), your connection to that website is encrypted. Messaging apps like Signal and WhatsApp use 'end-to-end encryption' to ensure only the sender and receiver can read messages.",
      "Encrypting the hard drive on your laptop or phone ('full-disk encryption') is a crucial step to protect your data if your device is lost or stolen. Modern operating systems have this feature built-in (e.g., BitLocker on Windows and FileVault on macOS)."
    ],
    quiz: [{
        question: "What is the main purpose of encryption?",
        options: [
          "To make files smaller.",
          "To transfer data faster.",
          "To make data unreadable to unauthorized users.",
          "To organize your data."
        ],
        correctAnswer: "To make data unreadable to unauthorized users.",
        explanation: "Encryption's core function is to ensure confidentiality by scrambling data, so that even if someone intercepts it, they cannot understand it without the decryption key."
    }],
    youtubeVideoId: 'O9p_t1pGv_8'
  },
  // Tier 3: Web & Application Security
  {
    id: 'xss',
    title: 'Cross-Site Scripting (XSS)',
    Icon: Code2,
    content: [
        "Cross-Site Scripting (XSS) is a web security vulnerability that allows an attacker to inject malicious scripts (usually JavaScript) into content from otherwise trusted websites.",
        "This occurs when a web application uses input from a user within its output without validating or encoding it. The malicious script can then access any cookies, session tokens, or other sensitive information retained by the browser and used with that site.",
        "There are three main types: Stored XSS (where the script is permanently stored on the target server), Reflected XSS (where the script is reflected off a web server, from a URL), and DOM-based XSS (where the vulnerability is in the client-side code itself).",
        "To prevent XSS, developers must implement context-aware output encoding. This means treating all user input as untrusted and using security libraries to sanitize it before it is rendered on a page."
    ],
    quiz: [{
        question: "What does an XSS attack allow a hacker to do?",
        options: [
            "Shut down the web server.",
            "Run malicious scripts in a victim's browser.",
            "Steal the entire website's database.",
            "Change the website's appearance."
        ],
        correctAnswer: "Run malicious scripts in a victim's browser.",
        explanation: "XSS vulnerabilities are exploited to execute code on the client-side (the user's browser), which can lead to session hijacking, data theft, and other malicious activities."
    }],
    youtubeVideoId: 'j1P1iXqf-P0'
  },
  {
    id: 'sql-injection',
    title: 'SQL Injection (SQLi)',
    Icon: DatabaseBackup,
    content: [
        "SQL Injection is a code injection technique used to attack data-driven applications. It involves inserting malicious SQL statements into an entry field for execution (e.g., to dump the database contents to the attacker).",
        "This vulnerability can occur when a developer incorporates user input into a database query in an insecure way. An attacker can supply specially crafted input that changes the structure of the SQL query itself.",
        "A successful SQLi attack can read sensitive data from the database, modify database data (Insert/Update/Delete), execute administration operations on the database (such as shutdown the DBMS), and in some cases, issue commands to the operating system.",
        "The primary way to prevent SQL Injection is to use 'prepared statements' (also known as parameterized queries). This method ensures that user input is always treated as data and cannot be mistaken for an executable command by the database."
    ],
    quiz: [{
        question: "What is the most effective way to prevent SQL Injection attacks?",
        options: [
            "Blocking all special characters.",
            "Using a strong database password.",
            "Using prepared statements (parameterized queries).",
            "Hiding error messages from users."
        ],
        correctAnswer: "Using prepared statements (parameterized queries).",
        explanation: "Prepared statements separate the SQL command from the user-provided data, making it impossible for an attacker to change the intent of the query. This is the industry-standard defense."
    }],
    youtubeVideoId: 'Y_G1K43lKrg'
  },
  {
    id: 'csrf',
    title: 'Cross-Site Request Forgery',
    Icon: Shuffle,
    content: [
        "Cross-Site Request Forgery (CSRF or XSRF) is an attack that tricks a victim into submitting a malicious request. It inherits the identity and privileges of the victim to perform an undesired function on their behalf.",
        "For example, if you are logged into your banking website, an attacker could send you a link to an image. When your browser tries to load that image, it secretly sends a request to the banking site to transfer money from your account to the attacker's.",
        "This works because the browser automatically includes your session cookies with the request, so the bank's server thinks the request is legitimate. The attacker doesn't see the response, but the malicious action is still performed.",
        "The most common defense against CSRF is the use of anti-CSRF tokens. The server sends a unique, unpredictable token with the webpage. When the user submits the form, this token is sent back. The server validates that the token is correct before processing the request."
    ],
    quiz: [{
        question: "What does a CSRF attack typically target?",
        options: [
            "Stealing data directly from the server.",
            "Tricking a user's browser into making a malicious request on their behalf.",
            "Injecting scripts into the webpage.",
            "Crashing the user's browser."
        ],
        correctAnswer: "Tricking a user's browser into making a malicious request on their behalf.",
        explanation: "CSRF exploits the trust a website has in a user. The attack is 'forged' by a third-party site and sent by the victim's browser, which unknowingly performs an action like changing a password or making a purchase."
    }],
    youtubeVideoId: 'e2eAnr7lelg'
  },
  {
    id: 'dos-attacks',
    title: 'Denial-of-Service (DoS)',
    Icon: Siren,
    content: [
      "A Denial-of-Service (DoS) attack is a malicious attempt to make a machine or network resource unavailable to its intended users by disrupting services of a host connected to the Internet.",
      "The most common method is to flood the target with an overwhelming amount of traffic or requests, overloading its systems and preventing it from responding to legitimate users. It's like creating a massive traffic jam that prevents anyone from reaching their destination.",
      "A Distributed Denial-of-Service (DDoS) attack is a larger-scale version where the attack traffic comes from many different sources (often a 'botnet' of compromised computers), making it much harder to block.",
      "DoS attacks don't typically steal data, but they can be devastating for businesses by taking websites and services offline, leading to financial loss and reputational damage. Defending against large-scale DDoS attacks requires specialized services."
    ],
    quiz: [{
        question: "What is the primary goal of a DDoS attack?",
        options: [
          "To steal user passwords.",
          "To make a website or service unavailable by overwhelming it with traffic.",
          "To install a virus on a server.",
          "To deface a website with a political message."
        ],
        correctAnswer: "To make a website or service unavailable by overwhelming it with traffic.",
        explanation: "The goal of a (D)DoS attack is to disrupt service. By flooding the target with more traffic than it can handle, the attacker effectively shuts it down for legitimate users."
    }],
    youtubeVideoId: 'z5Tq0a_s_1s'
  },
  {
    id: 'man-in-the-middle',
    title: 'Man-in-the-Middle (MitM)',
    Icon: Link,
    content: [
        "A Man-in-the-Middle (MitM) attack is a form of eavesdropping where an attacker secretly relays and possibly alters the communication between two parties who believe they are directly communicating with each other.",
        "One common example is an 'evil twin' attack on a public Wi-Fi network. An attacker sets up a malicious Wi-Fi hotspot with a legitimate-sounding name (e.g., 'Starbucks_Free_WiFi'). When victims connect, all their traffic passes through the attacker's device.",
        "This allows the attacker to intercept unencrypted data, such as passwords and personal information. They can also inject malicious code into legitimate websites or redirect users to phishing pages.",
        "Using HTTPS (encrypted web connections) and a VPN are the primary defenses against MitM attacks, as they encrypt the data, making it unreadable to the attacker even if they manage to intercept it."
    ],
    quiz: [{
        question: "In a Man-in-the-Middle attack, where does the attacker position themselves?",
        options: [
            "On the web server.",
            "On the victim's computer.",
            "Between the victim and the resource they are trying to access.",
            "In the DNS server."
        ],
        correctAnswer: "Between the victim and the resource they are trying to access.",
        explanation: "The attacker secretly intercepts the communication path, acting as an invisible 'man in the middle' to eavesdrop on or manipulate the data being exchanged."
    }],
    youtubeVideoId: 'svghKHBOpu4'
  },
  // Tier 4: Advanced Topics & Defense
  {
    id: 'cryptography',
    title: 'Intro to Cryptography',
    Icon: LockKeyhole,
    content: [
        "Cryptography is the science of secure communication techniques that allow only the sender and intended recipient of a message to view its contents.",
        "It involves two main processes: encryption, which converts plaintext into unreadable ciphertext, and decryption, which converts it back. This is achieved using cryptographic keys.",
        "Symmetric-key cryptography uses the same secret key for both encryption and decryption. It's very fast but requires a secure way to share the key. Asymmetric-key (or public-key) cryptography uses a pair of keys: a public key for encryption and a private key for decryption. The public key can be shared freely.",
        "Cryptography is the foundation for most modern security, including secure web browsing (HTTPS), encrypted messaging, and digital currencies like Bitcoin."
    ],
    quiz: [{
        question: "In public-key cryptography, which key is used to encrypt a message?",
        options: [
            "The private key.",
            "The public key.",
            "The same key for both.",
            "A session key."
        ],
        correctAnswer: "The public key.",
        explanation: "Anyone can use the recipient's public key to encrypt a message, but only the recipient with the corresponding private key can decrypt and read it."
    }],
    youtubeVideoId: 'inrGP3iL21g'
  },
  {
    id: 'digital-forensics',
    title: 'Digital Forensics',
    Icon: Footprints,
    content: [
        "Digital forensics is the process of uncovering and interpreting electronic data. The goal is to preserve any evidence in its most original form while performing a structured investigation.",
        "Forensic investigators follow a strict process: data acquisition (creating a bit-for-bit copy of the original media), analysis (examining the data for evidence), and reporting (presenting the findings).",
        "This field is crucial for investigating cybercrimes, policy violations within an organization, or data breaches. Investigators can recover deleted files, analyze network traffic logs, and trace an attacker's steps.",
        "A key principle is the 'chain of custody', which is a detailed log of how the evidence has been handled, who has handled it, and when. This ensures the evidence is admissible in a court of law."
    ],
    quiz: [{
        question: "What is the first step in a typical digital forensics investigation?",
        options: [
            "Analyzing the data for clues.",
            "Writing the final report.",
            "Acquiring a forensic image (copy) of the data.",
            "Interviewing suspects."
        ],
        correctAnswer: "Acquiring a forensic image (copy) of the data.",
        explanation: "The first priority is always to preserve the original evidence. A forensic image (a bit-for-bit copy) is created to work from, ensuring the original drive or device remains unaltered."
    }],
    youtubeVideoId: 'Uwem9zomd7w'
  },
  {
    id: 'incident-response',
    title: 'Incident Response',
    Icon: Siren,
    content: [
        "Incident Response (IR) is an organized approach to addressing and managing the aftermath of a security breach or cyberattack. The goal is to handle the situation in a way that limits damage and reduces recovery time and costs.",
        "The IR lifecycle is often described in six phases: Preparation (having a plan before an incident occurs), Identification (detecting the breach), Containment (isolating affected systems to prevent further damage), Eradication (removing the malware/attacker), Recovery (restoring systems to normal operation), and Lessons Learned (analyzing the incident to improve future defenses).",
        "A well-defined Incident Response Plan is critical for any organization. It outlines roles, responsibilities, and procedures, ensuring a coordinated and effective response during a high-stress event.",
        "Effective IR can significantly reduce the financial and reputational impact of a data breach."
    ],
    quiz: [{
        question: "In incident response, what is the primary goal of the 'Containment' phase?",
        options: [
            "To find out who the attacker was.",
            "To delete all the affected files.",
            "To restore the systems from backup.",
            "To stop the attack from spreading and causing more damage."
        ],
        correctAnswer: "To stop the attack from spreading and causing more damage.",
        explanation: "Containment is about isolating the problem. This could mean disconnecting a compromised computer from the network or blocking a malicious IP address to prevent the incident from escalating."
    }],
    youtubeVideoId: 'D93yA-n_yGg'
  },
  {
    id: 'threat-modeling',
    title: 'Threat Modeling',
    Icon: Target,
    content: [
        "Threat modeling is a proactive process for identifying, communicating, and understanding threats and mitigations within the context of protecting something of value.",
        "It's about thinking like an attacker before you even write a line of code. You ask questions like: 'What are we trying to protect?', 'Who might want to attack it?', 'How could they attack it?', and 'What can we do to defend against it?'.",
        "A common framework for threat modeling is STRIDE, which stands for Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.",
        "By identifying potential threats early in the development lifecycle, organizations can build more secure applications from the ground up, rather than trying to patch security holes after the fact."
    ],
    quiz: [{
        question: "Threat modeling is primarily a...",
        options: [
            "Reactive process done after an attack.",
            "Tool for scanning for viruses.",
            "Proactive process to identify potential threats early.",
            "Method for encrypting data."
        ],
        correctAnswer: "Proactive process to identify potential threats early.",
        explanation: "The core value of threat modeling is its proactive nature. It's about anticipating and planning for security risks before they can be exploited."
    }],
    youtubeVideoId: 'TC3i87-5O0I'
  },
  {
    id: 'pen-testing',
    title: 'Penetration Testing',
    Icon: FlaskConical,
    content: [
        "Penetration testing (or 'pen testing') is a simulated cyberattack against your computer system to check for exploitable vulnerabilities. It's a form of ethical hacking.",
        "The goal is to identify security weaknesses before a real attacker does. Pen testers use the same tools and techniques as malicious hackers but with the organization's permission.",
        "There are several types: Black-box testing (where the tester has no prior knowledge of the system), white-box testing (where they have full knowledge and access), and grey-box testing (a mix of the two).",
        "A successful pen test will conclude with a report detailing the vulnerabilities found, the potential business impact of each, and recommendations for how to fix them."
    ],
    quiz: [{
        question: "What is the main purpose of penetration testing?",
        options: [
            "To install firewalls.",
            "To simulate an attack to find security weaknesses.",
            "To back up company data.",
            "To train employees on password security."
        ],
        correctAnswer: "To simulate an attack to find security weaknesses.",
        explanation: "Penetration testing is a form of ethical hacking designed to proactively discover and report on vulnerabilities so they can be fixed before a real attacker finds them."
    }],
    youtubeVideoId: '3n0J2KORW5o'
  },
  // Tier 5: Compliance, Careers & Culture
  {
    id: 'compliance-frameworks',
    title: 'Compliance Frameworks',
    Icon: Scale,
    content: [
        "Compliance frameworks are sets of guidelines and best practices that organizations follow to meet regulatory requirements and improve their security posture.",
        "Examples include PCI DSS (for handling credit card data), HIPAA (for healthcare data), GDPR (for data privacy in the EU), and SOX (for financial reporting).",
        "These frameworks aren't just about avoiding fines; they provide a structured approach to security. They mandate controls like access management, data encryption, regular vulnerability scanning, and incident response planning.",
        "Achieving and maintaining compliance can be a complex and costly process, often requiring dedicated security professionals and regular audits to prove that the organization is adhering to the rules."
    ],
    quiz: [{
        question: "A company that processes credit card payments would likely need to comply with which framework?",
        options: [
            "HIPAA",
            "GDPR",
            "PCI DSS",
            "SOX"
        ],
        correctAnswer: "PCI DSS",
        explanation: "The Payment Card Industry Data Security Standard (PCI DSS) is a mandatory framework for any organization that stores, processes, or transmits cardholder data."
    }],
    youtubeVideoId: 'U2so23d57sQ'
  },
  {
    id: 'security-careers',
    title: 'Careers in Cybersecurity',
    Icon: Briefcase,
    content: [
        "The field of cybersecurity is vast and rapidly growing, with a wide variety of career paths available.",
        "Roles can be broadly categorized into 'Blue Team' (defensive) and 'Red Team' (offensive). Blue Team roles include Security Analyst, Incident Responder, and Security Engineer, who focus on defending systems. Red Team roles include Penetration Testers and Ethical Hackers, who simulate attacks to find weaknesses.",
        "Other specialized roles include Security Architect (designing secure systems), Forensics Investigator (analyzing breaches), and GRC Analyst (Governance, Risk, and Compliance).",
        "Key skills for a career in cybersecurity include a strong understanding of networking and operating systems, problem-solving abilities, and continuous learning. Certifications like CompTIA Security+, CISSP, and OSCP can also be valuable."
    ],
    quiz: [{
        question: "A professional who is hired to legally hack into a system to find vulnerabilities is on which team?",
        options: [
            "Blue Team",
            "Red Team",
            "Green Team",
            "White Team"
        ],
        correctAnswer: "Red Team",
        explanation: "The Red Team performs offensive security tasks, such as penetration testing, to simulate the actions of an attacker and test the organization's defenses."
    }],
    youtubeVideoId: 'o388e_YLd4M'
  },
  {
    id: 'security-culture',
    title: 'Building a Security Culture',
    Icon: Building,
    content: [
        "A strong security culture means that security awareness and responsibility are integrated into the daily routines and mindset of every employee in an organization.",
        "Technology alone cannot protect an organization. The 'human firewall'—the collective vigilance of all employees—is one of the most critical defense layers. Many successful breaches begin by targeting an employee through phishing or social engineering.",
        "Building this culture involves ongoing training, clear and concise security policies, and leadership buy-in. It's about making security a shared responsibility, not just the IT department's problem.",
        "Effective security awareness programs are continuous and engaging. They go beyond annual training to include regular phishing simulations, security newsletters, and positive reinforcement for good security practices."
    ],
    quiz: [{
        question: "What is meant by the 'human firewall'?",
        options: [
            "A specific type of hardware firewall.",
            "A software that blocks human interaction.",
            "The idea that vigilant and well-trained employees are a key layer of defense.",
            "An elite team of cybersecurity professionals."
        ],
        correctAnswer: "The idea that vigilant and well-trained employees are a key layer of defense.",
        explanation: "The 'human firewall' refers to the concept that employees, when properly trained and aware, can act as a crucial line of defense by identifying and reporting threats like phishing emails."
    }],
    youtubeVideoId: '6hKxPHeaAnw'
  },
   {
    id: 'cia-triad',
    title: 'The CIA Triad',
    Icon: Layers,
    content: [
      "The CIA Triad is a foundational model in cybersecurity that guides policies for information security. CIA stands for Confidentiality, Integrity, and Availability.",
      "Confidentiality ensures that data is accessible only to authorized users. It's about preventing the disclosure of sensitive information. Measures like encryption and access control lists enforce confidentiality.",
      "Integrity ensures that data is accurate and trustworthy. It involves maintaining the consistency and reliability of data over its entire lifecycle, protecting it from unauthorized modification. Hashing and digital signatures help maintain integrity.",
      "Availability ensures that information is accessible by authorized users when they need it. This means systems, networks, and applications must be functioning correctly. Measures to ensure availability include hardware maintenance, disaster recovery plans, and defending against DoS attacks."
    ],
    quiz: [
      {
        question: "Encrypting a file primarily upholds which part of the CIA Triad?",
        options: ["Confidentiality", "Integrity", "Availability", "Authorization"],
        correctAnswer: "Confidentiality",
        explanation: "Encryption makes data unreadable to unauthorized individuals, which is the core principle of confidentiality."
      }
    ],
    youtubeVideoId: 'B3u5N8s0a7s'
  },
   {
    id: 'risk-management',
    title: 'Risk Management',
    Icon: GanttChartSquare,
    content: [
      "Cybersecurity risk management is the process of identifying, assessing, and controlling threats to an organization's capital and earnings.",
      "The process involves identifying assets (e.g., data, servers), identifying threats to those assets (e.g., malware, insider threats), and assessing vulnerabilities (weaknesses that threats can exploit).",
      "Once a risk is assessed, an organization can choose how to respond: Mitigate (apply controls to reduce the risk), Transfer (shift the risk to a third party, like with insurance), Accept (if the risk is low or the cost of mitigation is too high), or Avoid (discontinue the activity causing the risk).",
      "This is a continuous cycle, not a one-time task. As new threats emerge and business processes change, the risk landscape must be constantly re-evaluated."
    ],
    quiz: [
      {
        question: "Buying a cybersecurity insurance policy is an example of which risk management strategy?",
        options: ["Mitigation", "Transfer", "Acceptance", "Avoidance"],
        correctAnswer: "Transfer",
        explanation: "Insurance transfers the financial impact of a potential breach to the insurance company, which is a classic example of risk transfer."
      }
    ],
    youtubeVideoId: 'f2Kij59m-Ns'
  },
  {
    id: 'iam',
    title: 'Identity & Access Management',
    Icon: Users,
    content: [
      "Identity and Access Management (IAM) is the framework of policies and technologies for ensuring the right individuals have the right access to the right resources at the right times for the right reasons.",
      "IAM systems handle authentication (verifying a user's identity, e.g., with a password and 2FA) and authorization (determining what an authenticated user is allowed to do).",
      "A key component is the Principle of Least Privilege, which dictates that users should only be granted the minimum levels of access—or permissions—needed to perform their job functions.",
      "Modern IAM solutions often include Single Sign-On (SSO), which allows users to log in once and access multiple applications, and Multi-Factor Authentication (MFA) for enhanced security."
    ],
    quiz: [
      {
        question: "Granting a user 'read-only' access to a file instead of full 'read-write' access is an application of what principle?",
        options: ["Single Sign-On", "Multi-Factor Authentication", "The Principle of Least Privilege", "Role-Based Access Control"],
        correctAnswer: "The Principle of Least Privilege",
        explanation: "This action provides the user with only the necessary permissions to do their job (read the file) and no more, adhering to the Principle of Least Privilege."
      }
    ],
    youtubeVideoId: 'P_4dE1y82so'
  },
  {
    id: 'zero-trust',
    title: 'Zero Trust Architecture',
    Icon: Building,
    content: [
      "Zero Trust is a modern security model founded on the principle of 'never trust, always verify'. It assumes that there is no traditional network edge; networks can be local, in the cloud, or a hybrid, and that threats exist both inside and outside the network.",
      "Instead of trusting devices or users just because they are on the corporate network, Zero Trust requires strict identity verification for every person and device trying to access resources.",
      "This model leverages technologies like multi-factor authentication, IAM, and endpoint security to verify user identity and maintain device health, granting access only to specific applications or resources rather than the entire network.",
      "The core philosophy is to assume breach and verify each request as though it originates from an open network. This significantly reduces the risk of lateral movement by attackers within a network."
    ],
    quiz: [
      {
        question: "What is the core philosophy of a Zero Trust security model?",
        options: ["Trust all devices on the internal network.", "Never trust, always verify.", "Once a user is authenticated, trust all their actions.", "Focus only on perimeter security."],
        correctAnswer: "Never trust, always verify.",
        explanation: "Zero Trust eliminates the outdated idea of a trusted internal network and requires continuous verification of every access request, regardless of its origin."
      }
    ],
    youtubeVideoId: 'p2I-6_JTMa8'
  },
  {
    id: 'siem',
    title: 'SIEM Systems',
    Icon: Monitor,
    content: [
      "Security Information and Event Management (SIEM) is a solution that helps organizations detect, analyze, and respond to security threats before they harm business operations.",
      "SIEM technology collects and aggregates log data generated throughout the organization’s technology infrastructure, from host systems and applications to network and security devices such as firewalls and antivirus filters.",
      "The SIEM then analyzes this data to identify trends, detect anomalies, and correlate events. For example, it could flag multiple failed login attempts on a critical server followed by a successful login from an unusual location.",
      "Modern SIEMs often incorporate user and entity behavior analytics (UEBA) and security orchestration, automation, and response (SOAR) to provide more intelligent analysis and automated incident response."
    ],
    quiz: [
      {
        question: "What is the primary function of a SIEM system?",
        options: ["To block viruses.", "To back up data.", "To collect, aggregate, and analyze log data for security monitoring.", "To manage user passwords."],
        correctAnswer: "To collect, aggregate, and analyze log data for security monitoring.",
        explanation: "A SIEM's main purpose is to provide a centralized view of an organization's security posture by analyzing log data from various sources to detect potential threats."
      }
    ],
    youtubeVideoId: 'yV-t0Unp3mI'
  },
  {
    id: 'threat-intelligence',
    title: 'Threat Intelligence',
    Icon: ScanEye,
    content: [
      "Threat intelligence is evidence-based knowledge, including context, mechanisms, indicators, implications, and actionable advice, about an existing or emerging menace or hazard to assets.",
      "It provides defenders with information about the TTPs—Tactics, Techniques, and Procedures—of adversaries. This allows them to move from a reactive to a proactive security posture.",
      "Sources for threat intelligence include open-source intelligence (OSINT), threat feeds from security vendors, and information sharing and analysis centers (ISACs).",
      "Actionable threat intelligence helps organizations make faster, more informed security decisions and anticipate future attacks."
    ],
    quiz: [
      {
        question: "What does 'TTP' stand for in the context of threat intelligence?",
        options: ["Tactics, Techniques, and Procedures", "Tools, Training, and People", "Threats, Targets, and Payloads", "Time, Traffic, and Protocols"],
        correctAnswer: "Tactics, Techniques, and Procedures",
        explanation: "TTPs describe the behavior of an actor. Tactics are high-level descriptions of behavior, techniques are detailed descriptions of behavior in the context of a tactic, and procedures are low-level descriptions of behavior in the context of a technique."
      }
    ],
    youtubeVideoId: 'J9Z22-AWyFw'
  },
  {
    id: 'osint',
    title: 'Open-Source Intelligence',
    Icon: Search,
    content: [
      "Open-Source Intelligence (OSINT) is the collection and analysis of information that is gathered from public, or open, sources.",
      "OSINT sources are distinct from covert or clandestine sources. They include a wide variety of information and sources such as social media, public government data, news media, academic publications, and commercial data.",
      "In cybersecurity, both attackers (for reconnaissance) and defenders (for threat intelligence) use OSINT. An attacker might use LinkedIn to map out an organization's hierarchy for a spear-phishing attack, while a defender might use social media to track a threat actor's activity.",
      "Tools like Shodan (a search engine for internet-connected devices), Google Dorking (using advanced search operators), and Maltego are commonly used for OSINT investigations."
    ],
    quiz: [
      {
        question: "Which of the following is considered an OSINT source?",
        options: ["A classified government document.", "A private company's internal email.", "A public Twitter profile.", "A wiretapped phone call."],
        correctAnswer: "A public Twitter profile.",
        explanation: "OSINT is derived from publicly and legally accessible information. A public social media profile fits this description perfectly."
      }
    ],
    youtubeVideoId: 'iP-j2-3s7eM'
  },
  {
    id: 'network-protocols',
    title: 'Common Network Protocols',
    Icon: Network,
    content: [
      "Network protocols are a set of rules that govern how data is formatted, transmitted, and received in a network.",
      "Key protocols include TCP (Transmission Control Protocol), which provides reliable, ordered, and error-checked delivery of a stream of bytes, and UDP (User Datagram Protocol), which is faster but less reliable.",
      "HTTP (Hypertext Transfer Protocol) is the foundation of data communication for the World Wide Web. HTTPS is its secure version, which encrypts the data.",
      "Other important protocols include IP (Internet Protocol) for addressing and routing packets, ICMP (Internet Control Message Protocol) for error messages, and DNS (Domain Name System) for resolving domain names."
    ],
    quiz: [
      {
        question: "Which protocol is connectionless and faster, but does not guarantee delivery?",
        options: ["TCP", "HTTP", "UDP", "IP"],
        correctAnswer: "UDP",
        explanation: "UDP (User Datagram Protocol) is used for applications like video streaming or online gaming where speed is more critical than ensuring every single packet arrives perfectly."
      }
    ],
    youtubeVideoId: 'ssHkS-5Fj0g'
  }
];
