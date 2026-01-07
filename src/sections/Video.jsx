const Video = () => {
  return (
    <video
      className="h-full w-full object-cover pointer-events-none"
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
