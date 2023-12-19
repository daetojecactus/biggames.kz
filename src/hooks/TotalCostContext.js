import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { QUESTION_ROUTE } from "../utils/consts";

export const TotalCostContext = createContext();

export const useTotalCost = () => {
  return useContext(TotalCostContext);
};

export const TotalCostProvider = ({ children }) => {
  const [totalCost, setTotalCost] = useState(() => {
    // Используем localStorage для получения суммы, если она там сохранена
    const storedTotalCost = localStorage.getItem("totalCost");
    return storedTotalCost ? parseInt(storedTotalCost) : 0;
  });

  const location = useLocation();
  const [prevCost, setPrevCost] = useState(0); // Добавляем состояние для предыдущей суммы
  const [prevQuestionData, setPrevQuestionData] = useState(null); // Добавляем состояние для предыдущего вопроса

  useEffect(() => {
    // Сохраняем сумму в localStorage при каждом изменении
    localStorage.setItem("totalCost", totalCost.toString());
  }, [totalCost]);

  const updateTotalCost = (newTotalCost) => {
    // Сохраняем предыдущую сумму и предыдущий вопрос
    setPrevCost(totalCost);
    setTotalCost(newTotalCost);
  };

  const resetTotalCost = () => {
    // Обнуляем предыдущую сумму и текущую сумму при сбросе
    setPrevCost(0);
    setTotalCost(0);
  };

  const updatePrevQuestionData = (data) => {
    setPrevQuestionData(data);
  };

  useEffect(() => {
    // Сбрасываем итоговую стоимость при переходе на первый вопрос
    if (location.pathname === `${QUESTION_ROUTE}/1`) {
      resetTotalCost();
      // Сбрасываем данные о предыдущем вопросе
      updatePrevQuestionData(null);
    }
  }, [location.pathname]);

  return (
    <TotalCostContext.Provider
      value={{
        totalCost,
        updateTotalCost,
        resetTotalCost,
        prevCost, // Передаем предыдущую сумму
        prevQuestionData, // Передаем данные о предыдущем вопросе
      }}
    >
      {children}
    </TotalCostContext.Provider>
  );
};
