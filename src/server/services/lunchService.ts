import {ImageSearchService} from './imageSearch';
import {Observable} from 'rxjs/Rx';
import * as moment from 'moment';

export class LunchService {

    private _imageSearch = new ImageSearchService();

    saveLunches(lunches: {date: string, menu: string}[]): Observable<any[]> {
        // upsert lunch info
        return Observable.of([]);
    }

    saveImages(lunchId: number, images: string[]): Observable<any> {
        // persist links to db
        return Observable.of(images);
    }

    getLunches(): Observable<any[]> {
        // look up menu, comments, rating, and images
        // no new images if we are retrieving in bulk
        return Observable.of([]);
    }

    getLunchByDate(targetDate: string): Observable<any> {
        // look up menu, comments, rating, and images
        // ensure they have pictures
        this.getPicturesforLunch({});
        // choose an image randomly
        return Observable.of({});
    }

    rateLunch(targetDate: string, rating: number): Observable<any> {
        // look up lunch by date, and save rating pointing to it
        const bornOnDate = moment().format();
        return Observable.of(true);
    }

    commentOnLunch(targetDate: string, message: string, author: string): Observable<any> {
        // look up lunch by date and save comment pointing to it
        const bornOnDate = moment().format();
        return Observable.of(true);
    }

    deleteLunch(targetDate: string): Observable<any> {
        // mark lunch as inactive
        return Observable.of(true);
    }

    getPicturesforLunch(lunch: any): Observable<any> {
        // if db does not come back with images, get them from google and persist them
         if (!lunch.images || !lunch.images.length) {
            const query = lunch.menu.split(';')[0];
            return this._imageSearch.search(query)
            .flatMap(images => this.saveImages(0, images).map(_ => images));
         }
        return Observable.of(lunch.images);
    }

}
