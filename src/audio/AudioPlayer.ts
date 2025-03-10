import type { EventEmitter } from "events"
import type { Filters } from "../util/Filters"
import type { AudioManager } from "./AudioManager"
import type { VoiceConnection, AudioPlayerStatus } from "@discordjs/voice"

type NOOP = () => void

interface PlayerEvents {
  unlink: NOOP
  pause: NOOP,
  unpause: NOOP,
  end: NOOP
}

/**
 * The instance to manage and play audio to discord
 */
export interface AudioPlayer extends EventEmitter {
  /**
   * @internal
   */
   on<E extends keyof PlayerEvents>(
    event: E, listener: PlayerEvents[E]
  ): this
  /**
   * @internal
   */
  once<E extends keyof PlayerEvents>(
    event: E, listener: PlayerEvents[E]
  ): this
  /**
   * @internal
   */
  addListener<E extends keyof PlayerEvents>(
    event: E, listener: PlayerEvents[E]
  ): this

  /**
   * @internal
   */
  off<E extends keyof PlayerEvents>(
    event: E, listener: PlayerEvents[E]
  ): this
  /**
   * @internal
   */
  removeListener<E extends keyof PlayerEvents>(
    event: E, listener: PlayerEvents[E]
  ): this

  /**
   * @internal
   */
  emit<E extends keyof PlayerEvents>(
    event: E, ...args: never
  ): boolean

  /**
   * The manager of the audio player
   */
  manager: AudioManager
  /**
   * The linked connection guild id
   */
  guildID: string
  /**
   * The discord player status
   */
  status: AudioPlayerStatus
  /**
   * Whether or not the audio player is playing audio.
   */
  playing: boolean
  /**
   * For how long this player has been playing audio (in ms)
   */
  playbackDuration: number
  
  /**
   * Set the manager of the audio player
   * @param manager The audio manager
   */
  setManager(manager: AudioManager): void
  /**
   * Link the voice connection to the audio player
   * @param connection The voice connection
   */
  link(connection: VoiceConnection): void
  /**
   * Unlink the audio player from the previous voice connection
   */
  unlink(): void
  /**
   * Set filters into the audio player
   * @param filter The filters
   */
  setFilter(filter?: Filters): void
  /**
   * Set volume of the audio
   * @param volume The volume
   */
  setVolume(volume: number): void
  /**
   * Stop the audio
   */
  stop(): boolean
  /**
   * Loop the audio
   */
  loop(): boolean
  /**
   * Pause the audio
   */
  pause(forcePauseUnpause?: boolean): boolean
  /**
   * Filter the audio
   */
  filter(): void
  /**
   * Seek the audio
   * @param seconds The position to seek to
   */
  seek(seconds: number): Promise<void>
  /**
   * Play an audio
   * @param urlOrLocation The url or location of the audio source
   * @param sourceType The source type to identify the source
   */
  play(urlOrLocation: string, sourceType: number): Promise<void>
  /**
   * Switch to playing cache instead of resource
   * 
   * This method must not be used by user directly,
   * it is used for custom player implementation to work
   * with cache
   */
  _switchCache(): void
}