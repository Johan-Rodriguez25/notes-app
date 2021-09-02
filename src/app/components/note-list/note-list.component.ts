import {Component, Input} from '@angular/core'
import {Note} from '../../interfaces/note'

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {
  @Input() public notes: Note[]

  public isNoteListEmpty(): boolean {
    return !this.notes || !this.notes.length
  }
}
