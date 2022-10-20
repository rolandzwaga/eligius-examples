import layoutTemplate from './template/layout-template.html';
import testSubtitles from './json/test-subtitles.json';
import { selectElement } from 'eligius';
import { getControllerInstance } from 'eligius';
import { addControllerToElement } from 'eligius';
import { removeControllerFromElement } from 'eligius';
import { createElement } from 'eligius';
import { setElementContent } from 'eligius';
import { startLoop } from 'eligius';
import { endLoop } from 'eligius';
import { broadcastEvent } from 'eligius';
import { LabelController } from 'eligius';
import { ProgressbarController } from 'eligius';
import { EventListenerController } from 'eligius';
import { SubtitlesController } from 'eligius';
import { RequestAnimationFrameTimelineProvider } from 'eligius';
import { EligiusEngine } from 'eligius';
import { ISimpleResourceImporter } from 'eligius';
class WebpackResourceImporter implements ISimpleResourceImporter
{
  import(name: string): Record<string, any>
  {
    switch (true) {
      case name === 'selectElement': return { [name]: selectElement };
      case name === 'getControllerInstance': return { [name]: getControllerInstance };
      case name === 'addControllerToElement': return { [name]: addControllerToElement };
      case name === 'removeControllerFromElement': return { [name]: removeControllerFromElement };
      case name === 'createElement': return { [name]: createElement };
      case name === 'setElementContent': return { [name]: setElementContent };
      case name === 'startLoop': return { [name]: startLoop };
      case name === 'endLoop': return { [name]: endLoop };
      case name === 'broadcastEvent': return { [name]: broadcastEvent };
      case name === 'layoutTemplate': return { [name]: layoutTemplate };
      case name === 'testSubtitles': return { [name]: testSubtitles };
      case name === 'LabelController': return { [name]: LabelController };
      case name === 'ProgressbarController': return { [name]: ProgressbarController };
      case name === 'EventListenerController': return { [name]: EventListenerController };
      case name === 'SubtitlesController': return { [name]: SubtitlesController };
      case name === 'RequestAnimationFrameTimelineProvider': return { [name]: RequestAnimationFrameTimelineProvider };
      case name === 'EligiusEngine': return { [name]: EligiusEngine };
      default: throw Error("Unknown systemName: " + name);
    }
  }
}
export default WebpackResourceImporter;
