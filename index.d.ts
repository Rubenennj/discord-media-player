// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   @discordjs/voice
//   ytdl-core
//   soundcloud-downloader
//   events
//   fs
//   stream
//   axios
//   m3u8stream

declare module 'discord-media-player' {
    /**
        * The current installed version of the package
        */
    export const version: string;
    export * from "discord-media-player/dist/audio/AudioManager";
    export * from "discord-media-player/dist/audio/AudioPlayer";
    export * from "discord-media-player/dist/audio/AudioPlayerImpl";
    export * from "discord-media-player/dist/cache/Cache";
    export * from "discord-media-player/dist/cache/CacheManager";
    export * from "discord-media-player/dist/cache/CacheManagerImpl";
    export * from "discord-media-player/dist/cache/CacheWriter";
    import * as _ErrorCode from "discord-media-player/dist/util/ErrorCode";
    import * as _Filters from "discord-media-player/dist/util/Filters";
    import * as _noop from "discord-media-player/dist/util/noop";
    import * as _Resource from "discord-media-player/dist/util/Resource";
    import * as _Skipper from "discord-media-player/dist/util/Skipper";
    import * as _SourceType from "discord-media-player/dist/util/SourceType";
    /**
        * Package helper utility
        */
    export namespace Util {
            export import ErrorCode = _ErrorCode.ErrorCode;
            export import Filters = _Filters.Filters;
            export import noop = _noop.noop;
            export import Resource = _Resource.Resource;
            export import ResourceOptions = _Resource.ResourceOptions;
            export import Skipper = _Skipper.Skipper;
            export import SourceType = _SourceType.SourceType;
    }
    import * as _downloadMedia from "discord-media-player/dist/soundcloudUtil/downloadMedia";
    import * as _transcoding from "discord-media-player/dist/soundcloudUtil/transcoding";
    import * as _util from "discord-media-player/dist/soundcloudUtil/util";
    /**
        * Soundcloud (soundcloud-downloader) utility
        *
        * Copied from "https://www.npmjs.com/package/soundcloud-downloader"
        */
    export namespace SoundcloudUtil {
            export import downloadMedia = _downloadMedia.downloadMedia;
            export import appendURL = _util.appendURL;
            export import handleRequestErrs = _util.handleRequestErrs;
            export import validateMedia = _util.validateMedia;
            export import FORMATS = _transcoding.FORMATS;
            export import STREAMING_PROTOCOLS = _transcoding.STREAMING_PROTOCOLS;
            export import Transcoding = _transcoding.Transcoding;
    }
}

