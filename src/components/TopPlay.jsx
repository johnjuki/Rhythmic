import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartQuery, useGetAlbumTracksQuery } from '../redux/services/deezer';

import 'swiper/css';
import 'swiper/css/free-mode';
import Error from './Error';

const TopAlbumCard = ({ album, i }) => (
  // const dispatch = useDispatch();
  // const { data, isFetching, error } = useGetAlbumTracksQuery(album.id);
  // const { activeSong, isPlaying } = useSelector((state) => state.player);

  // if (isFetching) return <div />;
  // if (error) return <Error />;

  // const albumData = Object.entries(data?.data);

  // albumData.forEach((music, index) => {
  //   const song = music[1];

  //   const handlePauseClick = () => {
  //     dispatch(playPause(false));
  //   };

  //   const handlePlayClick = () => {
  //     dispatch(setActiveSong({ song, albumData, index }));
  //     dispatch(playPause(true));
  //   };
  // });

  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between item-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={album.cover}
        alt={album.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${album.id}`}>
          <p className="text-xl font-bold text-white">{album.title}</p>
        </Link>
        <Link to={`/artists/${album.artist.id}`}>
          <p className="text-base text-white w-fit">{album.artist.name}</p>
        </Link>
      </div>
    </div>
    {/* <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />; */}
  </div>
);

const TopPlay = () => {
  const { data, isFetching, error } = useGetTopChartQuery();

  // const {albumData, isFetching, error} = useGetAlbumTracksQuery();
  const divRef = useRef(null);

  useEffect(() => {
    if (!isFetching && !error) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  if (isFetching) return <div />;

  if (error) return <div />;

  const topFiveAlbums = Object.entries(data?.albums.data).slice(0, 5);

  const topArtists = Object.entries(data?.artists.data);

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Albums</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topFiveAlbums?.map((album, i) => (
            <TopAlbumCard
              key={album[1].id}
              album={album[1]}
              i={i}
            />
          ))}
        </div>

        <div className="w-full flex flex-col mt-8">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <Link to="/top-artists">
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>

          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4"
          >

            {topArtists?.map((artist, i) => (
              <SwiperSlide
                key={artist[1].id}
                style={{ width: '25%', height: 'auto' }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${artist[1].id}`}>
                  <img
                    src={artist[1].picture}
                    alt={artist[1].name}
                    className="rounded-full w-full object-cover"
                  />
                </Link>
              </SwiperSlide>
            ))}

          </Swiper>

        </div>

      </div>
    </div>
  );
};

export default TopPlay;
