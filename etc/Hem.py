from __future__ import with_statement
import Live
# import LiveUtils
from _Framework.ControlSurface import ControlSurface

class Hem(ControlSurface):
    """ Ableton Live Remote Script for HEM's Virtual Control Surface """
    SESSION_WIDTH = 8
    SESSION_HEIGHT = 5

    def __init__(self, c_instance):
        ControlSurface.__init__(self, c_instance)
        with self.component_guard():
            self.__c_instance = c_instance

            self.actual_song=Live.Application.get_application().get_document()
            self.log_message(self.actual_song)

            self.first_midi_clipslot=self.actual_song.tracks[0].clip_slots[0]
            self.first_midi_clipslot.create_clip(4)

            Live.Application.get_application().get_document().visible_tracks[0].clip_slots[0].clip.fire()


    def _create_session(self):
        session = SessionComponent(self.SESSION_WIDTH, self.SESSION_HEIGHT)
        return session