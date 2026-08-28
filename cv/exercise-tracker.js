/*
 * SMART FITNESS - COMPLETE BROWSER EXERCISE TRACKER
 *
 * 19 workouts from the supplied ts1.py:
 *
 * CHEST
 * 1. Pushups
 * 2. Chest Fly
 * 3. Chest Dips
 * 4. Bench Press
 *
 * SHOULDERS
 * 5. Shoulder Press
 * 6. Lateral Raises
 * 7. Front Raises
 *
 * ARMS
 * 8. Bicep Curls
 * 9. Tricep Extensions
 * 10. Hammer Curls
 *
 * BACK
 * 11. Deadlift
 * 12. Lat Pulldowns
 * 13. Pull-ups
 *
 * LEGS
 * 14. Squats
 * 15. Leg Extensions
 * 16. Leg Press
 *
 * ABS
 * 17. Crunches
 * 18. Leg Raises
 * 19. Russian Twist
 *
 * IMPORTANT:
 * This tracker reports a COMPUTER-VISION rep event.
 * The final rep counter must be handled by app.js:
 *
 * CV REP + ACCEPTABLE FORM + EMG >= 60-70%
 *                     =
 *                VALID REP
 */

const EXERCISES = [

  // ==================================================
  // CHEST
  // ==================================================

  {
    group: "CHEST",
    name: "PUSHUPS",
    joints: ["SHOULDER", "ELBOW", "WRIST"],
    threshold_bottom: 90,
    threshold_top: 160,
    direction: "bottom_small",
    form_check: "pushups",
    instruction: "Keep body straight, elbows 45° from torso"
  },

  {
    group: "CHEST",
    name: "CHEST FLY",
    joints: ["SHOULDER", "ELBOW", "WRIST"],
    threshold_bottom: 80,
    threshold_top: 165,
    direction: "bottom_small",
    form_check: "chest_fly",
    instruction: "Wide arc, slight elbow bend, squeeze chest at top"
  },

  {
    group: "CHEST",
    name: "CHEST DIPS",
    joints: ["SHOULDER", "ELBOW", "WRIST"],
    threshold_bottom: 75,
    threshold_top: 160,
    direction: "bottom_small",
    form_check: "dips",
    instruction: "Lean forward slightly, lower until chest level with bars"
  },

  {
    group: "CHEST",
    name: "BENCH PRESS",
    joints: ["SHOULDER", "ELBOW", "WRIST"],
    threshold_bottom: 85,
    threshold_top: 160,
    direction: "bottom_small",
    form_check: "bench_press",
    instruction: "Lower bar to mid-chest, press up powerfully"
  },


  // ==================================================
  // SHOULDERS
  // ==================================================

  {
    group: "SHOULDERS",
    name: "SHOULDER PRESS",
    joints: ["SHOULDER", "ELBOW", "WRIST"],
    threshold_bottom: 90,
    threshold_top: 165,
    direction: "bottom_small",
    form_check: "shoulder_press",
    instruction: "Press straight up, lock out at top"
  },

  {
    group: "SHOULDERS",
    name: "LATERAL RAISES",
    joints: ["HIP", "SHOULDER", "ELBOW"],
    threshold_bottom: 10,
    threshold_top: 85,
    direction: "bottom_small",
    form_check: "lateral_raises",
    instruction: "Raise arms to shoulder height, slight elbow bend"
  },

  {
    group: "SHOULDERS",
    name: "FRONT RAISES",
    joints: ["HIP", "SHOULDER", "ELBOW"],
    threshold_bottom: 15,
    threshold_top: 90,
    direction: "bottom_small",
    form_check: "front_raises",
    instruction: "Raise arms straight in front to shoulder height"
  },


  // ==================================================
  // ARMS
  // ==================================================

  {
    group: "ARMS",
    name: "BICEP CURLS",
    joints: ["SHOULDER", "ELBOW", "WRIST"],
    threshold_bottom: 155,
    threshold_top: 45,
    direction: "bottom_large",
    form_check: "bicep_curls",
    instruction: "Keep elbows still, full range of motion"
  },

  {
    group: "ARMS",
    name: "TRICEP EXTENSIONS",
    joints: ["SHOULDER", "ELBOW", "WRIST"],
    threshold_bottom: 55,
    threshold_top: 165,
    direction: "bottom_small",
    form_check: "tricep_ext",
    instruction: "Keep upper arm vertical, control the motion"
  },

  {
    group: "ARMS",
    name: "HAMMER CURLS",
    joints: ["SHOULDER", "ELBOW", "WRIST"],
    threshold_bottom: 155,
    threshold_top: 50,
    direction: "bottom_large",
    form_check: "hammer_curls",
    instruction: "Neutral grip, curl without swinging"
  },


  // ==================================================
  // BACK
  // ==================================================

  {
    group: "BACK",
    name: "DEADLIFT",
    joints: ["SHOULDER", "HIP", "KNEE"],
    threshold_bottom: 75,
    threshold_top: 170,
    direction: "bottom_small",
    form_check: "deadlift",
    instruction: "Hinge at hips, keep back flat"
  },

  {
    group: "BACK",
    name: "LAT PULLDOWNS",
    joints: ["SHOULDER", "ELBOW", "WRIST"],
    threshold_bottom: 130,
    threshold_top: 50,
    direction: "bottom_large",
    form_check: "lat_pulldown",
    instruction: "Pull bar down to chest, squeeze lats"
  },

  {
    group: "BACK",
    name: "PULL-UPS",
    joints: ["SHOULDER", "ELBOW", "WRIST"],
    threshold_bottom: 150,
    threshold_top: 60,
    direction: "bottom_large",
    form_check: "pullup",
    instruction: "Pull chin above bar, control descent"
  },


  // ==================================================
  // LEGS
  // ==================================================

  {
    group: "LEGS",
    name: "SQUATS",
    joints: ["HIP", "KNEE", "ANKLE"],
    threshold_bottom: 100,
    threshold_top: 165,
    direction: "bottom_small",
    form_check: "squats",
    instruction: "Keep back straight, knees behind toes"
  },

  {
    group: "LEGS",
    name: "LEG EXTENSIONS",
    joints: ["HIP", "KNEE", "ANKLE"],
    threshold_bottom: 90,
    threshold_top: 160,
    direction: "bottom_small",
    form_check: "leg_extension",
    instruction: "Extend legs fully, squeeze quads at top"
  },

  {
    group: "LEGS",
    name: "LEG PRESS",
    joints: ["HIP", "KNEE", "ANKLE"],
    threshold_bottom: 90,
    threshold_top: 160,
    direction: "bottom_small",
    form_check: "leg_press",
    instruction: "Press weight up, don't lock knees out completely"
  },


  // ==================================================
  // ABS
  // ==================================================

  {
    group: "ABS",
    name: "CRUNCHES",
    joints: ["SHOULDER", "HIP", "KNEE"],
    threshold_bottom: 155,
    threshold_top: 110,
    direction: "bottom_large",
    form_check: "crunches",
    instruction: "Curl up, chin to chest, exhale at top"
  },

  {
    group: "ABS",
    name: "LEG RAISES",
    joints: ["SHOULDER", "HIP", "KNEE"],
    threshold_bottom: 170,
    threshold_top: 90,
    direction: "bottom_large",
    form_check: "leg_raises",
    instruction: "Keep legs straight, raise to 90°, lower slowly"
  },

  {
    group: "ABS",
    name: "RUSSIAN TWIST",
    joints: ["SHOULDER", "HIP", "KNEE"],
    threshold_bottom: 100,
    threshold_top: 160,
    direction: "bottom_small",
    form_check: "russian_twist",
    instruction: "Lean back 45°, rotate side to side"
  }
];


