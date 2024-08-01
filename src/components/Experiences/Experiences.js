// Experiences.js
import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase } from 'react-icons/fa';
import { myExperiences } from '../../portfolio';
import './Experiences.css';
// import './TimelinComponent.css';

const Experiences = () => {
  if (!myExperiences || myExperiences.length === 0) return null;

  return (
    <div className='experiences center'>
      <h2 className='experiences__header' id='experiences'>My Experiences</h2>
      <VerticalTimeline>
        {myExperiences.map((experience, index) => (
          <VerticalTimelineElement 
            key={experience.id || index}
            className="vertical-timeline-element--work"
            date={experience.date}
            icon={<FaBriefcase />}
          >
            <h3 className="experiences__timeline__role">{experience.role}</h3>
            <h4 className="experiences__timeline__company">{experience.company}</h4>
            <p>{experience.description}</p>
          </VerticalTimelineElement>
        ))}
    <VerticalTimelineElement
      />
      </VerticalTimeline>
    </div>
  );
};

export default Experiences;
