import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className='footer-container'>
      <div className='footer-above-top-separator div-extension'></div>
      <hr className='separator-top separator' />
      <div className='categories'>
        <div className='support category'>
          <p className='item title'>Support</p>
          <Link to='https://www.airbnb.com/help' className='item'>
            Help Center
          </Link>
          <Link to='https://www.airbnb.com/help/article/3218' className='item'>
            Air Cover
          </Link>
          <Link
            to='https://www.airbnb.com/against-discrimination'
            className='item'
          >
            Anti-discrimination
          </Link>
          <Link to='https://www.airbnb.com/accessibility' className='item'>
            Disability support
          </Link>
          <Link to='https://www.airbnb.com/help/article/2701' className='item'>
            Cancellation options
          </Link>
          <Link to='https://www.airbnb.com/help/article/3290' className='item'>
            Report neighborhood concern
          </Link>
        </div>
        <div className='hosting category'>
          <p className='item title'>Hosting</p>
          <Link
            to='https://www.airbnb.com/host/homes?from_footer=1'
            className='item'
          >
            Airbnb your home
          </Link>
          <Link to='https://www.airbnb.com/aircover-for-hosts' className='item'>
            AirCover for Hosts
          </Link>
          <Link
            to='https://www.airbnb.com/resources/hosting-homes'
            className='item'
          >
            Hosting resources
          </Link>
          <Link
            to='https://community.withairbnb.com/t5/Community-Center/ct-p/community-center'
            className='item'
          >
            Community forum
          </Link>
          <Link to='https://www.airbnb.com/help/article/1376' className='item'>
            Hosting responsibly
          </Link>
          <Link to='https://www.airbnb.com/airbnb-friendly' className='item'>
            Airbnb-friendly apartments
          </Link>
          <Link
            to='https://www.airbnb.com/ambassadors/joinaclass'
            className='item'
          >
            Join a free Hosting class
          </Link>
        </div>
        <div className='airbnb category'>
          <p className='item title'>Airbnb</p>
          <Link to='https://news.airbnb.com/' className='item'>
            Newsroom
          </Link>
          <Link to='https://www.airbnb.com/release' className='item'>
            New features
          </Link>
          <Link to='https://careers.airbnb.com/' className='item'>
            Careers
          </Link>
          <Link
            to='https://investors.airbnb.com/home/default.aspx'
            className='item'
          >
            Investors
          </Link>
          <Link to='https://www.airbnb.com/giftcards' className='item'>
            Gift cards
          </Link>
          <Link to='https://www.airbnb.org/?locale=en' className='item'>
            Airbnb.org emergency stays
          </Link>
        </div>
      </div>
      <hr className='separator-bottom separator' />
      <div className='footer-below-top-separator div-extension'>
        <div className='copyright-div'>
          <p className='item'>© {currentYear} Airbnb, Inc.</p>
          &nbsp; · &nbsp;
          <Link to='https://www.airbnb.com/help/article/2908' className='item'>
            Terms
          </Link>
          &nbsp; · &nbsp;
          <Link to='https://www.airbnb.com/sitemaps/v2' className='item'>
            Sitemap
          </Link>
          &nbsp; · &nbsp;
          <Link to='https://www.airbnb.com/help/article/2855' className='item'>
            Privacy
          </Link>
          &nbsp; · &nbsp;
          <Link
            to='https://www.airbnb.com/help/sale-share-opt-out'
            className='item'
          >
            Your Privacy Choices
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