// ======================================================
// MEDIAPIPE LANDMARK INDEXES
// ======================================================

const LANDMARK = {

  NOSE: 0,

  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,

  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,

  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,

  LEFT_HIP: 23,
  RIGHT_HIP: 24,

  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,

  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28
};


// ======================================================
// EXERCISE TRACKER
// ======================================================

class ExerciseTracker {

  constructor() {

    this.exerciseIndex = 0;

    this.state = "IDLE";

    this.leftAngle = 0;
    this.rightAngle = 0;

    this.repEvent = false;

    this.formOK = false;

    this.formStatus = "WAITING";

    this.feedback = [
      "Position yourself in the frame."
    ];

    this.angleAlpha = 0.35;

    this.hysteresis = 8;

    this.repCooldownMs = 300;

    this.lastRepTime = 0;

    this.elbowHistory = [];
  }


  // ====================================================
  // CURRENT EXERCISE
  // ====================================================

  get config() {

    return EXERCISES[this.exerciseIndex];

  }


  get exercise() {

    return this.config.name;

  }


  get group() {

    return this.config.group;

  }


  // ====================================================
  // SELECT EXERCISE
  // ====================================================

  setExerciseByIndex(index) {

    if (index < 0) {

      index =
        EXERCISES.length - 1;

    }

    if (
      index >=
      EXERCISES.length
    ) {

      index = 0;

    }

    this.exerciseIndex =
      index;

    this.resetState();
  }


  setExercise(name) {

    const index =
      EXERCISES.findIndex(
        e => e.name === name
      );

    if (index >= 0) {

      this.setExerciseByIndex(
        index
      );

    }

  }


  // ====================================================
  // RESET
  // ====================================================

  resetState() {

    this.state = "IDLE";

    this.leftAngle = 0;

    this.rightAngle = 0;

    this.repEvent = false;

    this.formOK = false;

    this.formStatus = "WAITING";

    this.feedback = [
      "Position yourself in the frame."
    ];

    this.elbowHistory = [];

    this.lastRepTime = 0;

  }


  // ====================================================
  // ANGLE
  // ====================================================

  angle(a, b, c) {

    const abx =
      a.x - b.x;

    const aby =
      a.y - b.y;

    const cbx =
      c.x - b.x;

    const cby =
      c.y - b.y;

    const denominator =
      Math.hypot(abx, aby) *
      Math.hypot(cbx, cby);

    if (
      denominator <
      0.000001
    ) {

      return 0;

    }

    const cosine =
      (
        abx * cbx +
        aby * cby
      ) /
      denominator;

    return (
      Math.acos(
        Math.max(
          -1,
          Math.min(
            1,
            cosine
          )
        )
      ) *
      180 /
      Math.PI
    );
  }


  // ====================================================
  // VISIBILITY
  // ====================================================

  visible(
    landmark,
    minimum = 0.30
  ) {

    if (!landmark) {

      return false;

    }

    if (
      landmark.visibility ===
      undefined
    ) {

      return true;

    }

    return (
      landmark.visibility >=
      minimum
    );
  }


  // ====================================================
  // GET SIDE POINTS
  // ====================================================

  getSidePoints(
    landmarks,
    side
  ) {

    const points = [];

    for (
      const joint of
      this.config.joints
    ) {

      const key =
        `${side}_${joint}`;

      const index =
        LANDMARK[key];

      if (
        index === undefined
      ) {

        return null;

      }

      const point =
        landmarks[index];

      if (
        !this.visible(point)
      ) {

        return null;

      }

      points.push(point);

    }

    return points;

  }


  // ====================================================
  // SMOOTH ANGLE
  // ====================================================

  smooth(
    previous,
    current
  ) {

    if (
      previous <= 0
    ) {

      return current;

    }

    return (
      this.angleAlpha *
      current
      +
      (1 -
        this.angleAlpha) *
      previous
    );

  }


  // ====================================================
  // REP STATE MACHINE
  // ====================================================

  updateState(
    averageAngle
  ) {

    const config =
      this.config;

    let repDetected =
      false;

    if (
      config.direction ===
      "bottom_small"
    ) {

      const atBottom =
        averageAngle <=
        config.threshold_bottom +
        this.hysteresis;

      const atTop =
        averageAngle >=
        config.threshold_top -
        this.hysteresis;


      // IDLE
      if (
        this.state ===
        "IDLE"
      ) {

        if (atTop) {

          this.state =
            "TOP";

        }

        else if (atBottom) {

          this.state =
            "BOTTOM";

        }

      }


      // TOP → BOTTOM
      else if (
        this.state ===
        "TOP"
      ) {

        if (atBottom) {

          this.state =
            "BOTTOM";

        }

      }


      // BOTTOM → TOP = REP
      else if (
        this.state ===
        "BOTTOM"
      ) {

        if (atTop) {

          this.state =
            "TOP";

          repDetected =
            true;

        }

      }

    }

    else {

      // bottom_large

      const atBottom =
        averageAngle >=
        config.threshold_bottom -
        this.hysteresis;

      const atTop =
        averageAngle <=
        config.threshold_top +
        this.hysteresis;


      // IDLE
      if (
        this.state ===
        "IDLE"
      ) {

        if (atBottom) {

          this.state =
            "BOTTOM";

        }

        else if (atTop) {

          this.state =
            "TOP";

        }

      }


      // BOTTOM → TOP = REP
      else if (
        this.state ===
        "BOTTOM"
      ) {

        if (atTop) {

          this.state =
            "TOP";

          repDetected =
            true;

        }

      }


      // TOP → BOTTOM
      else if (
        this.state ===
        "TOP"
      ) {

        if (atBottom) {

          this.state =
            "BOTTOM";

        }

      }

    }


    // REP COOLDOWN
    if (
      repDetected
    ) {

      const now =
        Date.now();

      if (
        now -
        this.lastRepTime <
        this.repCooldownMs
      ) {

        repDetected =
          false;

      }

      else {

        this.lastRepTime =
          now;

      }

    }

    return repDetected;

  }


  // ====================================================
  // FORM CHECK
  // ====================================================