declare module 'discord-media-player/dist/audio/AudioManager' {
    import type { ErrorCode } from "discord-media-player/dist/util/ErrorCode";
    import type { CacheManager } from "discord-media-player/dist/cache/CacheManager";
    import type { VoiceConnection } from "@discordjs/voice";
    import type { downloadOptions } from "ytdl-core";
    import type { AudioPlayer } from "discord-media-player/dist/audio/AudioPlayer";
    import SCDL from "soundcloud-downloader";
    import { EventEmitter } from "events";
    type createAudioPlayerType = (manager: AudioManager) => AudioPlayer;
    /**
        * The options for AudioManager
        */
    export interface AudioManagerOptions {
            /**
                * The audio cache manager
                */
            cache?: CacheManager;
            /**
                * The directory where the audio cache is saved
                */
            cacheDir?: string;
            /**
                * The downloadOptions (ytdl-core) when getting audio source from youtube
                */
            youtubeOptions?: downloadOptions;
            /**
                * The soundcloud client (soundcloud-downloader) when getting audio source from soundcloud
                */
            soundcloudClient?: typeof SCDL;
            /**
                * Custom method for creating audio player implementation
                */
            createAudioPlayer?: createAudioPlayerType;
    }
    export interface AudioManagerEvents {
            /**
                * @param guildID The guildID of the linked connection in player
                * @param urlOrLocation The audio url or location
                */
            audioStart(guildID: string, urlOrLocation: string): void;
            /**
                * @param guildID The guildID of the linked connection in player
                * @param urlOrLocation The audio url or location
                */
            audioEnd(guildID: string, urlOrLocation: string): void;
            /**
                * @param guildID The guildID of the linked connection in player
                * @param urlOrLocation The audio url or location
                * @param errorCode The error code to identify error
                */
            audioError(guildID: string, urlOrLocation: string, errorCode: ErrorCode): void;
    }
    export interface AudioManager extends EventEmitter {
            on<E extends keyof AudioManagerEvents>(event: E, listener: AudioManagerEvents[E]): this;
            once<E extends keyof AudioManagerEvents>(event: E, listener: AudioManagerEvents[E]): this;
            addListener<E extends keyof AudioManagerEvents>(event: E, listener: AudioManagerEvents[E]): this;
            off<E extends keyof AudioManagerEvents>(event: E, listener: AudioManagerEvents[E]): this;
            removeListener<E extends keyof AudioManagerEvents>(event: E, listener: AudioManagerEvents[E]): this;
            emit<E extends keyof AudioManagerEvents>(event: E, ...args: Parameters<AudioManagerEvents[E]>): boolean;
    }
    /**
        * The manager of the audio players
        */
    export class AudioManager extends EventEmitter {
            /**
                * Emitted whenever an audio is started playing
                *
                * Listener must implement {@link AudioManagerEvents.audioStart | AudioStartCallback}
                * @event
                */
            static AUDIO_START: string;
            /**
                * Emitted whenever an audio is ended after playing
                *
                * Listener must implement {@link AudioManagerEvents.audioEnd | AudioEndCallback}
                * @event
                */
            static AUDIO_END: string;
            /**
                * Emitted whenever an error is thrown while getting audio source before playing
                *
                * Listener must implement {@link AudioManagerEvents.audioError | AudioErrorCallback}
                * @event
                */
            static AUDIO_ERROR: string;
            /**
                * The audio cache manager
                */
            readonly cache?: CacheManager;
            /**
                * The soundcloud client (soundcloud-downloader) when getting audio source
                */
            readonly soundcloud: typeof SCDL;
            /**
                * The downloadOptions (ytdl-core) when getting audio source
                */
            readonly youtube: downloadOptions;
            /**
                * @param param0 The options to create new audio player manager
                */
            constructor({ cache, cacheDir, youtubeOptions, soundcloudClient, createAudioPlayer }: AudioManagerOptions);
            /**
                * Get player from list if exist, otherwise create new
                * @param connection The voice connection
                * @returns The audio player
                */
            getPlayer(connection: VoiceConnection): AudioPlayer;
            /**
                * Delete player from list and unlink it
                * @param connection The voice connection
                * @returns false if failed or doesn't exist, true if deleted
                */
            deletePlayer(connection: VoiceConnection): boolean;
            /**
                * @internal
                */
            _deletePlayerIfExist(guildID: string): void;
    }
    export {};
}

declare module 'discord-media-player/dist/audio/AudioPlayer' {
    import type { Filters } from "discord-media-player/dist/util/Filters";
    import type { AudioManager } from "discord-media-player/dist/audio/AudioManager";
    import type { VoiceConnection, AudioPlayerStatus } from "@discordjs/voice";
    /**
        * The instance to manage and playing audio to discord
        */
    export interface AudioPlayer {
            /**
                * The manager of the audio player
                */
            manager: AudioManager;
            /**
                * The discord player status
                */
            status: AudioPlayerStatus;
            /**
                * Set the manager of the audio player
                * @param manager The audio manager
                */
            setManager(manager: AudioManager): void;
            /**
                * Link the voice connection to the audio player
                * @param connection The voice connection
                */
            link(connection: VoiceConnection): void;
            /**
                * Unlink the audio player from the previous voice connection
                */
            unlink(): void;
            /**
                * Set filters into the audio player
                * @param filter The filters
                */
            setFilter(filter?: Filters): void;
            /**
                * Set volume of the audio
                * @param volume The volume
                */
            setVolume(volume: number): void;
            /**
                * Stop the audio
                */
            stop(): boolean;
            /**
                * Loop the audio
                */
            loop(): boolean;
            /**
                * Pause the audio
                */
            pause(forcePauseUnpause?: boolean): boolean;
            /**
                * Filter the audio
                */
            filter(): void;
            /**
                * Seek the audio
                * @param seconds The seconds of where to seek
                */
            seek(seconds: number): Promise<void>;
            /**
                * Play an audio
                * @param urlOrLocation The url or location of the audio source
                * @param sourceType The source type to identify the source
                */
            play(urlOrLocation: string, sourceType: number): Promise<void>;
            /**
                * Switch to playing cache instead of resource
                *
                * This method must not be used by user directly,
                * it is used for custom player implementation to work
                * with cache
                */
            _switchCache(): void;
    }
}

