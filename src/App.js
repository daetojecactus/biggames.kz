import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import { LanguageProvider } from "./hooks/LanguageContext";
import { TotalCostProvider } from "./hooks/TotalCostContext";
import { QuestionIndexProvider } from "./hooks/QuestionIndexContext";
import { AuthProvider } from "./hooks/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <QuestionIndexProvider>
          <TotalCostProvider>
            <AuthProvider>
              <AppRouter />
            </AuthProvider>
          </TotalCostProvider>
        </QuestionIndexProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
export default App;
