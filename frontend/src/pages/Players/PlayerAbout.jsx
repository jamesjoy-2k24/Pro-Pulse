/* eslint-disable react/prop-types */
import { formateDate } from "../../utils/formateDate";

const PlayerAbout = ({ player }) => {
  const { name, about, place, club, sports, experiences } = player;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          About
          <span className="text-primaryColor ml-2">{name}</span>
        </h3>
        <p className="text-base text-gray-700 mb-6">{about}</p>
      </div>

      {sports && sports.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Sports</h3>
          <ul className="space-y-4">
            {sports.map((sport, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-800">
                    {sport}
                  </span>
                  <p className="text-base text-gray-600">{club}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2 sm:mt-0">{place}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {experiences && experiences.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Experiences</h3>
          <ul className="grid sm:grid-cols-2 gap-6">
            {experiences.map((item, index) => (
              <li key={index} className="p-5 bg-gray-100 rounded-lg shadow-sm">
                <span className="text-primaryColor text-lg font-semibold">
                  {formateDate(item.startDate)} - {formateDate(item.endDate)}
                </span>
                <p className="mt-2 text-base text-gray-800">
                  <span className="text-black">Position:</span> {item.position}
                </p>
                <p className="mt-1 text-base text-gray-800">
                  <span className="text-black">Club: </span>
                  {item.club}
                </p>
                <p className="mt-1 text-base text-gray-800">
                  <span className="text-black">Place: </span>
                  {item.place}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlayerAbout;
