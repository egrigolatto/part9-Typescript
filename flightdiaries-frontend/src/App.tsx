import { useState, useEffect } from "react";
import flightDiariesService from "./Service/flightDiariesService";
import { Diary, NonSensitiveDiaryEntry, NewDiaryEntry } from "./types";
import axios from "axios";
function App() {
  const [diaries, setDiaries] = useState<Diary[] | NonSensitiveDiaryEntry[]>(
    []
  );

  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    flightDiariesService.getAllNonSensitive().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    try {
      const data = await flightDiariesService.createDiary(newDiary);
      setDiaries(diaries.concat(data));

      // Limpiar el formulario solo si se creó correctamente el diario
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
      setErrorMessage(null); // Limpiar mensaje de error si hubo uno antes
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setErrorMessage(message);
        } else {
          setErrorMessage("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setErrorMessage("Unknown error");
      }
    }

    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  interface NotificationProps {
    message: string;
  }

  const Notification = ({ message }: NotificationProps) => {
    if (!message) return null;

    return (
      <div
        style={{
          color: "red",
          border: "1px solid red",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <p>{message}</p>
      </div>
    );
  };

  return (
    <>
      <h1>Add new Entry</h1>
      <Notification message={errorMessage ?? ""} />
      <form onSubmit={diaryCreation}>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <br />

          <label>Visibility:</label>
          {["great", "good", "ok", "poor"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={(e) => setVisibility(e.target.value)}
              />
              {option}
            </label>
          ))}
          <br />

          <label>Weather:</label>
          {["sunny", "rainy", "cloudy", "stormy", "windy"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={(e) => setWeather(e.target.value)}
              />
              {option}
            </label>
          ))}
          <br />

          <label>
            Comment:
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
          <br />

          <button type="submit">Add</button>
        </div>
      </form>

      <h1>Flight Diaries</h1>
      {diaries.map((d) => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <p>Weather: {d.weather}</p>
          <p>Visibility: {d.visibility}</p>
        </div>
      ))}
    </>
  );
}

export default App;
