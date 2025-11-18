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
  type LucideIcon,
} from 'lucide-react';

export type Lesson = {
  id: string;
  title: string;
  Icon: LucideIcon;
  content: string;
};

export const lessons: Lesson[] = [
  {
    id: 'phishing',
    title: 'Phishing',
    Icon: Fish,
    content:
      "Phishing is a fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity in an electronic communication. Watch out for suspicious emails or messages asking for personal info. Always verify the sender's email address and look for grammatical errors. Never click on suspicious links.",
  },
  {
    id: 'malware',
    title: 'Malware & Ransomware',
    Icon: Bug,
    content:
      "Malware is software intentionally designed to cause damage to a computer, server, client, or computer network. Ransomware is a type of malware that threatens to publish the victim's data or perpetually block access to it unless a ransom is paid. Use antivirus software, keep your systems updated, and be cautious about downloading files from the internet.",
  },
  {
    id: 'password-security',
    title: 'Password Security',
    Icon: KeyRound,
    content:
      'Strong passwords are your first line of defense. A strong password should be long (at least 12 characters), complex (using a mix of upper and lower case letters, numbers, and symbols), and unique for each account. Consider using a password manager to generate and store complex passwords securely.',
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering',
    Icon: Users,
    content:
      'Social engineering is the art of manipulating people into giving up confidential information. Attackers might pretend to be a colleague or IT support to trick you. Always be skeptical of unsolicited requests for information, and verify the person\'s identity through a separate communication channel if you are unsure.',
  },
  {
    id: '2fa',
    title: 'Two-Factor Authentication (2FA)',
    Icon: ShieldCheck,
    content:
      'Two-Factor Authentication adds a second layer of security to your accounts. Even if someone steals your password, they won\'t be able to log in without the second factor, which could be a code from your phone, a fingerprint, or a physical security key. Enable 2FA on all your important accounts.',
  },
  {
    id: 'secure-wifi',
    title: 'Secure Wi-Fi Usage',
    Icon: Wifi,
    content:
      'Public Wi-Fi networks are often unsecured, making it easy for attackers to intercept your data. Avoid accessing sensitive information like bank accounts on public Wi-Fi. If you must use it, use a Virtual Private Network (VPN) to encrypt your internet traffic and protect your data from prying eyes.',
  },
  {
    id: 'data-privacy',
    title: 'Data Privacy & Encryption',
    Icon: Lock,
    content:
      "Encryption scrambles your data so that only authorized parties can understand it. It's crucial for protecting data both in transit (e.g., over the internet) and at rest (e.g., on your hard drive). Use encrypted messaging apps and ensure your hard drive is encrypted to protect your privacy.",
  },
  {
    id: 'reporting-scams',
    title: 'Recognizing & Reporting Scams',
    Icon: AlertTriangle,
    content:
      'Scams can come in many forms, from fake lottery winnings to tech support scams. Common red flags include a sense of urgency, requests for payment in gift cards, and offers that seem too good to be true. If you encounter a scam, report it to the relevant authorities to help protect others.',
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security',
    Icon: Cloud,
    content:
      'While cloud services are convenient, they also present security challenges. It\'s important to configure your cloud storage settings correctly to avoid exposing data publicly. Use strong, unique passwords and enable 2FA for your cloud accounts. Regularly review who has access to your shared files and folders.',
  },
  {
    id: 'mobile-security',
    title: 'Mobile Security',
    Icon: Smartphone,
    content:
      'Our smartphones contain a wealth of personal information. Protect your device with a strong passcode or biometric lock. Only download apps from official app stores (Google Play Store, Apple App Store) and review app permissions carefully. Keep your phone\'s operating system updated to receive the latest security patches.',
  },
  {
    id: 'iot-security',
    title: 'IoT Security',
    Icon: Router,
    content:
      'Internet of Things (IoT) devices, like smart speakers and cameras, can be vulnerable to attacks. Change the default username and password on all your IoT devices. Keep their firmware updated and, if possible, place them on a separate Wi-Fi network from your main computer and phone to limit potential damage.',
  },
  {
    id: 'physical-security',
    title: 'Physical Security',
    Icon: Building,
    content:
      'Cybersecurity isn\'t just about digital threats. Physical security is also vital. Lock your computer when you step away, be aware of "shoulder surfing" (people watching over your shoulder), and securely dispose of sensitive documents by shredding them. Never leave devices like laptops or phones unattended in public places.',
  },
];
