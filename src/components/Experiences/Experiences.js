// import { myExperiences } from '../../portfolio'
// import './Experiences.css'

// const Experiences = () => {
//   const {role, description} = myExperiences
//   if (!Experiences) return null
//   return (
//     <div className='experiences center'>

//       {role && <h2 className='experiences__role' id='experiences'>A {role}.</h2>}
//       <p className='experiences__desc'>{description && description}</p>

//       <div className='experiences__contact center'/>

//     </div>
    
//   )
// }

// export default Experiences


// Experiences.js
import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase } from 'react-icons/fa';
import { myExperiences } from '../../portfolio';
import './Experiences.css';

const Experiences = () => {
  if (!myExperiences || myExperiences.length === 0) return null;

  return (
    <div className='experiences center'>
      <h2 className='experiences__header' id='experiences'>My Experiences</h2>
      <VerticalTimeline>
        {myExperiences.map((experience, index) => (
          <VerticalTimelineElement
            key={experience.id || index}
            // className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date={experience.date}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<FaBriefcase />}
          >
            <h3 className="vertical-timeline-element-title">{experience.role}</h3>
            <h4 className="vertical-timeline-element-subtitle">{experience.company}</h4>
            <p>{experience.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Experiences;
