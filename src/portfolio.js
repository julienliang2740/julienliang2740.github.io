import { BsRouter } from "react-icons/bs";
import { FaTree, FaTruckPickup } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { IoHardwareChipOutline } from "react-icons/io5";
import { GiTechnoHeart } from "react-icons/gi";
import { CgDatabase } from "react-icons/cg";

import { BlackberryIcon } from "./assets";

const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: 'https://julienliang.xyz/',
  title: 'JL.',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Julien',
  role: 'Welcome to my website :)',
  description:
    'I am a Computer Science Student at the University of Waterloo passionate about technology, software, and solving real-world problems. Outside of programming, I enjoy reading world history, building lego, and watching Boonie Bears the TV show. In my current role I am a Software Engineer at Cisco.',
  social: {
    linkedin: 'https://www.linkedin.com/in/julien-liang/',
    github: 'https://github.com/julienliang2740',
  },
}

const projects = [
  // projects can be added an removed
  // if there are no projects, Projects section won't show up
  {
    name: 'ConfederAgent',
    description:
      'An AI powered parliament simulation to model the legislative process. Made 10x faster with asynchronous execution and fine-tuning tiny <10B models.',
     stack: ['Python', 'QLoRA', 'PyTorch'],
    // sourceCode: 'https://github.com',
    livePreview: 'https://github.com/julienliang2740/ConfederAgent-Beta-Version',
  },
  {
    name: 'CivilizAgent',
    description:
      'A historical simulation program powered by an LLM multi-agent system, modelling both interactions between countries and internal politics.',
     stack: ['Python', 'RAG', 'LLMs'],
    // sourceCode: 'https://github.com',
    livePreview: 'https://github.com/julienliang2740/CivilizAgent-Demo',
  },
  {
    name: 'TuneScriber',
    description:
      'A web application that transforms music files into separate tracks and sheet music scores in pdf format based on instrumentation.',
     stack: ['Python', 'React', 'Flask', 'Whisper AI'],
    // sourceCode: 'https://github.com',
    livePreview: 'https://devpost.com/software/melodymapper',
  },
  {
    name: 'Sorcery',
    description:
      'A card/board game with a terminal and graphical display made entirely in C++. Gameplay is similar to Hearthstone and Magic, the Gathering.',
     stack: ['C++', 'XWindow'],
    // sourceCode: 'https://github.com',
    livePreview: 'https://github.com/julienliang2740/Sorcery',
  },
  {
    name: 'TrashTracker',
    description:
      'A web application that crowdsources trash location data on a live satellite map for waste tracking and management. A winner of SET.Hacks() 2021.',
     stack: ['Python', 'Javascript', 'Django'],
    // sourceCode: 'https://github.com',
    livePreview: 'https://devpost.com/software/trash-tracker-wkm67j',
  },
]

const skills = [
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  'Python',
  'C++',
  'C',
  'C#',
  'JavaScript',
  'React',
  'SQL',
  'Bash',
  'Linux',
  'Git',
  'AI Engineering',
  'Embedded Software',
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'julienliang2740@gmail.com',
}

  // {
  //   date: ' - ',
  //   icon: ,
  //   role: '',
  //   company: '',
  //   description: ''
  // },
const myExperiences = [
  {
    date: 'May 2025 - Present',
    icon: BsRouter,
    role: 'Software Engineer',
    company: 'Cisco Systems',
    description: 'C, C++'
  },
  {
    date: 'Feb 2025 - Present',
    icon: FaTree,
    role: 'ML Research Assistant',
    company: 'Stanford University',
    description: 'Python'
  },
  {
    date: 'Jan 2025 - Apr 2025',
    icon: FaTruckPickup,
    role: 'Software Developer',
    company: 'Ford Motor Company',
    description: 'C++, C'
  },
  {
    date: 'Oct 2024 - Apr 2025',
    icon: RiRobot2Line,
    role: 'LLM Developer',
    company: 'University of Toronto Machine Intelligence Team',
    description: 'Python, LLM'
  },
  {
    date: 'May 2024 - Aug 2024',
    icon: IoHardwareChipOutline,
    role: 'Software Developer',
    company: 'Blackberry QNX',
    description: 'C, Python, Bash'
  },
  {
    date: 'Sep 2023 - Apr 2024',
    icon: GiTechnoHeart,
    role: 'Software Designer',
    company: 'UWaterloo BioMechatronics (EMG Fabric)',
    description: 'C++, Python, ESP32'
  },
  {
    date: 'May 2023 - Aug 2023',
    icon: CgDatabase,
    role: 'Software Developer',
    company: 'Bayou Technology Co',
    description: 'Python, C++, Bash'
  },
]

export { header, about, projects, skills, contact, myExperiences }
