import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Button from '@material-ui/core/Button';

const name = 'Chang Phang Wei'

export default function Layout({ children, home }) {
  return (
    <div>
      <header>
          <div className={utilStyles.container}>
            <header className={utilStyles.header}>
            <img
              src="/profile.jpg"
              className={`${utilStyles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
            <div className={utilStyles.logoBar}>
              <a href="https://www.linkedin.com/in/chang-phang-wei-ab79b8165/" target="_blank">
                <img className={utilStyles.logoImage} src="linkedin-logo.svg" alt="LinkedIn" title="View LinkedIn Profile"/>
              </a>
              <a href="https://github.com/DanielChang98" target="_blank">
                <img className={utilStyles.logoImage} src="github-logo.svg" alt="GitHub" title="View Github Profile"/>
              </a>
              <a href="/resume-chang_phang_wei.pdf" download>
                <img className={utilStyles.logoImage} src="resume-logo.png" alt="Download Resume" title="Download Resume"/>
              </a>
            </div>
            <section className={utilStyles.headingMd}>
              <p>I'm a student from USM, majoring in Software Engineering and minoring in Mathematics. <br></br>
                Interested in getting an internship position in CoinGecko!
              </p>
            </section>
            <p><Link href="/table"><a className={utilStyles.nextPage}>Go to dashboard →</a></Link></p>
            </header>
          </div>
      </header>

      <main>{children}</main>
    </div>
  )
}