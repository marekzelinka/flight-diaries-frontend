import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { createDiary, getAllDiaries } from './services/diary';
import { Visibility, Weather, type NonSensitiveDiaryEntry } from './types';

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
        <fieldset>
          <legend>visibility</legend>
          {Object.values(Visibility).map((visibility) => (
            <Fragment key={visibility}>
              <input
                type="radio"
                name="visibility"
                id={visibility}
                value={visibility}
              />
              <label htmlFor={visibility}>{visibility}</label>
            </Fragment>
          ))}
        </fieldset>
        <fieldset>
          <legend>weather</legend>
          {Object.values(Weather).map((weather) => (
            <Fragment key={weather}>
              <input type="radio" name="weather" id={weather} value={weather} />
              <label htmlFor={weather}>{weather}</label>
            </Fragment>
          ))}
        </fieldset>
        <div>
          <label htmlFor="comment">comment</label>
          <input type="text" name="comment" id="comment" />
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
