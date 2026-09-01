// =====================================================
// SMART FITNESS DASHBOARD
// APP.JS
// =====================================================


// =====================================================
// EMG SETTINGS
// =====================================================

const EMG_THRESHOLD = 65;

let emgPercent = 0;

let emgRaw = 0;

let reps = 0;

let lastCVRep = false;


// =====================================================
// EXERCISE TRACKER
// =====================================================

const tracker =
  new ExerciseTracker();


// =====================================================
// CAMERA
// =====================================================

const video =
  document.getElementById("camera");

const canvas =
  document.getElementById("overlay");

const ctx =
  canvas.getContext("2d");


// =====================================================
// ELEMENT HELPER
// =====================================================

const $ =
  id => document.getElementById(id);


// =====================================================
// UPDATE DASHBOARD
// =====================================================

function update()
{
  $("emg").textContent =
    Math.round(emgPercent) + "%";

  $("reps").textContent =
    reps;
}


// =====================================================
// VALIDATE COMPUTER VISION RESULT
// =====================================================

function validate(r)
{
  if (!r)
    return;


  // ---------------------------------------------------
  // FORM STATUS
  // ---------------------------------------------------

  $("form").textContent =
    r.formMessage;


  // ---------------------------------------------------
  // REP DETECTED
  // ---------------------------------------------------

  if (r.repDetected)
  {

    if (
      r.formOK &&
      emgPercent >= EMG_THRESHOLD
    )
    {
      $("message").textContent =
        "VALID REP — CV + EMG passed";
    }

    else
    {
      $("message").textContent =
        "REP REJECTED — EMG below threshold";
    }

  }

  else
  {
    $("message").textContent =
      "Tracking...";
  }


  // ---------------------------------------------------
  // COUNT VALID REP
  // ---------------------------------------------------

  if (
    r.repDetected &&
    !lastCVRep &&
    r.formOK &&
    emgPercent >= EMG_THRESHOLD
  )
  {
    reps++;

    update();

    console.log(
      "VALID REP:",
      reps
    );
  }


  // ---------------------------------------------------
  // SAVE CV STATE
  // ---------------------------------------------------

  lastCVRep =
    r.repDetected;
}


// =====================================================
// WORKOUT SELECTION
// =====================================================

$("workoutSelect").onchange =
  e =>
  {

    const selectedWorkout =
      e.target.value;


    // -------------------------------------------------
    // Tell exercise tracker
    // -------------------------------------------------

    tracker.setExercise(
      selectedWorkout
    );


    // -------------------------------------------------
    // Update dashboard
    // -------------------------------------------------

    $("workout").textContent =
      e.target.options[
        e.target.selectedIndex
      ].text;


    // -------------------------------------------------
    // Reset reps for new workout
    // -------------------------------------------------

    reps =
      0;

    lastCVRep =
      false;


    update();


    console.log(
      "Workout selected:",
      selectedWorkout
    );

  };


// =====================================================
// CAMERA BUTTON
// =====================================================

$("cameraBtn").onclick =
  async () =>
  {

    try
    {

      // -----------------------------------------------
      // Request camera
      // -----------------------------------------------

      video.srcObject =
        await navigator.mediaDevices.getUserMedia(
          {
            video:
            {
              facingMode:
                "user",

              width:
              {
                ideal:
                  640
              },

              height:
              {
                ideal:
                  480
              }
            },

            audio:
              false
          }
        );


      // -----------------------------------------------
      // Start video
      // -----------------------------------------------

      await video.play();


      $("message").textContent =
        "Camera active — tracking...";


      // -----------------------------------------------
      // Start MediaPipe
      // -----------------------------------------------

      startPose();

    }

    catch (e)
    {

      console.error(
        "Camera error:",
        e
      );


      $("message").textContent =
        "Camera error: " +
        e.message;

    }

  };


// =====================================================
// MEDIAPIPE POSE
// =====================================================

