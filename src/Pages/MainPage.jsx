import React from "react";
import { useNavigate } from "react-router-dom";
import { ACTION_ROUTE } from "../utils/consts";
import mainData from "../Data/MainPageData";
import { useLanguage, changeLanguage } from "../hooks/LanguageContext";
import LanguageSwitcher from "../Components/LanguageSwitcher";
import LogoTop from "../Components/LogoTop";

const MainPage = () => {
  const navigate = useNavigate(); //Навигация
  const { selectedLanguage, changeLanguage } = useLanguage(); //Язык

  //Кнопка Сыграть
  function handleClick() {
    navigate(ACTION_ROUTE);
  }

  return (
    <main className="main" id="main">
      <div className="container main__container">
        <LogoTop />
        <div className="main__switcher">
          <LanguageSwitcher
            selectedLanguage={selectedLanguage}
            onChange={changeLanguage}
          />
        </div>
        {/* h1 здесь скрытый заголовок первого уровня */}
        <h1 className="main__title">
          BI GROUP - Попробуйте сыграть свадьбу так, чтобы после нее купить себе
          новую квартиру.
        </h1>
        <h2 className="main__caption">{mainData[0].title[selectedLanguage]}</h2>
        <p className="main__subcaption">
          {mainData[0].subTitle[selectedLanguage]}
        </p>
        <ul className="main__list list-reset">
          <li className="main__item">
            <div className="main-card">
              <div className="main-card__content">
                <div className="main-card__number">1</div>
                <p className="main-card__descr">
                  {mainData[0].card1[selectedLanguage]}
                </p>
              </div>
            </div>
          </li>
          <li className="main__item">
            <div className="main-card">
              <div className="main-card__content">
                <div className="main-card__number">2</div>
                <p className="main-card__descr">
                  {mainData[0].card2[selectedLanguage]}
                </p>
              </div>
            </div>
          </li>
          <li className="main__item">
            <div className="main-card">
              <div className="main-card__content">
                <div className="main-card__number">3</div>
                <p className="main-card__descr">
                  {mainData[0].card3[selectedLanguage]}
                </p>
              </div>
            </div>
          </li>
        </ul>
        <div className="main__wrapper">
          <p className="main__start">
            {mainData[0].bottomDescr[selectedLanguage]}
          </p>
          <button onClick={handleClick} className="main__btn btn-reset">
            {mainData[0].button[selectedLanguage]}
          </button>
          <p className="main__wrapper-descr">
            {mainData[0].offerDescr[selectedLanguage]}&nbsp;
            <a
              href={mainData[0].offerTargetLink[selectedLanguage]}
              target="_blank"
              rel="noreferrer"
              className="main__wrapper-link"
            >
              {mainData[0].offerLink[selectedLanguage]}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