declare module 'discord-media-player/dist/audio/AudioPlayerImpl' {
    import type { Filters } from "discord-media-player/dist/util/Filters";
    import type { AudioPlayer } from "discord-media-player/dist/audio/AudioPlayer";
    import type { AudioManager } from "discord-media-player/dist/audio/AudioManager";
    import type { SourceType } from "discord-media-player/dist/util/SourceType";
    import type { VoiceConnection } from "@discordjs/voice";
    import { AudioPlayerStatus } from "@discordjs/voice";
    /**
        * The default implementation of {@link AudioPlayer | AudioPlayer}
        */
    export class AudioPlayerImpl implements AudioPlayer {
            /**
                * @internal
                */
            manager: AudioManager;
            /**
                * @internal
                */
            constructor();
            /**
                * @internal
                */
            get guildID(): string;
            /**
                * @internal
                */
            get status(): AudioPlayerStatus;
            /**
                * @internal
                */
            setManager(manager: AudioManager): void;
            /**
                * @internal
                */
            link(connection: VoiceConnection): void;
            /**
                * @internal
                */
            unlink(): void;
            /**
                * @internal
                */
            setFilter(filter: Filters): void;
            /**
                * @internal
                */
            setVolume(volume: number): void;
            /**
                * @internal
                */
            stop(): boolean;
            /**
                * @internal
                */
            loop(): boolean;
            /**
                * @internal
                */
            pause(pauseOrUnpause?: boolean): boolean;
            /**
                * @internal
                */
            filter(): void;
            /**
                * @internal
                */
            seek(seconds: number): Promise<void>;
            /**
                * @internal
                */
            play(urlOrLocation: string, sourceType: SourceType): Promise<void>;
            /**
                * @internal
                */
            _switchCache(): void;
    }
}

declare module 'discord-media-player/dist/cache/Cache' {
    import type { Resource } from "discord-media-player/dist/util/Resource";
    import type { ReadStream, WriteStream } from "fs";
    export class Cache {
            /**
                * The base directory of the cache
                */
            basePath: string;
            /**
                * The directory of the cache
                */
            readonly dir: string;
            /**
                * @param dir The directory of the cache
                */
            constructor(dir: string);
            /**
                * The full path of base directory and directory
                */
            get path(): string;
            /**
                * Set the base directory
                * @param path The base directory path
                */
            setPath(path: string): void;
            /**
                * Create a new cache
                * @param identifier The audio identifier
                * @param resource The audio resource
                * @returns The writable stream to write cache
                */
            create(identifier: string, resource: Resource): WriteStream | never;
            /**
                * Read an existing cache
                * @param identifier The audio identifier
                * @param startOnSeconds Start reading cache on specific second of audio
                * @returns The readable stream of audio
                */
            read(identifier: string, startOnSeconds?: number): ReadStream | never;
            /**
                * Check if cache exist
                * @param identifier The audio identifier
                * @returns true if exist, otherwise false
                */
            hasCache(identifier: string): boolean;
            /**
                * Get the audio resource from an existing cache
                * @param identifier The audio identifier
                * @returns The audio resource
                */
            getResource(identifier: string): Resource | never;
    }
}

declare module 'discord-media-player/dist/cache/CacheManager' {
    import type { Cache } from "discord-media-player/dist/cache/Cache";
    export interface CacheManager {
            /**
                * The base directory of the caches
                */
            path: string;
            /**
                * Audio cache from youtube source
                */
            readonly youtube: Cache;
            /**
                * Audio cache from soundcloud source
                */
            readonly soundcloud: Cache;
            /**
                * Audio cache from local source
                */
            readonly local: Cache;
            /**
                * Set the base directory of the caches
                * @param path The base directory
                */
            setPath(path: string): void;
    }
}

declare module 'discord-media-player/dist/cache/CacheManagerImpl' {
    import type { CacheManager } from "discord-media-player/dist/cache/CacheManager";
    import { Cache } from "discord-media-player/dist/cache/Cache";
    /**
        * The default implementation of {@link CacheManager | CacheManager}
        */
    export class CacheManagerImpl implements CacheManager {
            /**
                * @internal
                */
            path: string;
            /**
                * @internal
                */
            readonly youtube: Cache;
            /**
                * @internal
                */
            readonly soundcloud: Cache;
            /**
                * @internal
                */
            readonly local: Cache;
            /**
                * @internal
                */
            constructor();
            /**
                * @internal
                */
            setPath(path: string): void;
    }
}

