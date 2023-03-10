import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetTopChartQuery } from '../redux/services/deezer';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartQuery();

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const tracksData = Object.entries(data?.tracks.data);

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover</h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {tracksData.map((song, i) => (
          <SongCard
            key={song[1].id}
            song={song[1]}
            activeSong={activeSong}
            isPlaying={isPlaying}
            tracksData={tracksData}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
