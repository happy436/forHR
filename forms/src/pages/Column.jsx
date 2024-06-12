import React from 'react';
import { useDrop } from 'react-dnd';
import Word from './Word';

const Column = ({ words, setWords, oppositeWords, setOppositeWords, initialWords, isLeftColumn }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'WORD',
    drop: (item) => {
      if (isLeftColumn) {
        // В левой колонке слова не должны удаляться
        if (!words.includes(item.word)) {
          setWords((prevWords) => [...prevWords, item.word]);
        }
      } else {
        // В правой колонке слова могут удаляться из правой и добавляться в левую
        setWords((prevWords) => [...prevWords, item.word]);
        setOppositeWords((prevWords) => prevWords.filter((word) => word !== item.word));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`p-4 w-1/2 border ${isOver ? 'bg-gray-200' : ''}`}>
      {words.map((word, index) => (
        <Word key={index} word={word} isLeftColumn={isLeftColumn} setWords={setWords} />
      ))}
    </div>
  );
};

export default Column;