declare module 'discord-media-player/dist/cache/CacheWriter' {
    import type { WriteStream } from "fs";
    import type { Resource } from "discord-media-player/dist/util/Resource";
    import type { TransformCallback } from "stream";
    import { Transform } from "stream";
    /**
        * The instance to write audio into cache
        */
    export class CacheWriter extends Transform {
            /**
                * The cache writable stream
                */
            get writeStream(): WriteStream;
            /**
                * Set the audio resource
                * @param resource The audio resource
                */
            setResource(resource: Resource): void;
            /**
                * @internal
                */
            _transform(chunk: Buffer, _: BufferEncoding, cb: TransformCallback): void;
            /**
                * @internal
                */
            _flush(cb: TransformCallback): void;
            /**
                * @internal
                */
            pipe<T extends NodeJS.WritableStream>(destination: T, options?: {
                    end?: boolean;
            }): T;
            /**
                * @internal
                */
            unpipe<T extends NodeJS.WritableStream>(destination?: T): this;
    }
}

declare module 'discord-media-player/dist/util/ErrorCode' {
    /**
      * The error codes of audio player
      */
    export enum ErrorCode {
        noFormatOrMedia = 0,
        cannotOpenFile = 1,
        youtubeNoPlayerResponse = 2,
        youtubeUnplayable = 3,
        youtubeLoginRequired = 4,
        noResource = 5
    }
}

declare module 'discord-media-player/dist/util/Filters' {
    /**
      * https://ffmpeg.org/ffmpeg-filters.html#Audio-Filters
      *
      * { filterName: "filterValue" }
      *
      * Leave "filterValue" as blank "", if no value
      */
    export interface Filters {
        acompressor?: string;
        aconstrast?: string;
        acrossfade?: string;
        acrossover?: string;
        acrusher?: string;
        adeclick?: string;
        adeclip?: string;
        adelay?: string;
        adenorm?: string;
        aecho?: string;
        aemphasis?: string;
        aexciter?: string;
        afade?: string;
        afftdn?: string;
        afftfilt?: string;
        afir?: string;
        afreqshift?: string;
        agate?: string;
        aiir?: string;
        allpass?: string;
        anequalizer?: string;
        anlmdn?: string;
        apad?: string;
        aphaser?: string;
        aphaseshift?: string;
        apulsator?: string;
        aresample?: string;
        arnndn?: string;
        asetnsamples?: string;
        asetrate?: string;
        asoftclip?: string;
        asubbost?: string;
        asubcut?: string;
        asupercut?: string;
        asuperpass?: string;
        asuperstop?: string;
        atempo?: string;
        bandpass?: string;
        bandreject?: string;
        bass?: string;
        biquad?: string;
        chorus?: string;
        compand?: string;
        compensationdelay?: string;
        crossfeed?: string;
        crystalizer?: string;
        dcshift?: string;
        deesser?: string;
        dynaudnorm?: string;
        earwax?: string;
        equalizer?: string;
        extrastereo?: string;
        firequalizer?: string;
        flanger?: string;
        haas?: string;
        headphone?: string;
        highpass?: string;
        highshelf?: string;
        loudnorm?: string;
        lowpass?: string;
        lowshelf?: string;
        mcompand?: string;
        silenceremove?: string;
        speechnorm?: string;
        stereowiden?: string;
        superequalizer?: string;
        surround?: string;
        treble?: string;
        vibrato?: string;
    }
}

declare module 'discord-media-player/dist/util/noop' {
    /**
      * Empty function (NO-OP)
      */
    export function noop(): void;
}

declare module 'discord-media-player/dist/util/Resource' {
    import type { Cache } from "discord-media-player/dist/cache/Cache";
    import type { CacheWriter } from "discord-media-player/dist/cache/CacheWriter";
    import type { AudioPlayer } from "discord-media-player/dist/audio/AudioPlayer";
    import type { Readable, Transform, Duplex } from "stream";
    /**
        * Options for making audio resource
        */
    export interface ResourceOptions {
            /**
                * The audio player that create the audio resource
                */
            player: AudioPlayer;
            /**
                * The audio identifier
                */
            identifier: string;
            /**
                * The audio decoder
                */
            decoder: Transform | Duplex;
            /**
                * The audio source
                */
            source: Readable;
            /**
                * The cache instance of audio source
                */
            cache?: Cache;
            /**
                * The audio demuxer
                */
            demuxer?: Transform;
            /**
                * The audio cache writer
                */
            cacheWriter?: CacheWriter;
    }
    /**
        * The audio resource instance
        */
    export class Resource {
            /**
                * The audio cached in seconds
                */
            cachedSecond: number;
            /**
                * true if all audio is cached, otherwise false
                */
            allCached: boolean;
            /**
                * true if the audio source is livestream, otherwise false
                */
            readonly isLive: boolean;
            /**
                * The audio identifier
                */
            readonly identifier: string;
            /**
                * The end of the audio resource pipeline
                */
            readonly audio: CacheWriter | Duplex;
            /**
                * The audio decoder
                */
            readonly decoder: Transform | Duplex;
            /**
                * The audio source
                */
            readonly source: Readable;
            /**
                * The cache instance of audio source
                */
            readonly cache?: Cache;
            /**
                * The audio demuxer
                */
            readonly demuxer?: Transform;
            /**
                * The audio cache writer
                */
            readonly cacheWriter?: CacheWriter;
            /**
                * @param param0 The options to create audio resource
                */
            constructor({ player, identifier, decoder, source, cache, demuxer, cacheWriter }: ResourceOptions);
            set player(player: AudioPlayer);
            get player(): AudioPlayer;
            set autoPaused(paused: boolean);
            get autoPaused(): boolean;
    }
}

