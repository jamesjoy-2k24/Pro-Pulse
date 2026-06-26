import PlayerCard from "../../components/Players/PlayerCard.jsx";
import { MdPersonSearch } from "react-icons/md";
import { BsFilterLeft, BsSearch } from "react-icons/bs";
import { useState, useMemo } from "react";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { FaUserGraduate, FaTrophy, FaUsers } from "react-icons/fa";

const Players = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: players, loading, error } = useFetchData(`${BASE_URL}/players`);

  // Use useMemo for filtering to optimize performance
  const filteredPlayers = useMemo(() => {
    if (!players) return [];
    return players.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.sports.some((sport) =>
          sport.toLowerCase().includes(searchTerm.toLowerCase()),
        ) ||
        String(player.age).includes(searchTerm.toLowerCase());

      return player.isApproved === "approved" && matchesSearch;
    });
  }, [players, searchTerm]);

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Search Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20 lg:py-32">
        {/* Animated Background Mesh */}
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primaryColor/20 blur-[120px]" />
        <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-primaryColor/10 blur-[120px]" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-primaryColor backdrop-blur-md">
              <FaUserGraduate className="text-sm" />
              Elite Talent Pool
            </span>
            <h1 className="text-4xl font-[1000] tracking-tight text-white md:text-6xl">
              Discover Your Next{" "}
              <span className="text-primaryColor">Champion</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-400">
              Browse through our verified database of world-class athletes,
              filter by sports, performance metrics, and potential to find the
              perfect fit.
            </p>

            {/* Futuristic Search Bar */}
            <div className="relative mx-auto mt-12 max-w-2xl">
              <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/10">
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center pl-4 text-slate-400">
                    <BsSearch className="text-xl transition-colors group-focus-within:text-primaryColor" />
                  </div>
                  <input
                    type="search"
                    className="h-14 w-full bg-transparent px-4 text-lg font-bold text-white outline-none placeholder:text-slate-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, sport, or age..."
                  />
                  <div className="hidden items-center gap-2 pr-4 md:flex">
                    <span className="h-8 w-[1px] bg-white/10" />
                    <button className="flex h-12 items-center gap-2 rounded-2xl bg-primaryColor px-6 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-red-700 hover:shadow-[0_0_20px_rgba(161,13,9,0.4)]">
                      <BsFilterLeft className="text-xl" />
                      Filter
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 flex flex-wrap justify-center gap-8 text-white/40">
                <div className="flex items-center gap-2">
                  <FaUsers className="text-primaryColor" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    {players?.length || 0} Registered
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaTrophy className="text-primaryColor" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    Verified Pro Only
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Players Grid Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          {filteredPlayers.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPlayers.map((player) => (
                <PlayerCard key={player._id} player={player} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-300">
                <MdPersonSearch className="text-5xl" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                No players found
              </h3>
              <p className="mt-2 text-slate-500">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-8 text-sm font-black uppercase tracking-widest text-primaryColor hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Players;
