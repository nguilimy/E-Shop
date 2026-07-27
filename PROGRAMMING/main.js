/* ==========================================================================
   Analog Clock — JavaScript
   This file does three things:
     1. Builds the 60 minute ticks + 12 hour ticks around the dial.
     2. Builds the 12 roman numerals around the dial.
     3. Runs a render loop that rotates the hour/minute/second hands to
        match the real, current time.
   ========================================================================== */

const clockFace = document.getElementById("clockFace");
const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");
const dateNumber = document.getElementById("dateNumber");

/* --------------------------------------------------------------------------
   1) Build the tick marks
   There are 60 possible tick positions (one per minute). Every 5th one
   (0, 5, 10, ...) lands on an hour and gets the thicker gold "--hour" style.

   Each tick lives inside a `.tick-wrapper` that is the SAME size as the
   dial and centered on it. Rotating that wrapper rotates the tick around
   the dial's center — so all we need per tick is one rotation angle.
   -------------------------------------------------------------------------- */
function buildTicks() {
  for (let i = 0; i < 60; i++) {
    const angle = i * 6; // 360 degrees / 60 ticks = 6 degrees apart

    const wrapper = document.createElement("div");
    wrapper.className = "tick-wrapper";
    wrapper.style.transform = `rotate(${angle}deg)`;

    const tick = document.createElement("div");
    tick.className = i % 5 === 0 ? "tick tick--hour" : "tick";

    wrapper.appendChild(tick);
    clockFace.appendChild(wrapper);
  }
}

/* --------------------------------------------------------------------------
   2) Build the numerals
   Real watch dials traditionally print 4 o'clock as "IIII" rather than
   "IV" (an old convention kept for visual balance), so this list follows
   that tradition.

   Same trick as the ticks: rotate a full-size wrapper to place the
   numeral, then rotate the numeral text back the OPPOSITE amount
   (via the --counter-rotate CSS variable) so the text itself stays
   upright instead of tilting with the wrapper.
   -------------------------------------------------------------------------- */
function buildNumerals() {
  const romanNumerals = [
    "XII", "I", "II", "III", "IIII", "V",
    "VI", "VII", "VIII", "IX", "X", "XI",
  ];

  romanNumerals.forEach((numeralText, i) => {
    const angle = i * 30; // 360 degrees / 12 numerals = 30 degrees apart

    const wrapper = document.createElement("div");
    wrapper.className = "numeral-wrapper";
    wrapper.style.transform = `rotate(${angle}deg)`;

    const numeral = document.createElement("span");
    numeral.className = "numeral";
    numeral.textContent = numeralText;
    numeral.style.setProperty("--counter-rotate", `${-angle}deg`);

    wrapper.appendChild(numeral);
    clockFace.appendChild(wrapper);
  });
}

/* --------------------------------------------------------------------------
   3) Drive the hands
   Instead of jumping once a second, we use requestAnimationFrame so the
   second hand sweeps smoothly (like a mechanical watch) rather than
   ticking like a quartz one. Milliseconds are folded into every hand's
   angle so the motion is continuous, not stepped.
   -------------------------------------------------------------------------- */
function updateClock() {
  const now = new Date();

  const ms = now.getMilliseconds();
  const seconds = now.getSeconds() + ms / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  const secondsDegrees = (seconds / 60) * 360;
  const minutesDegrees = (minutes / 60) * 360;
  const hoursDegrees = (hours / 12) * 360;

  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

  dateNumber.textContent = String(now.getDate()).padStart(2, "0");

  requestAnimationFrame(updateClock);
}

/* --------------------------------------------------------------------------
   Kick everything off
   -------------------------------------------------------------------------- */
buildTicks();
buildNumerals();
updateClock();