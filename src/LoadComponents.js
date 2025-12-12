import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function LoadChallenge({ onSelectChallenge }) {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    async function load() {
      const challRef = collection(db, "challenges");
      const challSnap = await getDocs(challRef);

      const results = [];

      for (const docSnap of challSnap.docs) {
        const challengeId = docSnap.id;

        // Read high score
        const hsRef = collection(db, "highscores");
        const q = query(hsRef, where("c_name", "==", challengeId));
        const hsSnap = await getDocs(q);

        let best = null;
        hsSnap.forEach((d) => {
          const data = d.data();
          if (!best || data.score > best.score) best = data;
        });

        results.push({
          id: challengeId,
          grid: docSnap.data().grid,
          highscore: best,
        });
      }

      setChallenges(results);
    }

    load();
  }, []);

  return (
    <div>
      <h2>Select a Challenge</h2>

      {challenges.map((ch) => (
        <button
          key={ch.id}
          onClick={() => onSelectChallenge(ch)}
          style={{ display: "block", margin: "10px" }}
        >
          {ch.id} — High Score: {ch.highscore?.score ?? "None"}
        </button>
      ))}
    </div>
  );
}

export default LoadChallenge;
