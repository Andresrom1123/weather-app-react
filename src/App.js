import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

const HomePage = lazy(() => import("./pages/HomePage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<>...</>}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<>...</>}>
              <ErrorPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
