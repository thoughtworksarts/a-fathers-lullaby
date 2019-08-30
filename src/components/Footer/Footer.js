import React from 'react';
import mailIcon from '../../assets/mail-icon.svg';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="Footer">
            <p>all content © 2019 <a href="https://www.rashinfahandej.com/">Rashin Fahandej</a></p>
            <a href="mailto:Rashin.Fahandej@gmail.com"><img src={mailIcon}/></a>
        </footer>
    );
}

export default Footer;