  checkForm(
    landmarks
  ) {

    const feedback = [];

    let status =
      "GOOD";


    const bad =
      message => {

        feedback.push(
          message
        );

        status =
          "BAD";

      };


    const warn =
      message => {

        feedback.push(
          message
        );

        if (
          status ===
          "GOOD"
        ) {

          status =
            "WARNING";

        }

      };


    const p =
      index =>
        landmarks[index];


    // ==================================================
    // PUSHUPS
    // ==================================================

    if (
      this.config.form_check ===
      "pushups"
    ) {

      const shoulder =
        p(
          LANDMARK.LEFT_SHOULDER
        );

      const hip =
        p(
          LANDMARK.LEFT_HIP
        );

      const ankle =
        p(
          LANDMARK.LEFT_ANKLE
        );

      const bodyDeviation =
        Math.abs(
          (
            shoulder.y +
            ankle.y
          ) /
          2 -
          hip.y
        );

      if (
        bodyDeviation >
        0.08
      ) {

        bad(
          "Keep body straight (no sagging/piking)"
        );

      }

      if (
        this.leftAngle > 40 &&
        this.leftAngle < 80
      ) {

        warn(
          "Elbows should be ~45° from torso"
        );

      }

    }


    // ==================================================
    // CHEST FLY
    // ==================================================

    else if (
      this.config.form_check ===
      "chest_fly"
    ) {

      if (
        this.state ===
        "TOP" &&
        this.leftAngle <
        155
      ) {

        warn(
          "Extend arms more at top — squeeze chest"
        );

      }

    }


    // ==================================================
    // CHEST DIPS
    // ==================================================

    else if (
      this.config.form_check ===
      "dips"
    ) {

      const shoulder =
        p(
          LANDMARK.LEFT_SHOULDER
        );

      const hip =
        p(
          LANDMARK.LEFT_HIP
        );

      if (
        shoulder.x <
        hip.x -
        0.06
      ) {

        warn(
          "Lean forward more for chest activation"
        );

      }

    }


    // ==================================================
    // SHOULDER PRESS
    // ==================================================

    else if (
      this.config.form_check ===
      "shoulder_press"
    ) {

      const wrist =
        p(
          LANDMARK.LEFT_WRIST
        );

      const elbow =
        p(
          LANDMARK.LEFT_ELBOW
        );

      if (
        Math.abs(
          wrist.x -
          elbow.x
        ) >
        0.10
      ) {

        bad(
          "Press straight up — path deviating"
        );

      }

      if (
        this.state ===
        "TOP" &&
        this.leftAngle <
        160
      ) {

        warn(
          "Full lockout at top"
        );

      }

    }


    // ==================================================
    // LATERAL / FRONT RAISES
    // ==================================================

    else if (
      this.config.form_check ===
      "lateral_raises" ||
      this.config.form_check ===
      "front_raises"
    ) {

      if (
        this.state ===
        "TOP" &&
        this.leftAngle <
        70
      ) {

        warn(
          "Raise arms to shoulder height"
        );

      }

      if (
        this.leftAngle >
        100
      ) {

        warn(
          "Don't raise above shoulder height"
        );

      }

    }


    // ==================================================
    // BICEP CURLS
    // ==================================================

    else if (
      this.config.form_check ===
      "bicep_curls"
    ) {

      const elbow =
        p(
          LANDMARK.LEFT_ELBOW
        );

      this.elbowHistory.push(
        elbow.x
      );

      if (
        this.elbowHistory.length >
        10
      ) {

        this.elbowHistory.shift();

      }

      if (
        this.elbowHistory.length >=
        5
      ) {

        const recent =
          this.elbowHistory.slice(
            -5
          );

        const mean =
          recent.reduce(
            (a,b) => a+b,
            0
          ) /
          recent.length;

        const variance =
          recent.reduce(
            (sum,x) =>
              sum +
              Math.pow(
                x -
                mean,
                2
              ),
            0
          ) /
          recent.length;

        const sway =
          Math.sqrt(
            variance
          );

        if (
          sway >
          0.018
        ) {

          bad(
            "Keep elbows pinned to sides"
          );

        }

      }

      if (
        this.state ===
        "BOTTOM" &&
        this.leftAngle <
        145
      ) {

        warn(
          "Extend arms fully at bottom"
        );

      }

      else if (
        this.state ===
        "TOP" &&
        this.leftAngle >
        65
      ) {

        warn(
          "Curl higher at top"
        );

      }

    }


    // ==================================================
    // TRICEP EXTENSIONS
    // ==================================================

    else if (
      this.config.form_check ===
      "tricep_ext"
    ) {

      const shoulder =
        p(
          LANDMARK.LEFT_SHOULDER
        );

      const elbow =
        p(
          LANDMARK.LEFT_ELBOW
        );

      if (
        Math.abs(
          shoulder.x -
          elbow.x
        ) >
        0.12
      ) {

        bad(
          "Keep upper arm vertical"
        );

      }

      if (
        this.state ===
        "TOP" &&
        this.leftAngle <
        160
      ) {

        warn(
          "Lock out arms fully at top"
        );

      }

    }


    // ==================================================
    // HAMMER CURLS
    // ==================================================

    else if (
      this.config.form_check ===
      "hammer_curls"
    ) {

      if (
        this.state ===
        "BOTTOM" &&
        this.leftAngle <
        145
      ) {

        warn(
          "Fully extend arm at bottom"
        );

      }

      else if (
        this.state ===
        "TOP" &&
        this.leftAngle >
        65
      ) {

        warn(
          "Curl all the way up"
        );

      }

    }


    // ==================================================
    // DEADLIFT
    // ==================================================

    else if (
      this.config.form_check ===
      "deadlift"
    ) {

      const hip =
        p(
          LANDMARK.LEFT_HIP
        );

      const shoulder =
        p(
          LANDMARK.LEFT_SHOULDER
        );

      if (
        Math.abs(
          shoulder.y -
          hip.y
        ) >
        0.30
      ) {

        bad(
          "Keep back flat — avoid rounding"
        );

      }

      if (
        this.state ===
        "TOP" &&
        this.leftAngle <
        165
      ) {

        warn(
          "Stand tall at lockout"
        );

      }

    }


    // ==================================================
    // BENCH PRESS
    // ==================================================

    else if (
      this.config.form_check ===
      "bench_press"
    ) {

      if (
        this.state ===
        "BOTTOM" &&
        this.leftAngle >
        100
      ) {

        warn(
          "Lower the bar further down to your chest"
        );

      }

    }


    // ==================================================
    // LAT PULLDOWN
    // ==================================================

    else if (
      this.config.form_check ===
      "lat_pulldown"
    ) {

      if (
        this.state ===
        "TOP" &&
        this.leftAngle >
        80
      ) {

        warn(
          "Pull the bar lower towards your chest"
        );

      }

    }


    // ==================================================
    // PULL-UPS
    // ==================================================

    else if (
      this.config.form_check ===
      "pullup"
    ) {

      if (
        this.state ===
        "TOP" &&
        this.leftAngle >
        80
      ) {

        warn(
          "Pull chin above the bar"
        );

      }

      if (
        this.state ===
        "BOTTOM" &&
        this.leftAngle <
        140
      ) {

        warn(
          "Extend arms fully at the bottom"
        );

      }

    }


    // ==================================================
    // SQUATS
    // ==================================================

    else if (
      this.config.form_check ===
      "squats"
    ) {

      const hip =
        p(
          LANDMARK.LEFT_HIP
        );

      const knee =
        p(
          LANDMARK.LEFT_KNEE
        );

      const ankle =
        p(
          LANDMARK.LEFT_ANKLE
        );

      const shoulder =
        p(
          LANDMARK.LEFT_SHOULDER
        );


      if (
        knee.x >
        ankle.x +
        0.07
      ) {

        bad(
          "Knees too far forward"
        );

      }

      if (
        Math.abs(
          shoulder.x -
          hip.x
        ) >
        0.22
      ) {

        warn(
          "Keep back more upright"
        );

      }

      if (
        this.state ===
        "BOTTOM" &&
        this.leftAngle >
        100
      ) {

        warn(
          "Go deeper on squat"
        );

      }

    }


    // ==================================================
    // LEG EXTENSION
    // ==================================================

    else if (
      this.config.form_check ===
      "leg_extension"
    ) {

      if (
        this.state ===
        "TOP" &&
        this.leftAngle <
        140
      ) {

        warn(
          "Fully extend legs and squeeze quads"
        );

      }

    }


    // ==================================================
    // LEG PRESS
    // ==================================================

    else if (
      this.config.form_check ===
      "leg_press"
    ) {

      if (
        this.state ===
        "TOP" &&
        this.leftAngle >
        170
      ) {

        warn(
          "Do not fully lock out your knees"
        );

      }

    }


    // ==================================================
    // CRUNCHES / LEG RAISES
    // ==================================================

    else if (
      this.config.form_check ===
      "crunches" ||
      this.config.form_check ===
      "leg_raises"
    ) {

      if (
        this.state ===
        "TOP"
      ) {

        feedback.push(
          "Exhale and squeeze abs at top"
        );

      }

    }


    // ==================================================
    // RUSSIAN TWIST
    // ==================================================

    else if (
      this.config.form_check ===
      "russian_twist"
    ) {

      const leftShoulder =
        p(
          LANDMARK.LEFT_SHOULDER
        );

      const rightShoulder =
        p(
          LANDMARK.RIGHT_SHOULDER
        );

      if (
        Math.abs(
          leftShoulder.y -
          rightShoulder.y
        ) <
        0.035
      ) {

        warn(
          "Rotate more from side to side"
        );

      }

    }


    if (
      feedback.length ===
      0
    ) {

      feedback.push(
        "Perfect form!"
      );

    }

    return {
      status,
      feedback
    };

  }


