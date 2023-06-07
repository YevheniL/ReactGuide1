import React from "react";
import "./styles.css";
import "video-react/dist/video-react.css";
import { Epg, Layout } from "planby";

// Import hooks
import { useApp } from "./useApp";

// Import components
import { Timeline, ChannelItem, ProgramItem } from "./components";

import { Player, ControlBar } from "video-react";
import { channels } from "./helpers/channels";
import { epg } from "./helpers/epg";
// 'Inter',system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji', 'Segoe UI Emoji'

function App() {
  const { isLoading, getEpgProps, getLayoutProps } = useApp();

  const setEventInformation = (
    titleName,
    channelName,
    time,
    eventDesription
  ) => {
    console.log("value = " + titleName);
    document.getElementById("eventTitleId").innerHTML = titleName;
    document.getElementById("channelNameid").innerHTML =
      "Channel: " + channelName;
    document.getElementById("timeid").innerHTML = time;
    document.getElementById("eventDescriptionId").innerHTML = eventDesription;
  };

  const calback = (id) => {
    document.getElementById(id).addEventListener("focus", () => {
      setEventInformation(
        "The Book of Boba Fett",
        "R-TV",
        "11:50pm-12:55am",
        "Bounty hunter Boba Fett & mercenary Fennec Shand navigate the underworld when they return to Tatooine to claim Jabba the Hutt's old turf."
      );
    });
  };
  return (
    <div>
      <div>
        <style>{"body { background: black; }"}</style>
        <div class="information">
          <div class="poster">
            <img
              id="posterImageId"
              src="https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/sjx6zjQI2dLGtEL0HGWsnq6UyLU.jpg"
              alt="Girl in a jacket"
              width={300}
              height={180}
            />
          </div>
          <div class="description">
            <h1 id="eventTitleId" class="eventTitle" />
            <h3 class="channelName" id="channelNameid" />
            <p>
              <em id="timeid" class="time" />
            </p>
            <h3 class="eventDescription" id="eventDescriptionId" />
          </div>
        </div>
        <div class="video" style={{ backgroundPosition: "right" }}>
          <Player
            autoPlay={true}
            play
            disableDefaultControls={true}
            playsInline
            muted
            fluid={false}
            width={960}
            height={400}
          >
            <ControlBar disableCompletely={true} />
            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
          </Player>
        </div>
      </div>
      <div style={{ height: "60vh", width: "110%" }}>
        <Epg isLoading={isLoading} {...getEpgProps()}>
          <Layout
            {...getLayoutProps()}
            renderTimeline={(props) => <Timeline {...props} />}
            renderProgram={({ program, ...rest }) => (
              <ProgramItem
                key={program.data.id}
                program={program}
                {...rest}
                onFocus
              />
            )}
            renderChannel={({ channel }) => (
              setEventInformation(
                "The Book of Boba Fett",
                "R-TV",
                "11:50pm-12:55am",
                "Bounty hunter Boba Fett & mercenary Fennec Shand navigate the underworld when they return to Tatooine to claim Jabba the Hutt's old turf."
              ),
              (<ChannelItem key={channel.uuid} channel={channel} />)
            )}
          />
        </Epg>
      </div>
    </div>
  );
}

export default App;
