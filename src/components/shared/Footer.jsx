import React from 'react'
import './styles/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <p className='footer__text'>&copy; Todos los derechos reservados.</p>
      <ul className="redes">
        <li className="redes__items">
          <a href="https://github.com/deca-dev" target='_blank' className="redes__links">
            <i className="fa-brands fa-github"></i>
          </a>
        </li>
        <li className="redes__items">
          <a href="https://www.linkedin.com/in/davidcastroanaya/" target='_blank' className="redes__links">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </li>
        <li className="redes__items">
          <a href="https://www.youtube.com/@david_castr0" target='_blank' className="redes__links">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer