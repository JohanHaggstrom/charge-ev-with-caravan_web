import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import { IdentifiedCaravanChargePoint } from '../../app.model';
import { AuthService } from '../../auth/auth.service';
import { ChargePointComment, CommentStats, CreateCommentRequest, VoteType } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';

@Component({
    selector: 'app-charge-point-comments-dialog',
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatTooltipModule
    ],
    templateUrl: './charge-point-comments-dialog.component.html',
    styleUrl: './charge-point-comments-dialog.component.scss',
})
export class ChargePointCommentsDialogComponent implements OnInit {
    private commentService = inject(CommentService);
    private snackBar = inject(MatSnackBar);
    protected authService = inject(AuthService);

    comments: ChargePointComment[] = [];
    newComment = '';
    selectedVote: VoteType | null = null;
    isLoading = false;
    isSaving = false;

    VoteType = VoteType; // Expose enum to template

    constructor(
        private dialogRef: MatDialogRef<ChargePointCommentsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public chargePoint: IdentifiedCaravanChargePoint
    ) {}

    async ngOnInit(): Promise<void> {
        await this.loadComments();
    }

    get stats(): CommentStats {
        return {
            totalComments: this.comments.length,
            upVotes: this.comments.filter(c => c.vote === VoteType.UpVote).length,
            downVotes: this.comments.filter(c => c.vote === VoteType.DownVote).length
        };
    }

    private async loadComments(): Promise<void> {
        this.isLoading = true;
        try {
            this.comments = await firstValueFrom(
                this.commentService.getComments(this.chargePoint.id)
            );
        } catch (error) {
            console.error('Error loading comments:', error);
            this.snackBar.open('Kunde inte ladda kommentarer', 'Stäng', { duration: 3000 });
        } finally {
            this.isLoading = false;
        }
    }

    async onSubmit(): Promise<void> {
        if (this.selectedVote === null) {
            this.snackBar.open('Välj tumme upp eller ner', 'Stäng', { duration: 3000 });
            return;
        }

        this.isSaving = true;
        try {
            const request: CreateCommentRequest = {
                comment: this.newComment.trim() || '',
                vote: this.selectedVote
            };

            await firstValueFrom(
                this.commentService.createComment(this.chargePoint.id, request)
            );

            this.newComment = '';
            this.selectedVote = null;
            await this.loadComments();
            this.snackBar.open('Kommentar tillagd!', 'Stäng', { duration: 2000 });
        } catch (error) {
            console.error('Error creating comment:', error);
            this.snackBar.open('Kunde inte spara kommentar', 'Stäng', { duration: 3000 });
        } finally {
            this.isSaving = false;
        }
    }

    async deleteComment(comment: ChargePointComment): Promise<void> {
        if (!confirm('Är du säker på att du vill ta bort denna kommentar?')) {
            return;
        }

        try {
            await firstValueFrom(
                this.commentService.deleteComment(this.chargePoint.id, comment.id)
            );
            await this.loadComments();
            this.snackBar.open('Kommentar borttagen', 'Stäng', { duration: 2000 });
        } catch (error) {
            console.error('Error deleting comment:', error);
            this.snackBar.open('Kunde inte ta bort kommentar', 'Stäng', { duration: 3000 });
        }
    }

    selectVote(vote: VoteType): void {
        this.selectedVote = vote;
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('sv-SE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