declare module 'discord-media-player/dist/util/Skipper' {
    import type { CacheWriter } from "discord-media-player/dist/cache/CacheWriter";
    import { Writable } from "stream";
    /**
        * The instance for skipping the audio
        */
    export class Skipper extends Writable {
            /**
                * @param seconds The amount to skip in second
                * @param _cacheWriter The audio cache writer
                */
            constructor(seconds: number, _cacheWriter: CacheWriter);
            /**
                * @internal
                */
            _write(chunk: Buffer, _: BufferEncoding, cb: () => void): void;
            /**
                * @internal
                */
            _final(cb: () => void): void;
    }
}

declare module 'discord-media-player/dist/util/SourceType' {
    /**
      * The source type of the audio source
      */
    export enum SourceType {
        youtube = 0,
        soundcloud = 1,
        local = 2
    }
}

declare module 'discord-media-player/dist/soundcloudUtil/downloadMedia' {
    import type { AxiosInstance } from "axios";
    import type { Transcoding } from "discord-media-player/dist/soundcloudUtil/transcoding";
    import type { Readable } from "stream";
    import m3u8stream from "m3u8stream";
    /**
      * Download a specific media transcoding from soundcloud
      * @param media The audio media transcoding
      * @param clientID The soundcloud client id
      * @param axiosInstance The axios instance
      * @returns The audio source stream
      *
      * Copied from "https://www.npmjs.com/package/soundcloud-downloader"
      */
    export function downloadMedia(media: Transcoding, clientID: string, axiosInstance: AxiosInstance): Promise<Readable | m3u8stream.Stream>;
}

declare module 'discord-media-player/dist/soundcloudUtil/transcoding' {
    /**
        * The streaming protocols (protocol) of media transcoding
        *
        * Copied from "https://www.npmjs.com/package/soundcloud-downloader"
        */
    export enum STREAMING_PROTOCOLS {
            HLS = "hls",
            PROGRESSIVE = "progressive"
    }
    /**
        * The format (mime_type) of media transcoding
        *
        * Copied from "https://www.npmjs.com/package/soundcloud-downloader"
        */
    export enum FORMATS {
            MP3 = "audio/mpeg",
            OPUS = "audio/ogg; codecs=\"opus\""
    }
    /**
        * The interface of media transcoding
        *
        * Copied from "https://www.npmjs.com/package/soundcloud-downloader"
        */
    export interface Transcoding {
            url: string;
            preset: string;
            snipped: boolean;
            format: {
                    protocol: STREAMING_PROTOCOLS;
                    mime_type: FORMATS;
            };
    }
}

declare module 'discord-media-player/dist/soundcloudUtil/util' {
    import type { AxiosError } from "axios";
    import type { Transcoding } from "discord-media-player/dist/soundcloudUtil/transcoding";
    /**
        * Handle axios error
        * @param err The axios error
        * @returns The handle'd axios error
        *
        * Copied from "https://www.npmjs.com/package/soundcloud-downloader"
        */
    export function handleRequestErrs(err: AxiosError): AxiosError;
    /**
        * Append parameters into url
        * @param baseURL The base url
        * @param params The parameters
        * @returns The appended url
        *
        * Copied from "https://www.npmjs.com/package/soundcloud-downloader"
        */
    export function appendURL(baseURL: string, ...params: string[]): string;
    /**
        * Validate the media transcoding
        * @param media The media transcoding
        * @returns true if valid, otherwise false
        *
        * Copied from "https://www.npmjs.com/package/soundcloud-downloader"
        */
    export function validateMedia(media: Transcoding): boolean;
}