  // ====================================================
  // PROCESS FRAME
  // ====================================================

  process(landmarks) {

    this.repEvent =
      false;


    if (
      !landmarks ||
      landmarks.length <
      33
    ) {

      this.formOK =
        false;

      this.formStatus =
        "NO BODY DETECTED";

      this.feedback = [
        "Please step into the camera view."
      ];

      return {
        repDetected:false,
        formOK:false,
        formStatus:this.formStatus,
        feedback:this.feedback,
        exercise:this.exercise,
        group:this.group
      };

    }


    // --------------------------------------------------
    // CHECK REQUIRED LANDMARKS
    // --------------------------------------------------

    const required = [];

    for (
      const joint of
      this.config.joints
    ) {

      const left =
        LANDMARK[
          `LEFT_${joint}`
        ];

      const right =
        LANDMARK[
          `RIGHT_${joint}`
        ];

      if (
        left !== undefined
      ) required.push(left);

      if (
        right !== undefined
      ) required.push(right);

    }


    for (
      const index of
      required
    ) {

      if (
        !this.visible(
          landmarks[index]
        )
      ) {

        this.formOK =
          false;

        this.formStatus =
          "POSITION YOUR BODY";

        this.feedback = [
          "Required body landmarks are not visible."
        ];

        return {
          repDetected:false,
          formOK:false,
          formStatus:this.formStatus,
          feedback:this.feedback,
          exercise:this.exercise,
          group:this.group
        };

      }

    }


    // --------------------------------------------------
    // LEFT SIDE ANGLE
    // --------------------------------------------------

    const left =
      this.getSidePoints(
        landmarks,
        "LEFT"
      );

    if (left) {

      const raw =
        this.angle(
          left[0],
          left[1],
          left[2]
        );

      this.leftAngle =
        this.smooth(
          this.leftAngle,
          raw
        );

    }

    else {

      this.leftAngle =
        0;

    }


    // --------------------------------------------------
    // RIGHT SIDE ANGLE
    // --------------------------------------------------

    const right =
      this.getSidePoints(
        landmarks,
        "RIGHT"
      );

    if (right) {

      const raw =
        this.angle(
          right[0],
          right[1],
          right[2]
        );

      this.rightAngle =
        this.smooth(
          this.rightAngle,
          raw
        );

    }

    else {

      this.rightAngle =
        0;

    }


    // --------------------------------------------------
    // WEIGHTED AVERAGE
    // --------------------------------------------------

    const angles = [];

    if (
      this.leftAngle >
      0
    ) {

      angles.push(
        this.leftAngle
      );

    }

    if (
      this.rightAngle >
      0
    ) {

      angles.push(
        this.rightAngle
      );

    }


    let averageAngle =
      0;

    if (
      angles.length
    ) {

      averageAngle =
        angles.reduce(
          (sum,value) =>
            sum + value,
          0
        ) /
        angles.length;

    }


    // --------------------------------------------------
    // REP STATE MACHINE
    // --------------------------------------------------

    this.repEvent =
      this.updateState(
        averageAngle
      );


    // --------------------------------------------------
    // FORM
    // --------------------------------------------------

    const form =
      this.checkForm(
        landmarks
      );


    this.formStatus =
      form.status === "GOOD"
        ? "GOOD FORM"
        : form.status === "WARNING"
          ? "CHECK FORM"
          : "FIX FORM";


    /*
     * WARNING is still considered usable form.
     * BAD means the final rep validator must reject it.
     */

    this.formOK =
      form.status !==
      "BAD";


    this.feedback =
      form.feedback;


    // --------------------------------------------------
    // RESULT
    // --------------------------------------------------

    return {

      repDetected:
        this.repEvent,

      formOK:
        this.formOK,

      formStatus:
        this.formStatus,

      feedback:
        this.feedback,

      angle:
        averageAngle,

      leftAngle:
        this.leftAngle,

      rightAngle:
        this.rightAngle,

      state:
        this.state,

      exercise:
        this.exercise,

      group:
        this.group,

      instruction:
        this.config.instruction

    };

  }

}


// ======================================================
// EXPORT
// ======================================================

window.EXERCISES =
  EXERCISES;

window.ExerciseTracker =
  ExerciseTracker;
