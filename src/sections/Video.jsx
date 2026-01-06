const Video = () => {
  return (
    <video
      className="h-full w-full object-cover"
      src="/videos/video2.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    />
  );
};

export default Video;