function startPose()
{

  const pose =
    new Pose(
      {
        locateFile:
          f =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`
      }
    );


  // ---------------------------------------------------
  // MEDIAPIPE OPTIONS
  // ---------------------------------------------------

  pose.setOptions(
    {
      modelComplexity:
        1,

      smoothLandmarks:
        true,

      enableSegmentation:
        false,

      minDetectionConfidence:
        0.6,

      minTrackingConfidence:
        0.6
    }
  );


  // ---------------------------------------------------
  // RESULTS
  // ---------------------------------------------------

  pose.onResults(
    r =>
    {

      // ---------------------------------------------
      // Canvas size
      // ---------------------------------------------

      canvas.width =
        video.videoWidth ||
        640;

      canvas.height =
        video.videoHeight ||
        480;


      // ---------------------------------------------
      // Clear canvas
      // ---------------------------------------------

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      // ---------------------------------------------
      // Pose detected
      // ---------------------------------------------

      if (
        r.poseLandmarks
      )
      {

        ctx.fillStyle =
          "#00ff88";


        r.poseLandmarks.forEach(
          p =>
          {

            if (
              (p.visibility ?? 1) >=
              0.35
            )
            {

              ctx.beginPath();

              ctx.arc(
                p.x *
                  canvas.width,

                p.y *
                  canvas.height,

                3,

                0,

                Math.PI * 2
              );

              ctx.fill();

            }

          }
        );


        // -------------------------------------------
        // Exercise tracker
        // -------------------------------------------

        const result =
          tracker.process(
            r.poseLandmarks
          );


        validate(
          result
        );

      }

    }
  );


  // =================================================
  // CAMERA / POSE LOOP
  // =================================================

  async function loop()
  {

    if (
      video.readyState >=
      2
    )
    {

      try
      {

        await pose.send(
          {
            image:
              video
          }
        );

      }

      catch (error)
      {

        console.error(
          "Pose error:",
          error
        );

      }

    }


    requestAnimationFrame(
      loop
    );

  }


  loop();

}


// =====================================================
// EMG UPDATE FUNCTION
// =====================================================
//
// Waveshare BLE code calls:
//
// window.onEMGUpdate(percent);
//
// =====================================================

window.onEMGUpdate =
  function(percent)
  {

    emgPercent =
      Math.max(
        0,

        Math.min(
          100,

          Number(percent) ||
            0
        )
      );


    update();


    console.log(
      "EMG:",
      emgPercent.toFixed(1) +
      "%"
    );

  };


// =====================================================
// WAVESHARE BLE
// =====================================================


// -----------------------------------------------------
// DEVICE
// -----------------------------------------------------

const WAVESHARE_NAME =
  "WAVESHARE_EMG";


// -----------------------------------------------------
// SERVICE UUID
// -----------------------------------------------------

const WAVESHARE_SERVICE =
  "6e400001-b5a3-f393-e0a9-e50e24dcca9e";


// -----------------------------------------------------
// CHARACTERISTIC UUID
// -----------------------------------------------------

const WAVESHARE_CHARACTERISTIC =
  "6e400003-b5a3-f393-e0a9-e50e24dcca9e";


// -----------------------------------------------------
// BLE VARIABLES
// -----------------------------------------------------

let wearableDevice =
  null;

let wearableServer =
  null;

let wearableCharacteristic =
  null;

let wearableConnected =
  false;


// =====================================================
// BLE ELEMENTS
// =====================================================

const bleBtn =
  $("bleBtn");

const wearableStatus =
  $("wearableStatus");

const wearableName =
  $("wearableName");

const sensorStatus =
  $("sensorStatus");

const emgRawDisplay =
  $("emgRaw");


// =====================================================
// CHECK BLUETOOTH SUPPORT
// =====================================================

if (
  !("bluetooth" in navigator)
)
{

  console.warn(
    "Web Bluetooth is not supported."
  );


  if (bleBtn)
  {

    bleBtn.disabled =
      true;

    bleBtn.textContent =
      "Bluetooth Not Supported";

  }

}


// =====================================================
// CONNECT WEARABLE BUTTON
// =====================================================

if (bleBtn)
{

  bleBtn.addEventListener(
    "click",
    connectWearable
  );

}


// =====================================================
// CONNECT WAVESHARE
// =====================================================

async function connectWearable()
{

  try
  {

    // -----------------------------------------------
    // UI
    // -----------------------------------------------

    bleBtn.disabled =
      true;

    bleBtn.textContent =
      "Searching...";


    if (wearableStatus)
    {

      wearableStatus.textContent =
        "SEARCHING";

    }


    $("message").textContent =
      "Searching for WAVESHARE_EMG...";


    // -----------------------------------------------
    // Request BLE device
    // -----------------------------------------------

    wearableDevice =
      await navigator.bluetooth.requestDevice(
        {
          filters:
          [
            {
              name:
                WAVESHARE_NAME
            }
          ],

          optionalServices:
          [
            WAVESHARE_SERVICE
          ]
        }
      );


    console.log(
      "Waveshare found:",
      wearableDevice.name
    );


    // -----------------------------------------------
    // Device name
    // -----------------------------------------------

    if (wearableName)
    {

      wearableName.textContent =
        wearableDevice.name ||
        WAVESHARE_NAME;

    }


    // -----------------------------------------------
    // Connecting
    // -----------------------------------------------

    bleBtn.textContent =
      "Connecting...";


    if (wearableStatus)
    {

      wearableStatus.textContent =
        "CONNECTING";

    }


    $("message").textContent =
      "Connecting to wearable...";


    // -----------------------------------------------
    // Disconnect listener
    // -----------------------------------------------

    wearableDevice.addEventListener(
      "gattserverdisconnected",
      handleWearableDisconnected
    );


    // -----------------------------------------------
    // Connect GATT
    // -----------------------------------------------

    wearableServer =
      await wearableDevice.gatt.connect();


    console.log(
      "Waveshare GATT connected"
    );


    // -----------------------------------------------
    // Get service
    // -----------------------------------------------

    const service =
      await wearableServer.getPrimaryService(
        WAVESHARE_SERVICE
      );


    // -----------------------------------------------
    // Get characteristic
    // -----------------------------------------------

    wearableCharacteristic =
      await service.getCharacteristic(
        WAVESHARE_CHARACTERISTIC
      );


    // -----------------------------------------------
    // Enable notifications
    // -----------------------------------------------

    await wearableCharacteristic.startNotifications();


    wearableCharacteristic.addEventListener(
      "characteristicvaluechanged",
      handleWearableData
    );


    // -----------------------------------------------
    // Connected
    // -----------------------------------------------

    wearableConnected =
      true;


    if (wearableStatus)
    {

      wearableStatus.textContent =
        "CONNECTED";

    }


    if (sensorStatus)
    {

      sensorStatus.textContent =
        "CONNECTED";

    }


    bleBtn.textContent =
      "Wearable Connected";


    $("message").textContent =
      "Wearable connected — waiting for EMG data";


    console.log(
      "WAVESHARE BLE CONNECTED"
    );

  }

  catch (error)
  {

    console.error(
      "BLE connection error:",
      error
    );


    wearableConnected =
      false;


    if (wearableStatus)
    {

      wearableStatus.textContent =
        "DISCONNECTED";

    }


    bleBtn.disabled =
      false;


    bleBtn.textContent =
      "Connect Wearable";


    $("message").textContent =
      "Bluetooth error: " +
      error.message;

  }

}


// =====================================================
// WAVESHARE DISCONNECTED
// =====================================================

function handleWearableDisconnected()
{

  console.log(
    "WAVESHARE BLE DISCONNECTED"
  );


  wearableConnected =
    false;


  if (wearableStatus)
  {

    wearableStatus.textContent =
      "DISCONNECTED";

  }


  if (sensorStatus)
  {

    sensorStatus.textContent =
      "DISCONNECTED";

  }


  if (wearableName)
  {

    wearableName.textContent =
      "Not connected";

  }


  if (bleBtn)
  {

    bleBtn.disabled =
      false;

    bleBtn.textContent =
      "Reconnect Wearable";

  }


  $("message").textContent =
    "Wearable disconnected.";

}


// =====================================================
// RECEIVE WAVESHARE DATA
// =====================================================
//
// Expected:
//
// EMG=1234;WORKOUT=PUSHUPS;SENSOR=1
//
// =====================================================

function handleWearableData(event)
{

  try
  {

    // -----------------------------------------------
    // Read BLE data
    // -----------------------------------------------

    const value =
      event.target.value;


    const data =
      new TextDecoder().decode(
        value
      );


    console.log(
      "WAVESHARE DATA:",
      data
    );


    // -----------------------------------------------
    // Split packet
    // -----------------------------------------------

    const parts =
      data.split(";");


    let receivedEMG =
      null;

    let receivedWorkout =
      null;

    let receivedSensor =
      null;


    // -----------------------------------------------
    // Parse packet
    // -----------------------------------------------

    for (
      const part of parts
    )
    {

      const separator =
        part.indexOf("=");


      if (
        separator === -1
      )
      {
        continue;
      }


      const key =
        part
          .substring(
            0,
            separator
          )
          .trim();


      const valueText =
        part
          .substring(
            separator + 1
          )
          .trim();


      if (
        key ===
        "EMG"
      )
      {

        receivedEMG =
          Number(
            valueText
          );

      }


      else if (
        key ===
        "WORKOUT"
      )
      {

        receivedWorkout =
          valueText;

      }


      else if (
        key ===
        "SENSOR"
      )
      {

        receivedSensor =
          valueText;

      }

    }


    // =================================================
    // EMG
    // =================================================

    if (
      receivedEMG !== null &&
      !Number.isNaN(
        receivedEMG
      )
    )
    {

      emgRaw =
        receivedEMG;


      if (emgRawDisplay)
      {

        emgRawDisplay.textContent =
          Math.round(
            emgRaw
          );

      }


      // ---------------------------------------------
      // Convert 12-bit ADC to percentage
      // ---------------------------------------------

      const percent =
        Math.max(
          0,

          Math.min(
            100,

            (emgRaw /
              4095) *
              100
          )
        );


      // ---------------------------------------------
      // Update global EMG
      // ---------------------------------------------

      window.onEMGUpdate(
        percent
      );

    }


    // =================================================
    // WORKOUT
    // =================================================

    if (
      receivedWorkout
    )
    {

      const select =
        $("workoutSelect");


      if (select)
      {

        const option =
          Array
            .from(
              select.options
            )
            .find(
              option =>
                option.value ===
                receivedWorkout
            );


        if (option)
        {

          select.value =
            receivedWorkout;


          $("workout").textContent =
            option.text;


          if (
            typeof tracker !==
            "undefined" &&
            tracker &&
            typeof tracker.setExercise ===
            "function"
          )
          {

            tracker.setExercise(
              receivedWorkout
            );

          }

        }

      }

    }


    // =================================================
    // SENSOR STATUS
    // =================================================

    if (
      receivedSensor !==
      null
    )
    {

      if (
        receivedSensor ===
        "1"
      )
      {

        if (sensorStatus)
        {

          sensorStatus.textContent =
            "CONNECTED";

        }

      }

      else
      {

        if (sensorStatus)
        {

          sensorStatus.textContent =
            "DISCONNECTED";

        }

      }

    }


  }

  catch (error)
  {

    console.error(
      "Error processing Waveshare data:",
      error
    );

  }

}


// =====================================================
// INITIALIZE
// =====================================================

window.onEMGUpdate(
  0
);

update();
