import React from "react";
import LogoTop from "../Components/LogoTop";
import { useLanguage, changeLanguage } from "../hooks/LanguageContext";
import LanguageSwitcher from "../Components/LanguageSwitcher";
import PromoContent from "../Components/PromoContent";
import { useNavigate } from "react-router-dom";
import { QUESTION_ROUTE } from "../utils/consts";
import { useAuth } from "../hooks/AuthContext";
import promoData from "../Data/PromoData";
import mainData from "../Data/MainPageData";

const ActionPage = () => {
  const { selectedLanguage, changeLanguage } = useLanguage(); //Язык
  const navigate = useNavigate(); //Навигация
  const { authenticate } = useAuth(); //Авторизация

  //Кнопка Сыграть
  const handleClick = () => {
    // Создаем токен
    authenticate();
    //Направляем на страницу
    navigate(QUESTION_ROUTE + "/1");
  };

  //Слово каторое заключаем в тег strong
  const targetWord = "миллион";

  return (
    <section className="action" id="action">
      <div className="container action__container">
        <LogoTop />
        <div className="action__switcher">
          <LanguageSwitcher
            selectedLanguage={selectedLanguage}
            onChange={changeLanguage}
          />
        </div>
        <h2 className="action__title">
          {promoData[0].promoTitle[selectedLanguage]}
        </h2>
        <p className="action__descr">
          {promoData[0].promoSubtitle[selectedLanguage]
            .split(targetWord)
            .map((part, index, array) =>
              index === array.length - 1 ? (
                part
              ) : (
                <React.Fragment key={index}>
                  {part}
                  <strong>{targetWord}</strong>
                </React.Fragment>
              )
            )}
        </p>
        <div className="action__box">
          <PromoContent />
        </div>
        <div className="action__wrapper">
          <button onClick={handleClick} className="action__btn btn-reset">
            {promoData[0].promoBtnPlay[selectedLanguage]}
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
    </section>
  );
};

export default ActionPage;
