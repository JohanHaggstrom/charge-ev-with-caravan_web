namespace ElbilHusvagnLadda.WebApi.Models;

public class ChargePointComment
{
    public int Id { get; set; }
    public int ChargePointId { get; set; }
    public string? Comment { get; set; }
    public VoteType Vote { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    public ChargingPoint? ChargingPoint { get; set; }
}
