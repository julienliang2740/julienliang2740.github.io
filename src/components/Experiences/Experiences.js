import { iHaveNoExperiences } from '../../portfolio'
import './Experiences.css'

const Experiences = () => {
  const {role, description} = iHaveNoExperiences
  if (!Experiences) return null
  return (
    <div className='experiences center'>

      {role && <h2 className='experiences__role' id='experiences'>A {role}.</h2>}
      <p className='experiences__desc'>{description && description}</p>

      <div className='experiences__contact center'/>

    </div>
    
  )
}

export default Experiences
