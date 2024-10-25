import React from 'react';

const About = ({ isActive , onClose }) => (
  
  <div id="main">
  <article id="about" className={`article ${isActive ? 'active' : ''}`}>
    <div className="inner">
   
    <h3>Skills</h3>
    <ul>
      <li>Java</li>
      <li>Python</li>
      <li>C</li>
      <li>SQL</li>
      <li>Full-Stack Development</li>
      <li>Problem-Solving</li>
      <li>Communication</li>
      <li>Teamwork</li>
      <li>Technical Expertise</li>
      <li>Leadership</li>
      <li>Creative Thinking</li>
      <li>Open-Source Projects</li>
      <li>JavaScript</li>
      <li>React</li>
      <li> Node.js </li>
 </ul>
 <h3> Interests </h3>
 <p>I am passionate about using technology to solve real-world problems, with a particular focus on data
   analytics and machine learning. I'm currently exploring how data-driven insights and intelligent systems
    can lead to innovative, impactful solutions. My interest lies in harnessing the power of data to address
     real challenges—whether it's optimizing processes, improving decision-making, or discovering patterns
      that can lead to meaningful change. I’m particularly interested in how these technologies can be 
      applied to areas like sustainability, finance, and social development, where they can create real,
       tangible benefits.</p>

<p> Looking ahead, I hope to use these skills to contribute to the growth of technology and innovation in Zimbabwe.
 I believe that leveraging data analytics and machine learning can be instrumental in addressing challenges such 
 as economic development, resource management, and access to essential services in Zimbabwe. My goal is to
  help create data-driven solutions that uplift communities and drive positive change in the country. </p>
  <div className="close" onClick={onClose}>Close</div>
    </div>
    </article>
    </div>
);

export default About;