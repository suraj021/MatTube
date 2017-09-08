import { Video } from './video';

export class Playlist {

    public id: string;
    
    public channelId: string;

    public channelTitle: string;

    public itemCount: number;

    public title: string;

    public publishedAt: string;

    public channelThumbnail: string;

    public channelSubscribers: number;

    public description: string;

    public thumbnail: string;

    public videos: Video[];

}