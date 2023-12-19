import React from "react";
import { useLanguage, changeLanguage } from "../hooks/LanguageContext";
import FormData from "../Data/FormData";
import { useNavigate } from "react-router-dom";
import { INFO_ROUTE, MAIN_ROUTE } from "../utils/consts";

const FormSuccessModal = ({ onClose }) => {
  const { selectedLanguage, changeLanguage } = useLanguage(); //Язык
  const navigate = useNavigate(); //Навигация

  //Кнопка Перейти на главную
  const handleClickReturn = () => {
    navigate(MAIN_ROUTE);
    onClose(); // Закрыть модальное окно после навигации
  };

  //Кнопка ЖК для вас
  const handleClickInfo = () => {
    navigate(INFO_ROUTE);
    onClose(); // Закрыть модальное окно после навигации
  };

  // Обработчик события для закрытия модального окна при клике на заднем фоне
  const handleBackdropClick = () => {
    onClose();
  };

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="container modal__container">
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <img
            src="/images/success.png"
            alt="успех"
            className="modal__content-image"
          />
          <h2 className="modal__content-success">
            {FormData[0].formSuccessTitle[selectedLanguage]}
          </h2>
          <div className="modal__content-wrapper">
            <button
              className="modal__btn-return btn-reset"
              onClick={handleClickReturn}
            >
              {FormData[0].formSuccessBtnReturn[selectedLanguage]}
            </button>
            <button
              className="modal__btn-back btn-reset"
              onClick={handleClickInfo}
            >
              {FormData[0].formSuccessBtnInfo[selectedLanguage]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSuccessModal;
