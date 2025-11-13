import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from '@pages/HomePage';
import DetailPage from '@pages/DetailPage';
import CreatePage from '@pages/CreatePage';
import RegisterPage from '@pages/RegisterPage';
import LoginPage from '@pages/LoginPage';
import Layout from '@layout/Layout';
import NotFoundPage from '@pages/NotFoundPage';
import ArchivedNotePage from '@pages/ArchivedNotePage';
import { ThemeProvider } from "@context/ThemeContext";
import { LangProvider } from '@context/LangContext';
import AuthMiddleware from "@middleware/AuthMiddleware";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LangProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path='register'
              element={<RegisterPage />}
            />
            <Route
              path='login'
              element={<LoginPage />}
            />
            <Route
              element={
                <AuthMiddleware>
                  <Layout />
                </AuthMiddleware>
              }
            >
              <Route
                index
                element={<HomePage />}
              />
              <Route
                path='archived'
                element={<ArchivedNotePage />}
              />
              <Route
                path='create'
                element={<CreatePage />}
              />
              <Route
                path='notes/:id'
                element={<DetailPage />}
              />
            </Route>
            <Route
              path='*'
              element={<NotFoundPage />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LangProvider>
  </StrictMode>
);
