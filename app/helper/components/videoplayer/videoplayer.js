import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId, handleVideoEnd }) => {
    // Define aspect ratio for the video player

    // Calculate dynamic width based on the aspect ratio and desired height



   

    const opts = {
        width: "1000px",
        height: "700px",
        playerVars: {
          autoplay: 1,
        },
       
    };

   

    return (
        <YouTube videoId={videoId} opts={opts} onEnd={handleVideoEnd}/>
    );
};

export default VideoPlayer;
