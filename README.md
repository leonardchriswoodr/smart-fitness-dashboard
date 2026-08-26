# Smart Fitness Browser Dashboard
Browser foundation for the wearable project.

Flow: phone camera -> MediaPipe Pose -> exercise state machine -> CV rep + form, combined with EMG.

A rep is counted only when CV detects a rep, form is accepted, and EMG >= 65%.

The Waveshare BLE UUIDs are intentionally not included yet; they must match the already-working Waveshare firmware. The original Python ts1.py contains the fuller exercise/form logic; this browser version is the initial JavaScript foundation and should be validated against it before final deployment.
