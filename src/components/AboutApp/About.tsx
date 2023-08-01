import styles from './About.module.css'
export default function About (): JSX.Element {
  return (
    <div className={styles.main}>
      <h1 id='project-shamos'>Project: shamOS</h1>
      <h2 id='overview'>Overview</h2>
      <p>
        shamOS is an interactive web-based project that recreates the nostalgic
        retro desktop from classic sci-fi media. It features working icons,
        draggable windows, and a functional taskbar, providing an engaging and
        immersive user experience.## Key Features
      </p>
      <ol>
        <li>
          <p>
            <strong>Retro Desktop Interface</strong>: The project presents a
            visually appealing retro sci-fi desktop interface.
          </p>
        </li>
        <li>
          <p>
            <strong>Working Icons</strong>: Various interactive icons are placed
            on the desktop, representing different applications or tasks that
            users can access.
          </p>
        </li>
        <li>
          <p>
            <strong>Draggable Windows</strong>: Users can interact with
            draggable windows, simulating the experience of managing multiple
            open applications on the desktop.
          </p>
        </li>
        <li>
          <p>
            <strong>Functional Taskbar</strong>: The taskbar at the bottom of
            the screen provides quick access to running applications and offers
            functionalities like window minimization and maximization.
          </p>
        </li>
      </ol>
      <h2 id='technology-stack'>Technology Stack</h2>
      <ul>
        <li>
          <p>
            <strong>HTML/CSS</strong>: The project&#39;s user interface is built
            using HTML and CSS, providing the visual elements and styling for
            the retro desktop.
          </p>
        </li>
        <li>
          <p>
            <strong>TypeScript</strong>: JavaScript is used to create
            interactive functionalities, handle user interactions, and manage
            the desktop environment.
          </p>
        </li>
        <li>
          <p>
            <strong>React</strong>: The React library is utilized to build
            reusable components, manage application state, and enhance user
            interface responsiveness.
          </p>
        </li>
        <li>
          <p>
            <strong>Zustand</strong>: To easily manage states and storage.
          </p>
        </li>
      </ul>
      <h2 id='usage'>Usage</h2>
      <ol>
        <li>
          <p>
            <strong>Desktop View</strong>: On opening the application, users are
            greeted with the sci-fi retro desktop view, resembling a futuristic
            computer interface.
          </p>
        </li>
        <li>
          <p>
            <strong>Interacting with Icons</strong>: Users can click on the
            various icons on the desktop to launch different applications or
            access specific tasks.
          </p>
        </li>
        <li>
          <p>
            <strong>Window Management</strong>: Windows can be opened, dragged,
            and resized, mimicking the behavior of a real desktop environment.
          </p>
        </li>
        <li>
          <p>
            <strong>Taskbar Functions</strong>: The taskbar at the bottom allows
            users to switch between running applications, minimize or maximize
            windows, and access the desktop.
          </p>
        </li>
      </ol>
      <h2 id='future-enhancements'>Future Enhancements</h2>
      <ol>
        <li>
          <p>
            <strong>Additional Icons and Applications</strong>: Add more
            interactive icons and applications to expand the desktop&#39;s
            functionality and entertainment value.
          </p>
        </li>
        <li>
          <p>
            <strong>Animations and Visual Effects</strong>: Implement
            sci-fi-themed animations and visual effects to enhance the retro
            desktop experience.
          </p>
        </li>
      </ol>
    </div>
  )
}
