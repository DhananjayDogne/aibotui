import React, { useState, useEffect, useRef } from 'react';


function Main() {
    const [videoStream, setVideoStream] = useState(null);
    const [capture, setcapture] = useState(true);
    const [viewButton, setViewButton] = useState(false);
   
    const videoRef = useRef();
    const serverUrl = 'http://127.0.0.1:5000';
    
    useEffect(() => {
        const initCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setVideoStream(stream);
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error('Error accessing the camera:', error);
            }
        };

        initCamera();
    }, []);


    const captureFrame = async () => {
        if (videoRef.current && videoStream) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const frameBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));

            sendFrameToServer(frameBlob);
        }
    };
    // const continousCapture = () => {
    //   console.log("event11",bool)
    //   if (bool) {
    //     console.log("event1111",bool)
    //     captureFrame();
    //     setTimeout(continousCapture, 5000); 
    //   }
    //   
    // }

    // useEffect(()=>{
    //   const interval = setInterval(()=>{
    //     if(capture){
    //       captureFrame()
    //     }
    //   },4000);
    //   return () => clearInterval(interval);
    // },[])

    let intervalId = null;

    const continousCapture = () => {
        console.log("event11", capture)
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            captureFrame();
        }, 5000);
    }


    const handleStart = () => {
        setViewButton(true);
        setcapture(true);
        //   console.log("event11",capture)
        continousCapture();
    }

    const handleStop = () => {
        setViewButton(false);
        setcapture(false);
        clearInterval(intervalId);
        //   console.log("event11",bool)
        window.location.reload(false);
    }

    const sendFrameToServer = async (frameBlob) => {
        try {
            const response = await fetch(`${serverUrl}/process_image`, {
                method: 'POST',
                body: frameBlob,
                headers: {
                    'Content-Type': 'image/jpeg',
                },
            });
            console.log(response.json());

            if (!response) {
                console.error('Failed to send frame to the server:', response.statusText);
            }
            else {
                const textData = await fetchTextData();
                if (textData.length > 0) {

                    const description = textData.join(', ');
                    console.log("description", description)

                }
            }
        } catch (error) {
            console.error('Error sending frame to the server:', error);
        }
    };

    const fetchTextData = async () => {
        try {
            const response = await fetch(`${serverUrl}/process_image`);
            if (response.ok) {
                const textData = await response.json();
                return textData;
            } else {
                console.error('Failed to fetch text data:', response.statusText);
                return [];
            }
        } catch (error) {
            console.error('Error fetching text data:', error);
            return [];
        }
    };



    return (
        <div className="App m-auto">
            <h1>Camera App</h1>
            <div className='m-auto'><video ref={videoRef} autoPlay /></div>
            {viewButton ? <button onClick={handleStop}>Stop Frame</button> : <button onClick={handleStart}>Capture Frame</button>}
        </div>
    );
}

export default Main;