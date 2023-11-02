import '../Card/Card.scss'
import logo from '../../assets/Images/quote.jpg';

function Header() {
    return (
        <>
         <header className='header'>
            <div className='header__container1'>
                <img className="header__logo" src={logo}></img>
            </div>
            <div className='header__container2'>
                <h1 className="header__title">Daily Dose of Inspire</h1>
                <p className='header__sub-title'>"Learn as if you will live forever, live like you will die tomorrow."</p>
                <p className='header__text'>Ghandi</p>
            </div>
        </header>   
        </>
    )
}

export default Header;