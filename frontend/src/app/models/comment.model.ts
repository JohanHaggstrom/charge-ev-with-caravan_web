export enum VoteType {
    UpVote = 1,
    DownVote = -1
}

export interface ChargePointComment {
    id: number;
    chargePointId: number;
    comment?: string;
    vote: VoteType;
    createdAt: string;
}

export interface CreateCommentRequest {
    comment: string;
    vote: VoteType;
}

export interface CommentStats {
    totalComments: number;
    upVotes: number;
    downVotes: number;
}
