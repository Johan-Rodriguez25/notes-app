import {Component, OnInit} from '@angular/core'
import {Note} from '../../interfaces/note'
import {NoteService} from '../../services/note.service'
import {MatDialog, MatSnackBar} from '@angular/material'
import {NoteEdtDialogComponent} from '../note-edt-dialog/note-edt-dialog.component'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  public notes: Note[]
  public readonly SNACKBAR_DELAY: number = 3000

  constructor(
    public noteService: NoteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllNotes()
  }

  public getAllNotes(): void {
    this.noteService.getAllNotes().subscribe(
      (notes) => {
        this.notes = notes
      },
      (error) => {
        this.snackBar.open(
          'There was a problem retrieving notes from the server',
          'Ok',
          {duration: this.SNACKBAR_DELAY}
        )
        console.log('Error retrieving notes', error)
      }
    )
  }

  public _onAddClick(): void {
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

      this.noteService.addNote(note).subscribe(
        (added: Note) => {
          console.log('added note', {added})
          this.snackBar.open('Note added.', 'Ok', {
            duration: this.SNACKBAR_DELAY
          })
          this.getAllNotes()
        },
        (error) => {
          console.log('error adding note', {error})
          this.snackBar.open('There was a problem adding the note.')
        }
      )
    })
  }
}
