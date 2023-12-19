import React, { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import questions from "../Data/NewQuestions";
import { useNavigate } from "react-router-dom";
import { getNextQuestionId, getPrevQuestionId } from "../Data/NewQuestions";
import { useQuestionIndex } from "../hooks/QuestionIndexContext";
import { useLanguage, changeLanguage } from "../hooks/LanguageContext";
import LanguageSwitcher from "../Components/LanguageSwitcher";
import ProgressBar from "../Components/ProgressBar";
import { useTotalCost } from "../hooks/TotalCostContext";
import buttonsAndQuestion from "../Data/ButtonsAndQuestion";
import { QUESTION_ROUTE, ANSWER_ROUTE } from "../utils/consts";
import LogoTop from "../Components/LogoTop";

const QuestionPage = () => {
  const { id } = useParams();
  const currentQuestion = questions.find(
    (question) => question.id === parseInt(id)
  );
  const [selectedOptionId, setSelectedOptionId] = useState(null); //Выбранный вариант
  const [isOtherOptionsDisabled, setIsOtherOptionsDisabled] = useState(false); //Накладываем фильтр на не выбранные варианты
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true); // Для блокировки кнопки "Далее"
  const navigate = useNavigate(); //Навигация
  const { selectedLanguage, changeLanguage } = useLanguage(); //Язык
  const { totalCost, updateTotalCost } = useTotalCost(); //Итоговая стоимость
  const { updateCurrentQuestionId, removeLastSelectedOption, selectedOptions } =
    useQuestionIndex(); //контекст с переменными
  const location = useLocation(); //Получаем данные

  //кнопка далее
  const handleNextQuestion = () => {
    if (selectedOptionId !== null) {
      const selectedOption = currentQuestion.options.find(
        (option) => option.id === selectedOptionId
      );

      const currentQuestionCost = selectedOption ? selectedOption.value : 0;
      updateCurrentQuestionId(currentQuestion.id);
      const newTotalCost = totalCost + currentQuestionCost;
      updateTotalCost(newTotalCost);

      navigate(`${ANSWER_ROUTE}/${id}`, {
        state: { selectedOptionId, cost: newTotalCost },
      });
    }
  };

  //Кнопка назад
  const handleGoBack = () => {
    const prevQuestionId = getPrevQuestionId(id);
    const prevQuestion = questions.find(
      (question) => question.id === parseInt(prevQuestionId)
    );

    if (prevQuestion) {
      const selectedOptionId = selectedOptions[selectedOptions.length - 1]; // Получаем последний выбранный вариант
      const selectedOption = prevQuestion.options.find(
        (option) => option.id === selectedOptionId
      );
      const prevQuestionCost = selectedOption ? selectedOption.value : 0;

      removeLastSelectedOption(); // Удаляем последний выбранный вариант из массива
      updateCurrentQuestionId(prevQuestion.id);

      const newTotalCost = totalCost - prevQuestionCost;
      updateTotalCost(newTotalCost);

      navigate(`${QUESTION_ROUTE}/${prevQuestionId}`, {
        state: { selectedOptionId: selectedOptionId },
      });
    }
  };

  //Выбираем вариант ответа
  const handleCardClick = (optionId) => {
    setSelectedOptionId(optionId);
    setIsOtherOptionsDisabled(true); // Отключаем другие ответы при выборе
    setIsNextButtonDisabled(false); // Разблокируем кнопку "Далее" при выборе ответа
  };

  //Прячем кнопку назад если мы на странице 1
  const hideBackButton = id === "1";

  return (
    <section className="questions" id="questions">
      <div className="questions__container container">
        <div className="questions-top">
          <LogoTop />
          <div className="questions-top__bottom">
            <ProgressBar totalCost={totalCost} />
            <LanguageSwitcher
              selectedLanguage={selectedLanguage}
              onChange={changeLanguage}
            />
          </div>
        </div>
        <div className="questions__content">
          <h2 className="questions__number">
            {buttonsAndQuestion[0].question[selectedLanguage]}{" "}
            {currentQuestion.id}
          </h2>
          <h3 className="questions__question">
            {currentQuestion.question[selectedLanguage]}
          </h3>
          <ul className="questions__list list-reset">
            {currentQuestion.options.map((option) => (
              <li
                key={option.id}
                className={`questions__item ${
                  selectedOptionId === option.id ? "selected" : ""
                } ${
                  isOtherOptionsDisabled && selectedOptionId !== option.id
                    ? "disabled"
                    : ""
                }`}
                onClick={() => handleCardClick(option.id)}
              >
                <input
                  type="radio"
                  name="option"
                  className="questions__input"
                  checked={selectedOptionId === option.id}
                  onChange={() => setSelectedOptionId(option.id)}
                />
                <p className="questions__descr">
                  {option.text[selectedLanguage]}
                </p>
                <img
                  src={option.image[selectedLanguage]}
                  alt={option.text[selectedLanguage]}
                  className="questions__image"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="questions__btns">
          {!hideBackButton && (
            <button
              onClick={handleGoBack}
              className="questions__btn-prev btn-reset"
            >
              {buttonsAndQuestion[0].buttonPrev[selectedLanguage]}
            </button>
          )}
          <button
            onClick={handleNextQuestion}
            className={`questions__btn-next btn-reset ${
              isNextButtonDisabled ? "disabled" : ""
            }`}
            disabled={isNextButtonDisabled}
          >
            {buttonsAndQuestion[0].buttonNext[selectedLanguage]}
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuestionPage;
