//Тут хранима ответы и вопросы
import React, { createContext, useContext, useState, useEffect } from "react";

const QuestionIndexContext = createContext();

export const QuestionIndexProvider = ({ children }) => {
  const [currentQuestionId, setCurrentQuestionId] = useState(() => {
    const storedQuestionId = localStorage.getItem("currentQuestionId");
    return storedQuestionId ? parseInt(storedQuestionId) : 1;
  });
  const [selectedOptions, setSelectedOptions] = useState([]);

  // При загрузке приложения, попытаемся восстановить массив из localStorage
  useEffect(() => {
    const savedOptions = JSON.parse(localStorage.getItem("selectedOptions"));
    if (savedOptions) {
      setSelectedOptions(savedOptions);
    }
  }, []);

  // При изменении массива, будем сохранять его в localStorage
  useEffect(() => {
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  const updateCurrentQuestionId = (newQuestionId) => {
    setCurrentQuestionId(newQuestionId);
    localStorage.setItem("currentQuestionId", newQuestionId);
  };

  const addSelectedOption = (optionId) => {
    setSelectedOptions([...selectedOptions, optionId]);
  };

  const removeLastSelectedOption = () => {
    const updatedOptions = [...selectedOptions];
    updatedOptions.pop();
    setSelectedOptions(updatedOptions);
  };

  return (
    <QuestionIndexContext.Provider
      value={{
        currentQuestionId,
        selectedOptions,
        updateCurrentQuestionId,
        addSelectedOption,
        removeLastSelectedOption,
      }}
    >
      {children}
    </QuestionIndexContext.Provider>
  );
};

export const useQuestionIndex = () => {
  return useContext(QuestionIndexContext);
};
