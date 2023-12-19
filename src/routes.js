import ActionPage from "./Pages/ActionPage";
import AnswerPage from "./Pages/AnswerPage";
import InfoPage from "./Pages/InfoPage";
import InstagramPage from "./Pages/InstagramPage";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import NotFoundPage from "./Pages/NotFoundPage";
import QuestionPage from "./Pages/QuestionPage";

import {
  ACTION_ROUTE,
  ANSWER_ROUTE,
  INFO_ROUTE,
  INSTAGRAM_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  NOTFOUND_ROUTE,
  QUESTION_ROUTE,
} from "./utils/consts";

//Публичные маршруты
export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: <MainPage />,
  },
  {
    path: LOGIN_ROUTE,
    Component: <LoginPage />,
  },
  {
    path: ACTION_ROUTE,
    Component: <ActionPage />,
  },
  {
    path: NOTFOUND_ROUTE,
    Component: <NotFoundPage />,
  },
];

//Приватные маршруты
export const privateRoutes = [
  {
    path: QUESTION_ROUTE + "/:id",
    Component: <QuestionPage />,
  },
  {
    path: ANSWER_ROUTE + "/:id",
    Component: <AnswerPage />,
  },
  {
    path: INFO_ROUTE,
    Component: <InfoPage />,
  },
  {
    path: INSTAGRAM_ROUTE,
    Component: <InstagramPage />,
  },
];
