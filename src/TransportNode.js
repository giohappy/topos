import { tryEvaluate } from "./Evaluator";
const zeroPad = (num, places) => String(num).padStart(places, "0");

export class TransportNode extends AudioWorkletNode {
  constructor(context, options, application) {
    super(context, "transport", options);
    this.app = application;
    this.port.addEventListener("message", this.handleMessage);
    this.port.start();
    this.timeviewer = document.getElementById("timeviewer");
  }

  /** @type {(this: MessagePort, ev: MessageEvent<any>) => any} */
  handleMessage = (message) => {
    if (message.data) {
      if (message.data.type === "bang") {
        if (this.app.clock.running) {
          if (this.app.settings.send_clock) {
            this.app.api.MidiConnection.sendMidiClock();
          }
          const futureTimeStamp = this.app.clock.convertTicksToTimeposition(
            this.app.clock.tick
          );
          this.app.clock.time_position = futureTimeStamp;
          if (futureTimeStamp.pulse % this.app.clock.ppqn == 0) {
            this.timeviewer.innerHTML = `${zeroPad(futureTimeStamp.bar, 2)}:${futureTimeStamp.beat + 1
              } / ${this.app.clock.bpm}`;
          }
          if (this.app.exampleIsPlaying) {
            tryEvaluate(this.app, this.app.example_buffer);
          } else {
            tryEvaluate(this.app, this.app.global_buffer);
          }
          this.app.clock.incrementTick(message.data.bpm);
        }
      }
    }
  };

  start() {
    this.port.postMessage({ type: "start" });
  }

  pause() {
    this.port.postMessage({ type: "pause" });
  }

  resume() {
    this.port.postMessage({ type: "resume" });
  }

  setBPM(bpm) {
    this.port.postMessage({ type: "bpm", value: bpm });
  }

  setPPQN(ppqn) {
    this.port.postMessage({ type: "ppqn", value: ppqn });
  }

  setNudge(nudge) {
    this.port.postMessage({ type: "nudge", value: nudge });
  }

  stop() {
    this.port.postMessage({ type: "stop" });
  }
}
