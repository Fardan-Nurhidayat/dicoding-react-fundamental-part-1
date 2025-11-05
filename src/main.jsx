import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from './pages/HomePage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import Layout from './layout/Layout.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ArchivedNotePage from './pages/ArchivedNotePage.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='archived' element={<ArchivedNotePage />} />
            <Route path='create' element={<CreatePage />} />
            <Route path='notes/:id' element={<DetailPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
