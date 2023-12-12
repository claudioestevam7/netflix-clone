import React, { useEffect, useState } from 'react';
import MovieRow from './components/MovieRow';
import Tmdb from './Tmdb';
import './App.css'
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'

export default () => {


  const socialNetworks = [
    { name: "linkedin", icon: <FaLinkedinIn />, link: 'https://www.linkedin.com/in/isabella-ramos-' },
    { name: "github", icon: <FaGithub />, link: 'https://github.com/IsabellaaRamos' },
  ];



  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      console.log(list);

      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

    }

    loadAll();


  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }


  }, []);


  return (
    <div className='page'>
      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />

        ))}

      </section>

      <footer>
        Feito com <span role='img' aria-label='coração'>❤️</span> por Cláudio Estevam<br />

        Direitos de imagem para Netflix <br />
        Dados pegos do site themoviedb.org <br />





      </footer>

      {/* <div className='social-networks'>
        {socialNetworks.map((network) => (
          <a href={network.link} target='_blank' className='social-btn' id={network.name} key={network.name}>
            {network.icon}
          </a>
        ))}
      </div> */}

      {movieList.length <= 0 &&
        <div className='loading'>
          <img src='https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif' alt='Carregando' />
        </div>
      }

    </div>



  );



}
