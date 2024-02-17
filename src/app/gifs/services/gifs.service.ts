import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagHistory: string[] = [];
  private apiKey: string = 'OaMUIcD9zZ01fo7QmXvriW6RywmShWTQ';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { }

  get tagHistory(): string[] {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagHistory.includes(tag)) { this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag); }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
  }


  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=OaMUIcD9zZ01fo7QmXvriW6RywmShWTQ&q=Valorant&limit=10')
    // .then(resp=>resp.json())
    // .then(data=>console.log(data));
    
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    this.http
      .get(`${this.serviceUrl}/search`, { params })
      .subscribe({
        next: (resp) => {
          console.log(resp)
        },
        error: (resp) => console.log(resp.error)
      })
  }
}
