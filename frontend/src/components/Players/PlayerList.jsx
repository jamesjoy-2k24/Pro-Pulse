import PlayerCard from "./PlayerCard";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const PlayerList = () => {
  const { data: players, loading, error } = useFetchData(`${BASE_URL}/players`);

  console.log("Players data:", players); // Debugging line

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  if (!players || players.length === 0) {
    return <p>No players found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-[30px] lg:mt-[50px]">
      {players.map((player) => (
        <PlayerCard key={player._id} player={player} />
      ))}
    </div>
  );
};

export default PlayerList;
