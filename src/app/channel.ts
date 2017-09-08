import { Playlist } from './playlist';
import { Video } from './video';

export class Channel {
    public id: string;

    public title: string;

    public description: string;

    public customUrl: string;

    public publishedAt: string;

    public thumbnailUrl: string;

    public coverUrl: string;

    public subscribers: number;

    public viewCount: string;

    public videosCount: number;

    public country: string;

    public featuredChannelsTitle;

    public uploads: Video[];

    public playlists: Playlist[];

    public featuredChannels: Channel[];
}