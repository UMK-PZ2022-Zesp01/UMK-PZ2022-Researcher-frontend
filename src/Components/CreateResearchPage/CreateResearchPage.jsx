import React from 'react';
import './CreateResearchPage.css';
import { CreateResearchForm } from '../Form/CreateResearchForm/CreateResearchForm';
import banner from '../../img/banner2.png';
import { Helmet } from 'react-helmet';
import BookmarksNav from '../BookmarksNav/BookmarksNav';

function CreateResearchPage() {
  return (
    <div className="container">
      <Helmet>
        <title>Nowe badanie | Researcher</title>
      </Helmet>

      <header className="bookmarksContainer">
        <a href="/" className="logo">
          <img className="logoImg" src={banner} alt="Researcher Logo" />
        </a>
        <BookmarksNav active="research" />
      </header>

      <main className="createResearchPanel">
        <CreateResearchForm />
      </main>
    </div>
  );
}

export default CreateResearchPage;
