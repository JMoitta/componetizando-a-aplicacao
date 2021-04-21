import { FC, useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  selectedGenre: GenreResponseProps;
  handleClickButton: (Genre: GenreResponseProps) => void;
}

export function SideBar({ selectedGenre, handleClickButton }: SideBarProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);


  return (<nav className="sidebar">
    <span>Watch<p>Me</p></span>
    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre)}
          selected={selectedGenre.id === genre.id}
        />
      ))}
    </div>

  </nav>)
}