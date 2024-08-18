import { useEffect, useState } from 'react';
import { getAllDiaries } from './services/diary';
import type { NonSensitiveDiaryEntry } from './types';

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(setDiaries);
  }, []);

  return (
    <>
      <h2>Diary entries</h2>
      {diaries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <dl>
            <dt>visibility</dt>
            <dd>{entry.visibility}</dd>
            <dt>weather</dt>
            <dd>{entry.weather}</dd>
          </dl>
        </div>
      ))}
    </>
  );
}

export default App;
