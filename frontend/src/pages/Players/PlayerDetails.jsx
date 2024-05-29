import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import PlayerAbout from "./PlayerAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const PlayerDetails = () => {
  const [tab, setTab] = useState("about");
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      console.log(headerRef.current); // Just an example of accessing the ref
    }
  }, []);

  const { id } = useParams();
  const sponsorId = localStorage.getItem("user");
  const [Review, setReview] = useState(0);

  const {
    data: player,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/players/${id}`);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/reviews/${id}/reviews`);
        const data = await response.json();
        await setReview(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [id]);

  const review = Review?.reviews?.length > 0 ? Review?.reviews?.length : 0;

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  if (!player) {
    return null;
  }

  const {
    name = "Unknown Player",
    photo = "",
    bio = "No bio available",
    sports = [],
    age = "Unknown",
  } = player;

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[30px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className="max-w-[250px] max-h-[300px]">
                <img
                  src={photo}
                  alt={name}
                  className="w-full h-[250px] object-cover rounded-[10px]"
                />
              </figure>

              <div>
                <span className="flex mx-auto lg:flex-none text-black text-[12px]">
                  {sports.length > 0 ? (
                    sports.map((sport, index) => (
                      <span
                        key={index}
                        className="rounded-md py-2 px-3 lg:py-2 lg:px-6 leading-4 lg:text-[16px] lg:leading-5 mr-3 bg-gray-200 font-bold">
                        {index > 0 && " "} {sport}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-md py-2 px-3 lg:py-2 lg:px-6 leading-4 lg:text-[16px] lg:leading-5 mr-3 bg-gray-200 font-bold">
                      No sports listed
                    </span>
                  )}
                </span>

                <h2
                  ref={headerRef}
                  className="heading text-black text-[24px] leading-9 mt-3 font-bold">
                  {name}
                </h2>
                <p className="text__para text-[14px] leading-6">Age: {age}</p>
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 text-black font-semibold">
                    <FaStar className="text-yellow-500" />
                    {Review.averageRating}/5
                    <span className="text-gray-500">({review}) Reviews</span>
                  </span>
                </div>
                <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[380px] text-justify">
                  {bio}
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-gray-400">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about"
                    ? "text-primaryColor border-b-2 border-solid border-primaryColor"
                    : "text-black"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-black font-semibold`}>
                About
              </button>

              <button
                onClick={() => setTab("feedback")}
                className={`${
                  tab === "feedback"
                    ? "text-primaryColor border-b-2 border-solid border-primaryColor"
                    : "text-black"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-black font-semibold`}>
                Feedback
              </button>
            </div>

            <div className="mt-[50px]">
              {tab === "about" && <PlayerAbout player={player} />}
              {tab === "feedback" && <Feedback player={player} />}
            </div>
          </div>

          <div>
            <SidePanel
              player={player}
              sponsor={sponsorId}
              playerId={id}
              price={player.price}
              available={player.available}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerDetails;
