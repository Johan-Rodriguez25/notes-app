import {Injectable} from '@angular/core'
import {environment} from '../../environments/environment'
import {Observable} from 'rxjs'
import {Note} from '../interfaces/note'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public readonly API_URL = environment.apiUrlRoot

  constructor(private http: HttpClient) {}

  public getAllNotes(): Observable<Note[]> {
    return this.http.get(this.API_URL) as Observable<Note[]>
  }

  public addNote(note: Note): Observable<Note> {
    return this.http.post(this.API_URL, note) as Observable<Note>
  }

  public deleteNote(id): Observable<any> {
    return this.http.delete(this.API_URL + id)
  }

  public updateNote(id, note: Note): Observable<Note> {
    return this.http.put(this.API_URL + id, note) as Observable<Note>
  }
}
