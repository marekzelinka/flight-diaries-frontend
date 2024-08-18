import axios from 'axios';
import { useEffect, useState } from 'react';
import { createDiary, getAllDiaries } from './services/diary';
import type { NonSensitiveDiaryEntry } from './types';

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then(setDiaries);
  }, []);

  return (
    <>
      <h2>Add new entry</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const form = event.currentTarget;
          const formData = new FormData(form);

          try {
            const newEntry = await createDiary({
              date: String(formData.get('date')),
              visibility: String(formData.get('visibility')),
              weather: String(formData.get('weather')),
              comment: String(formData.get('comment')),
            });
            setDiaries((diaries) => diaries.concat(newEntry));

            form.reset();
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const errorMessage = String(error.response?.data);
              setErrorMessage(
                errorMessage.replace('Something went wrong. ', ''),
              );
            } else {
              console.error(error);
            }
          }
        }}
      >
        {errorMessage ? (
          <div>
            <p style={{ color: 'red' }}>{errorMessage}</p>
          </div>
        ) : null}
        <div>
          <label htmlFor="date">date</label>
          <input type="date" name="date" id="date" />
        </div>
        <div>
          <label htmlFor="visibility">visibility</label>
          <input type="text" name="visibility" id="visibility" />
        </div>
        <div>
          <label htmlFor="weather">weather</label>
          <input type="text" name="weather" id="weather" />
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <textarea name="comment" id="comment" />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
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
