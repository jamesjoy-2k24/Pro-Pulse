import PlayerCard from "../../components/Players/PlayerCard.jsx";
import { MdPersonSearch } from "react-icons/md";
import { BsFilterLeft } from "react-icons/bs";
import { useState } from "react";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Players = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: players, loading, error } = useFetchData(`${BASE_URL}/players`);

  // console.log("Players data:", players);

  //  Null statement debug
  if (!players) {
    return null;
  }

  // Develop search functionality
  const filteredPlayers = players.filter((player) => {
    return (
      player.isApproved === "approved" &&
      (player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.sports.some((sport) =>
          sport.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        String(player.age).includes(searchTerm.toLowerCase()))
    );
  });

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <>
      <section className="py-12 bg-whiteColor">
        <div className="container text-center">
          <h2 className="heading">Find Best Players</h2>
          <div className="relative max-w-[570px] mx-auto bg-gray-200 h-[60px] mt-[2rem] rounded-md flex items-center justify-between border border-gray-300">
            <MdPersonSearch className="ml-6 text-[3rem] text-primaryColor font-semibold" />
            <input
              type="search"
              className="py-4 pl-6 pr-2 bg-transparent w-full focus:outline-none placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Players by names or sports...."
            />
            <BsFilterLeft className="mr-[10rem] text-[3rem] text-primaryColor font-semibold" />
            <button className="bg-primaryColor text-white px-8 py-4 right-0 absolute rounded-r-md mt-0">
              <span className="text-[19px] text-[700]">Search</span>
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player._id} player={player} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Players;
