import { IoHardwareChipOutline } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { CgDatabase } from "react-icons/cg";

import { BlackberryIcon } from "./assets";

const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: 'https://julienliang.com/',
  title: 'JL.',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Julien',
  role: 'Welcome to my website :)',
  description:
    'I am a Computer Science Student at the University of Waterloo passionate about technology, software, and solving real-world problems. \n Outside of programming, I enjoy reading world history, building lego, and watching Boonie Bears the TV show. \n In my latest role I am an Automation Software Developer with Blackberry QNX.',
  social: {
    linkedin: 'https://www.linkedin.com/in/julien-liang/',
    github: 'https://github.com/julienliang2740',
  },
}

const projects = [
  // projects can be added an removed
  // if there are no projects, Projects section won't show up
  {
    name: 'CivilizAgent',
    description:
      'A historical simulation program powered by an LLM multi-agent system, modelling both interactions between countries and internal politics.',
     stack: ['Python', 'LLM', 'MAS'],
    // sourceCode: 'https://github.com',
    livePreview: 'https://drive.google.com/drive/u/0/folders/14lYc-cVJFHQq8ZpaYwwZhGCi8xUGKjlo',
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
  'LLM Research',
  'Embedded Software',
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'julienliang2740@gmail.com',
}

// const myExperiences = {
//   // all the properties are optional - can be left empty or deleted
//   role: 'Work Experience',
//   description:
//     'In my latest role as an Automation Software Development co-op with Blackberry QNX, I use Python, C, and bash scripting in embedded software systems.',
// }

const myExperiences = [
  {
    date: 'May 2024 - Aug 2024',
    icon: IoHardwareChipOutline,
    role: 'Automation Software Developer',
    company: 'Blackberry QNX',
    description: 'Python, C, bash'
  },
  {
    date: 'Sep 2023 - Apr 2024',
    icon: RiRobot2Line,
    role: 'Software Designer',
    company: 'UWaterloo BioMechatronics (EMG Fabric)',
    description: 'C++, Python, ESP32'
  },
  {
    date: 'May 2023 - Aug 2023',
    icon: CgDatabase,
    role: 'Software Developer',
    company: 'Bayou Technology Co',
    description: 'Python, C++, Whisper AI'
  },
]

export { header, about, projects, skills, contact, myExperiences }
