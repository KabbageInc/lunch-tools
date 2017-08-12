import {Observable} from 'rxjs/Rx';
import * as request from 'request';
import * as domParser from 'dom-parser';

export class ImageSearchService {
    constructor() {}

    search(query: string): Observable<string[]> {
        const cleanQuery = encodeURIComponent(query);
        return Observable.create(
            observer => {
                request.get(
                    `https://cors-anywhere.herokuapp.com/https://www.google.com.ua/search?source=lnms&sa=X&gbv=1&tbm=isch&safe=active&q=${query}`,
                    {
                        headers: {
                            'x-requested-with': 'request',
                            origin: '127.0.0.1'
                        }
                    },
                    (err, response, body)  => {
                        if (err) {
                            console.error(err);
                            observer.error(err);
                        } else {
                            if (body) {
                                observer.next(body);
                                observer.complete();
                            } else {
                                observer.error('No body returned');
                                observer.complete();
                            }
                        }
                    }
                )
            }
        ).flatMap(
            res => {
                const parser = new domParser();
                const document = parser.parseFromString(res, 'text/html');
                // Gets DOM element with image results
                const images = document.getElementById('ires').childNodes[0];
                if (/^\s*div\s*$/i.test(images.nodeName)) {
                    return Observable.of(this._getFromMobile(images));
                } else if (/^\s*table\s*$/i.test(images.nodeName)) {
                    return Observable.of(this._getFromDesktop(images));
                } else {
                    return Observable.throw('unknown system');
                }
            }
        );
    }


    private _getFromMobile(images) {
        const imageArr = Array.from(images.childNodes);
        console.log(imageArr, '\n');
        return images.map(div => div.childNodes[0].src);
    }

    private _getFromDesktop(images) {
        const imgs = images.childNodes[0].childNodes;
        let links = [];
        imgs.forEach(row => {
            const innerrow = row.childNodes;
            innerrow.forEach(col => {
                if (col.childNodes && col.childNodes.length && col.childNodes.some(n => /^\s*img\s*$/i.test(n.nodeName))) {
                    const img = col.childNodes.find(n => /^\s*img\s*$/i.test(n.nodeName));
                    links.push(img.attributes.find(a => a.name === 'src').value);
                }
            });
        });
        return links;
    }

}
