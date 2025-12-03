namespace ElbilHusvagnLadda.WebApi.Models;

public class CreateCommentRequest
{
    public string? Comment { get; set; }
    public VoteType Vote { get; set; }
}
