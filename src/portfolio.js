const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: 'https://julienliang.com/',
  title: 'JL.',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Julien Liang',
  role: 'University of Waterloo Computer Science student',
  description:
    'Hi, I\'m Julien Liang. \n I\'m a Computer Science Student at the University of Waterloo passionate about technology, programming, and solving real-world problems. \n Outside of programming, I enjoy reading world history, practicing martial arts, and watching Boonie Bears the TV show. \n In my latest role as an Automation Software Development co-op with Blackberry QNX, I use Python, C, and bash scripting in embedded software systems.',
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
      'A web application that crowdsources trash location data for waste tracking and management. A winner of SET.Hacks() 2021.',
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
  'Javascript',
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

const iHaveNoExperiences = {
  // all the properties are optional - can be left empty or deleted
  role: 'Work Experience',
  description:
    'In my latest role as an Automation Software Development co-op with Blackberry QNX, I use Python, C, and bash scripting in embedded software systems.',
}

export { header, about, projects, skills, contact, iHaveNoExperiences }
