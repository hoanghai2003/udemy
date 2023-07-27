import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import FoodterBar from "../../components/Layout/Foodter/FoodterBar";
import Foodter from "../../components/Layout/Foodter/Foodter";
import "./Videos.css";

function Videos() {
  // const [playing, setPlaying] = useState(false);
  // const [volume, setVolume] = useState(0.8);
  // const playerRef = useRef(null);

  // const handlePlayPause = () => {
  //   setPlaying(!playing);
  // };

  // const handleVolumeChange = (e: any) => {
  //   const volume = parseFloat(e.target.value);
  //   setVolume(volume);
  // };
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleOppen = () => {
    setIsOpen(!isOpen);
  };
  const handleOpenvideo = () => {
    setIsVideoOpen(!isVideoOpen);
  };
  return (
    <>
      <div>
        <div className="header-video">
          <div className="video-inner dipl-video">
            <div className="dipl-video">
              <img
                src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg"
                alt=""
                style={{ height: "34px" }}
              />
              <span className="solid"></span>
              <div className="dco-video">
                <p>
                  SocketIO v4, with websockets - the details. Updated May2023
                </p>
              </div>
            </div>
            <div className="dipl-video">
              <div className="linkvd">
                <i className="fa-regular fa-star"></i>
                <a href="">Leave a rating</a>
              </div>
              <div className="dipl-video">
                <div className="dipl-video cupvd">
                  <div className="boder">
                    <i className="fa-solid fa-trophy"></i>
                  </div>
                  <div className="share-vd">
                    <span>Your progress</span>
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                </div>
                {/*  */}
                <div className="btn-video">
                  <button className="sharevd">
                    <span>Share</span>
                    <i className="fa-solid fa-share"></i>
                  </button>
                  <button className="menuvd">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="boss-video">
          <div style={{ width: "100%" }}>
            <div className="container-video">
              <div className="video">
                <ReactPlayer url="https://youtu.be/aGUQsb31TEw?list=RDO0StKlRHVeE" />
              </div>
              <div className="volum-vd bgr-cl">
                <div className="display">
                  <i className="fa-solid fa-pause"></i>
                  <i className="fa-solid fa-backward"></i>
                  <div className="">
                    1{" "}
                    <span>
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </div>
                  <i className="fa-solid fa-forward"></i>
                  <div>
                    <span>6:32</span>
                    <span>/</span>
                    <span>2:23</span>
                  </div>
                  <i className="fa-solid fa-bars"></i>
                </div>
                <div className="display">
                  <i className="fa-solid fa-volume-high"></i>
                  <i className="fa-solid fa-file"></i>
                  <i className="fa-regular fa-credit-card"></i>
                  <i className="fa-solid fa-gear"></i>
                  <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                  <button onClick={handleOppen}>
                    <i className="fa-solid fa-expand"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="desception-video">
              <div className="desception-m">
                <section>
                  <div className="btn-link-video">
                    <button>
                      <h2>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </h2>
                    </button>
                    <button>
                      <h2>Course content</h2>
                    </button>
                    <button>
                      <h2>Course content</h2>
                    </button>
                    <button>
                      <h2>Course content</h2>
                    </button>
                    <button>
                      <h2>Course content</h2>
                    </button>
                  </div>
                  <div className="socket">
                    <h2>About this course</h2>
                    <p>
                      Socket io. Learn how to harness real-time communication on
                      the web. W/Cluster Module, React and a real time game!
                    </p>
                  </div>
                  <div className="skilll">
                    <dt>By the numbers</dt>
                    <dd>
                      <div>Skill level:all</div>
                      <div>Skill level:asda</div>
                      <div>Skill level:dasd</div>
                      <div>Skill level:asdad</div>
                    </dd>
                    <dd>
                      <div>Skill level:dasd</div>
                      <div>Skill level:asdad</div>
                    </dd>
                  </div>
                </section>
              </div>
            </div>
            <FoodterBar />
            <Foodter />
          </div>
          {isOpen && (
            <div className="left-video">
              <div className="contentt">
                <span>Course content</span>
                <button onClick={() => setIsOpen(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              {/*  */}
              <div className="list-video" onClick={handleOpenvideo}>
                <div className="">
                  <h2>Section 1 : Introduction</h2>
                  <span>4/4 |18min</span>
                </div>
                <i
                  className={`fa-solid fa-chevron-down ${
                    isVideoOpen ? "rotated" : ""
                  }`}
                ></i>
              </div>
              {isVideoOpen && (
                <>
                  {" "}
                  <div className="scrollbarr">
                    <div className="new-div1">
                      <input type="checkbox" />
                      <div className="mta-vdeo">
                        <span>1.Welcom Video</span>
                        <div className="tv-vd">
                          <i className="fa-solid fa-tv"></i>
                          <p>5min</p>
                        </div>
                      </div>
                    </div>
                    <div className="new-div1">
                      <input type="checkbox" />
                      <div className="mta-vdeo">
                        <span>1.Welcom Video</span>
                        <div className="tv-vd">
                          <i className="fa-solid fa-tv"></i>
                          <p>5min</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Videos;
