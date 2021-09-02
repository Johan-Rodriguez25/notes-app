import {Component, Input} from '@angular/core'
import {NoteService} from 'src/app/services/note.service'
import {Note} from '../../interfaces/note'
import {MatDialog, MatSnackBar} from '@angular/material'
import {NoteEdtDialogComponent} from '../note-edt-dialog/note-edt-dialog.component'

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.scss']
})
export class NoteListItemComponent {
  @Input() public note: Note
  public readonly SNACKBAR_DELAY: number = 3000

  constructor(
    public noteService: NoteService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  public onXButtonClick(id) {
    this.noteService.deleteNote(id).subscribe((res) => {
      console.log('removed note')
      this.snackBar.open('Note removed.', 'Ok', {
        duration: this.SNACKBAR_DELAY
      })
      window.location.reload()
    })
  }

  public updateNote(id) {
    const dialogRef = this.dialog.open(NoteEdtDialogComponent, {
      height: '500px',
      width: '700px',
      data: {note: {}}
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return
      }
      const note: Note = {
        title: result.title,
        content: result.content
      }

      this.noteService.updateNote(id, note).subscribe(
        (updated: Note) => {
          console.log('added note', {updated})
          this.snackBar.open('Note updated.', 'Ok', {
            duration: this.SNACKBAR_DELAY
          })
          window.location.reload()
        },
        (error) => {
          console.log('error updating note', {error})
          this.snackBar.open('There was a problem updating the note.')
        }
      )
    })
  }
}
