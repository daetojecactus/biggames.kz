import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar";
import questions from "../Data/NewQuestions";
import { getNextQuestionId, getPrevQuestionId } from "../Data/NewQuestions";
import { useTotalCost } from "../hooks/TotalCostContext";
import { useNavigate } from "react-router-dom";
import { useQuestionIndex } from "../hooks/QuestionIndexContext";
import { useLanguage, changeLanguage } from "../hooks/LanguageContext";
import LanguageSwitcher from "../Components/LanguageSwitcher";
import buttonsAndQuestion from "../Data/ButtonsAndQuestion";
import { motion } from "framer-motion";
import AnswerPriceAnimation from "../Animations/AnswerPriceAnimation";
import AnswerImageAnimation from "../Animations/AnswerImageAnimation";
import { INSTAGRAM_ROUTE, QUESTION_ROUTE } from "../utils/consts";
import LogoTop from "../Components/LogoTop";

const AnswerPage = () => {
  const { id } = useParams();
  const currentQuestion = questions.find(
    (question) => question.id === parseInt(id)
  );
  const location = useLocation();
  const { selectedOptionId, cost } = location.state || {}; //Получаем переменные
  const navigate = useNavigate(); //Навигация
  const { selectedLanguage, changeLanguage } = useLanguage(); //Язык
  const { totalCost, updateTotalCost } = useTotalCost(); //Итоговая сумма
  const { updateCurrentQuestionId, addSelectedOption } = useQuestionIndex();
  const totalQuestions = questions.length; //Длина вопросов
  const isLastQuestion = parseInt(id) === totalQuestions;

  // кнопка Завершить
  const handleFinish = () => {
    // Перенаправляем пользователя на страницу /info и передаем туда итоговую сумму
    navigate(INSTAGRAM_ROUTE, { state: { totalCost } });
  };

  //кнопка назад
  const handleGoBack = () => {
    const questionId = id;
    const currentQuestion = questions.find(
      (question) => question.id === parseInt(questionId)
    );
    if (currentQuestion) {
      const selectedOption = currentQuestion.options.find(
        (option) => option.id === selectedOptionId
      );
      const prevQuestionCost = selectedOption ? selectedOption.value : 0;
      updateCurrentQuestionId(currentQuestion.id);
      const newTotalCost = totalCost - prevQuestionCost;
      updateTotalCost(newTotalCost);
      navigate(`${QUESTION_ROUTE}/${id}`, {
        state: { selectedOptionId, cost: newTotalCost },
      });
    }
  };

  //кнопка Далее
  const handleNextQuestion = () => {
    const nextQuestionId = getNextQuestionId(id);
    if (nextQuestionId) {
      addSelectedOption(selectedOptionId);

      navigate(`${QUESTION_ROUTE}/${nextQuestionId}`, {
        state: { cost: totalCost, selectedOptionId: selectedOptionId },
      });
    }
  };

  //выбранный вариант ответа
  const selectedOption = currentQuestion.options.find(
    (option) => option.id === selectedOptionId
  );

  return (
    <section className="answer" id="answer">
      <div className="container answer__container">
        <div className="answer-top">
          <LogoTop />
          <div className="answer-top__bottom">
            <ProgressBar totalCost={totalCost} />
            <LanguageSwitcher
              selectedLanguage={selectedLanguage}
              onChange={changeLanguage}
            />
          </div>
        </div>
        {selectedOption && (
          <>
            <h2 className="answer__title">
              {selectedOption.messageTitle[selectedLanguage]}
            </h2>
            <p className="answer__subtitle">
              {selectedOption.messageDescr[selectedLanguage]}
            </p>
            <div className="answer__picture">
              <motion.img
                src={selectedOption.image[selectedLanguage]}
                alt=""
                className="answer__image"
                initial="hidden"
                whileInView="visible"
                variants={AnswerImageAnimation}
              />
            </div>
            <motion.p
              className="answer__price"
              initial="hidden"
              whileInView="visible"
              variants={AnswerPriceAnimation}
            >
              + {selectedOption.value.toLocaleString("ru-RU")} тг
            </motion.p>
          </>
        )}

        <div className="answer__btns">
          <button onClick={handleGoBack} className="answer__btn-prev btn-reset">
            {buttonsAndQuestion[0].buttonPrev[selectedLanguage]}
          </button>
          {isLastQuestion ? (
            <button
              onClick={handleFinish}
              className="answer__btn-next btn-reset"
            >
              {buttonsAndQuestion[0].buttonComplete[selectedLanguage]}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="answer__btn-next btn-reset"
            >
              {buttonsAndQuestion[0].buttonNext[selectedLanguage]}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnswerPage;
