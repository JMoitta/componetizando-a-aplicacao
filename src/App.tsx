import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { api } from './services/api';

interface Genre {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
  const genreId = 1;
  useEffect(() => {
    api.get<Genre>(`genres/${genreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, []);

  function handleClickButton(genre: Genre) {
    setSelectedGenre(genre);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        selectedGenre={selectedGenre}
        handleClickButton={handleClickButton} />

      <Content
        selectedGenre={selectedGenre} />
    </div>
  )
}